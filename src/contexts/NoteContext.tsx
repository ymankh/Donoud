import { createContext, useMemo, useState, ReactNode, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { Folder } from "@/Models/NoteFolder";
import {
  foldersCollection,
  fromNoteRecord,
  notesCollection,
  toNoteRecord,
} from "@/db/collections";
import { useLiveQuery } from "@tanstack/react-db";

export interface Note {
  id: string;
  text: string;
  date: Date;
  lastChange: Date;
  isPined: boolean;
  color: StickyNoteColor;
  folderId?: string;
}

export const stickyNoteColors = {
  gold: {
    note: "#FFD700",
    text: "#000000",
  },
  darkOrange: {
    note: "#FF8C00",
    text: "#000000",
  },
  hotPink: {
    note: "#FF69B4",
    text: "#000000",
  },
  darkTurquoise: {
    note: "#00CED1",
    text: "#000000",
  },
  greenYellow: {
    note: "#ADFF2F",
    text: "#000000",
  },
  tomatoRed: {
    note: "#FF6347",
    text: "#000000",
  },
  lightSkyBlue: {
    note: "#87CEFA",
    text: "#000000",
  },
  plum: {
    note: "#DDA0DD",
    text: "#000000",
  },
  mediumSpringGreen: {
    note: "#00FA9A",
    text: "#000000",
  },
  lightCoral: {
    note: "#F08080",
    text: "#000000",
  },
  moccasin: {
    note: "#FFE4B5",
    text: "#000000",
  },
  paleTurquoise: {
    note: "#AFEEEE",
    text: "#000000",
  },
  lavender: {
    note: "#E6E6FA",
    text: "#000000",
  },
  wheat: {
    note: "#F5DEB3",
    text: "#000000",
  },
  lightPink: {
    note: "#FFB6C1",
    text: "#000000",
  },
} as const;

export type StickyNoteColor = keyof typeof stickyNoteColors;

interface NoteContextType {
  notes: Note[];
  folders: Folder[];
  sortOptions: string[];
  sortValue: string;
  selectedFolder: string;
  orderReversed: boolean;
  setOrderReversed: React.Dispatch<React.SetStateAction<boolean>>;
  setSortValue: React.Dispatch<React.SetStateAction<string>>;
  setSelectedFolder: React.Dispatch<React.SetStateAction<string>>;
  createFolder: (name: string) => void;
  renameFolder: (id: string, name: string) => void;
  deleteFolder: (id: string) => void;
  getNoteById: (id: string) => Note | undefined;
  deleteNote: (deletedNote: Note) => void;
  updateNote: (updatedNote: Note) => void;
  createNewNote: () => string;
  deleteEmptyNotes: () => void;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

interface NoteContextProviderProps {
  children: ReactNode;
}

export const NoteContextProvider = ({ children }: NoteContextProviderProps) => {
  const sortOptions = ["Date created", "Date modified"];
  const [orderReversed, setOrderReversed] = useState<boolean>(false);
  const [sortValue, setSortValue] = useState<string>(sortOptions[0]);
  const [selectedFolder, setSelectedFolder] = useState<string>("");

  const { data: noteRecords = [] } = useLiveQuery((q) =>
    q.from({ notes: notesCollection })
  );
  const { data: folderRecords = [] } = useLiveQuery((q) =>
    q.from({ folders: foldersCollection })
  );

  const notes = useMemo<Note[]>(
    () =>
      noteRecords.map((note) => ({
        ...fromNoteRecord(note),
        color: note.color as StickyNoteColor,
      })),
    [noteRecords]
  );

  const folders = useMemo<Folder[]>(
    () => folderRecords.map((folder) => ({ ...folder })),
    [folderRecords]
  );

  const deleteNote = useCallback((deletedNote: Note) => {
    notesCollection.delete(deletedNote.id);
  }, []);

  const updateNote = useCallback((updatedNote: Note) => {
    const nextNote = toNoteRecord({
      ...updatedNote,
      lastChange: new Date(),
      color: updatedNote.color,
    });
    notesCollection.update(updatedNote.id, (draft) => {
      draft.text = nextNote.text;
      draft.lastChange = nextNote.lastChange;
      draft.isPined = nextNote.isPined;
      draft.color = nextNote.color;
      draft.folderId = nextNote.folderId;
    });
  }, []);

  const createFolder = useCallback(
    (name: string) => {
      const newFolder: Folder = { id: uuidv4(), name };
      foldersCollection.insert(newFolder);
      setSelectedFolder(newFolder.id);
    },
    [setSelectedFolder]
  );

  const renameFolder = useCallback((id: string, name: string) => {
    foldersCollection.update(id, (draft) => {
      draft.name = name;
    });
  }, []);

  const deleteFolder = useCallback(
    (id: string) => {
      foldersCollection.delete(id);
      const notesToUpdate = notes.filter((note) => note.folderId === id);
      if (notesToUpdate.length) {
        notesCollection.update(
          notesToUpdate.map((note) => note.id),
          (drafts) => {
            drafts.forEach((draft) => {
              draft.folderId = undefined;
            });
          }
        );
      }
      if (selectedFolder === id) setSelectedFolder("");
    },
    [notes, selectedFolder]
  );

  const getNoteById = useCallback(
    (id: string): Note | undefined => {
      return notes.find((note) => note.id === id);
    },
    [notes]
  );

  const createNewNote = useCallback((): string => {
    const newNote: Note = {
      id: uuidv4(),
      text: "",
      date: new Date(),
      lastChange: new Date(),
      isPined: false,
      color: "wheat",
      folderId: selectedFolder || undefined,
    };
    notesCollection.insert(
      toNoteRecord({
        ...newNote,
        color: newNote.color,
      })
    );
    return newNote.id;
  }, [selectedFolder]);

  const deleteEmptyNotes = useCallback(() => {
    const emptyIds = notes
      .filter((note) => note.text === "")
      .map((note) => note.id);
    if (emptyIds.length) {
      notesCollection.delete(emptyIds);
    }
  }, [notes]);

  return (
    <NoteContext.Provider
      value={{
        notes,
        folders,
        orderReversed,
        sortOptions,
        selectedFolder,
        sortValue,
        createFolder,
        renameFolder,
        deleteFolder,
        getNoteById,
        deleteNote,
        updateNote,
        createNewNote,
        deleteEmptyNotes,
        setOrderReversed,
        setSortValue,
        setSelectedFolder,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;
