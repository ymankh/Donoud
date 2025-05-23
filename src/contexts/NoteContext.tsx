import { createContext, useEffect, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Note {
  id: string;
  text: string;
  date: Date;
  lastChange: Date;
  isPined: boolean;
  color: StickyNoteColor;
}

export const stickyNoteColors = {
  gold: {
    note: '#FFD700',
    text: '#000000',
  },
  darkOrange: {
    note: '#FF8C00',
    text: '#000000',
  },
  hotPink: {
    note: '#FF69B4',
    text: '#000000',
  },
  darkTurquoise: {
    note: '#00CED1',
    text: '#000000',
  },
  greenYellow: {
    note: '#ADFF2F',
    text: '#000000',
  },
  tomatoRed: {
    note: '#FF6347',
    text: '#000000',
  },
  lightSkyBlue: {
    note: '#87CEFA',
    text: '#000000',
  },
  plum: {
    note: '#DDA0DD',
    text: '#000000',
  },
  mediumSpringGreen: {
    note: '#00FA9A',
    text: '#000000',
  },
  lightCoral: {
    note: '#F08080',
    text: '#000000',
  },
  moccasin: {
    note: '#FFE4B5',
    text: '#000000',
  },
  paleTurquoise: {
    note: '#AFEEEE',
    text: '#000000',
  },
  lavender: {
    note: '#E6E6FA',
    text: '#000000',
  },
  wheat: {
    note: '#F5DEB3',
    text: '#000000',
  },
  lightPink: {
    note: '#FFB6C1',
    text: '#000000',
  },
} as const

export type StickyNoteColor = keyof typeof stickyNoteColors


interface NoteContextType {
  notes: Note[];
  sortOptions: string[];
  sortValue: string;
  selectedFolder: string;
  orderReversed: boolean;
  setOrderReversed: React.Dispatch<React.SetStateAction<boolean>>;
  setSortValue: React.Dispatch<React.SetStateAction<string>>;
  setSelectedFolder: React.Dispatch<React.SetStateAction<string>>;
  getNoteById: (id: string) => Note | undefined;
  deleteNote: (deletedNote: Note) => void;
  updateNote: (updatedNote: Note) => void;
  createNewNote: () => string;
  deleteEmptyNotes: () => void;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

function makeNotes(notes: string | null): Note[] {
  if (!notes) return [];
  return JSON.parse(notes).map((note: any) => ({
    ...note,
    date: new Date(note.date),
    lastChange: new Date(note.lastChange),
  }));
}

interface NoteContextProviderProps {
  children: ReactNode;
}

export const NoteContextProvider = ({ children }: NoteContextProviderProps) => {
  const sortOptions = ["Date created", "Date modified"];
  const [orderReversed, setOrderReversed] = useState<boolean>(false);
  const [sortValue, setSortValue] = useState<string>(sortOptions[0]);
  const [selectedFolder, setSelectedFolder] = useState<string>("");
  let initialNotes: Note[] = [];
  try {
    initialNotes = makeNotes(localStorage.getItem("notes"));
  } catch (error) {
    console.error("Error loading notes from localStorage:", error);
  }
  const [notes, setNotes] = useState<Note[]>(initialNotes);


  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const deleteNote = (deletedNote: Note) => {
    setNotes((prev) => prev.filter((note) => note.id !== deletedNote.id));
  };

  const updateNote = (updatedNote: Note) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === updatedNote.id
          ? { ...updatedNote, lastChange: new Date() }
          : note
      )
    );
  };

  const getNoteById = (id: string): Note | undefined => {
    return notes.find((note) => note.id === id);
  };

  const createNewNote = (): string => {
    const newNote: Note = {
      id: uuidv4(),
      text: "",
      date: new Date(),
      lastChange: new Date(),
      isPined: false,
      color: "wheat"
    };
    setNotes((prev) => [...prev, { ...newNote, lastChange: new Date() }]);
    return newNote.id;
  };

  const deleteEmptyNotes = () => {
    setNotes((prev) => prev.filter((note) => note.text !== ""));
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        orderReversed,
        sortOptions,
        selectedFolder,
        sortValue,
        getNoteById,
        deleteNote,
        updateNote,
        createNewNote,
        deleteEmptyNotes,
        setOrderReversed,
        setSortValue,
        setSelectedFolder
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;
