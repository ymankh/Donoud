import {
  FolderRecord,
  foldersCollection,
  fromNoteRecord,
  NoteRecord,
  notesCollection,
  toNoteRecord,
  uiStateCollection,
} from "@/shared/db/collections";
import { Folder } from "../models/NoteFolder";
import { useLiveQuery } from "@tanstack/react-db";
import { useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUIState } from "@/shared/hooks/useUIState";

// Move this to a shared location or duplicate for now.
export const stickyNoteColors = {
  gold: { note: "#FFD700", text: "#000000" },
  darkOrange: { note: "#FF8C00", text: "#000000" },
  hotPink: { note: "#FF69B4", text: "#000000" },
  darkTurquoise: { note: "#00CED1", text: "#000000" },
  greenYellow: { note: "#ADFF2F", text: "#000000" },
  tomatoRed: { note: "#FF6347", text: "#000000" },
  lightSkyBlue: { note: "#87CEFA", text: "#000000" },
  plum: { note: "#DDA0DD", text: "#000000" },
  mediumSpringGreen: { note: "#00FA9A", text: "#000000" },
  lightCoral: { note: "#F08080", text: "#000000" },
  moccasin: { note: "#FFE4B5", text: "#000000" },
  paleTurquoise: { note: "#AFEEEE", text: "#000000" },
  lavender: { note: "#E6E6FA", text: "#000000" },
  wheat: { note: "#F5DEB3", text: "#000000" },
  lightPink: { note: "#FFB6C1", text: "#000000" },
} as const;

export type StickyNoteColor = keyof typeof stickyNoteColors;

export interface Note {
  id: string;
  text: string;
  date: Date;
  lastChange: Date;
  isPined: boolean;
  color: StickyNoteColor;
  folderId?: string;
}

/**
 * Custom hook for managing notes and note folders using TanStack DB.
 *
 * This hook handles all operations related to notes including creation, deletion, updating,
 * and organization into folders. It also manages specific UI state related to notes,
 * such as current sorting order and selected folder filter.
 *
 * @returns {object} An object containing:
 * - `notes`: The list of all notes.
 * - `folders`: The list of all note folders.
 * - `sortOptions`, `sortValue`, `orderReversed`, `selectedFolder`: State and options for filtering/sorting notes.
 * - `createFolder`, `renameFolder`, `deleteFolder`: Functions to manage folders.
 * - `createNewNote`: Function to create a new note (potentially in the selected folder) and return its ID.
 * - `deleteNote`, `updateNote`: CRUD functions for notes.
 * - `getNoteById`: Helper to find a specific note.
 * - Setters for state: `setSortValue`, `setOrderReversed`, `setSelectedFolder`.
 */
export const useNotes = () => {
  const { data: noteRecords = [] } = useLiveQuery((q) =>
    q.from({ notes: notesCollection })
  );
  const { data: folderRecords = [] } = useLiveQuery((q) =>
    q.from({ folders: foldersCollection })
  );

  const { uiState, updateUIState } = useUIState();

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

  const folderMap = useMemo(
    () => new Map(folders.map((folder) => [folder.id, folder])),
    [folders]
  );

  const sortOptions = ["Date created", "Date modified"];
  const sortValue = uiState.sortValue;
  const orderReversed = uiState.orderReversed;
  const selectedFolder = uiState.selectedFolder;

  const setSortValue = useCallback(
    (value: string | ((prev: string) => string)) => {
      updateUIState((draft) => {
        draft.sortValue = typeof value === "function" ? value(draft.sortValue) : value;
      });
    },
    [updateUIState]
  );

  const setOrderReversed = useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      updateUIState((draft) => {
        draft.orderReversed =
          typeof value === "function" ? value(draft.orderReversed) : value;
      });
    },
    [updateUIState]
  );

  const setSelectedFolder = useCallback(
    (value: string | ((prev: string) => string)) => {
      updateUIState((draft) => {
        draft.selectedFolder =
          typeof value === "function" ? value(draft.selectedFolder) : value;
      });
    },
    [updateUIState]
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
    (name: string, parentId?: string) => {
      const currentUI = uiStateCollection.state.get("global");
      const resolvedParentId =
        parentId === undefined ? currentUI?.selectedFolder || undefined : parentId || undefined;
      const newFolder: FolderRecord = { id: uuidv4(), name, parentId: resolvedParentId };
      foldersCollection.insert(newFolder);
      setSelectedFolder(newFolder.id);
      return newFolder.id;
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
      const allFolders = Array.from(foldersCollection.state.values());
      const byParent = new Map<string, string[]>();
      allFolders.forEach((folder) => {
        const parentKey = folder.parentId ?? "";
        const ids = byParent.get(parentKey) ?? [];
        ids.push(folder.id);
        byParent.set(parentKey, ids);
      });

      const deletedIds = new Set<string>();
      const stack = [id];
      while (stack.length) {
        const current = stack.pop();
        if (!current || deletedIds.has(current)) continue;
        deletedIds.add(current);
        const childIds = byParent.get(current) ?? [];
        childIds.forEach((childId) => stack.push(childId));
      }

      foldersCollection.delete(Array.from(deletedIds));
      const currentNotes = Array.from(notesCollection.state.values());
      const notesToUpdate = currentNotes.filter(
        (note) => note.folderId && deletedIds.has(note.folderId)
      );
      
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
      
      const currentUI = uiStateCollection.state.get("global");
      if (currentUI && deletedIds.has(currentUI.selectedFolder)) {
        const deletedRoot = allFolders.find((folder) => folder.id === id);
        const fallback = deletedRoot?.parentId ?? "";
        updateUIState((draft) => {
          draft.selectedFolder = deletedIds.has(fallback) ? "" : fallback;
        });
      }
    },
    [updateUIState]
  );

  const getNoteById = useCallback(
    (id: string): Note | undefined => {
      return notes.find((note) => note.id === id);
    },
    [notes]
  );

  const createNewNote = useCallback((): string => {
    const currentUI = uiStateCollection.state.get("global");
    const currentFolder = currentUI?.selectedFolder;

    const newNote: Note = {
      id: uuidv4(),
      text: "",
      date: new Date(),
      lastChange: new Date(),
      isPined: false,
      color: "wheat",
      folderId: currentFolder || undefined,
    };
    notesCollection.insert(
      toNoteRecord({
        ...newNote,
        color: newNote.color,
      })
    );
    return newNote.id;
  }, []);

  const selectedFolderPath = useMemo(() => {
    if (!selectedFolder) return [] as Folder[];
    const path: Folder[] = [];
    const visited = new Set<string>();
    let currentId: string | undefined = selectedFolder;
    while (currentId && !visited.has(currentId)) {
      visited.add(currentId);
      const folder = folderMap.get(currentId);
      if (!folder) break;
      path.unshift(folder);
      currentId = folder.parentId;
    }
    return path;
  }, [folderMap, selectedFolder]);

  const deleteEmptyNotes = useCallback(() => {
    const emptyIds = notes
      .filter((note) => note.text === "")
      .map((note) => note.id);
    if (emptyIds.length) {
      notesCollection.delete(emptyIds);
    }
  }, [notes]);

  return {
    notes,
    folders,
    orderReversed,
    sortOptions,
    selectedFolder,
    selectedFolderPath,
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
  };
};
