import { createContext, useEffect, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Note {
  id: string;
  text: string;
  date: Date;
  lastChange: Date;
  isPined: boolean;
}

interface NoteContextType {
  notes: Note[];
  getNoteById: (id: string) => Note | undefined;
  deleteNote: (deletedNote: Note) => void;
  updateNote: (updatedNote: Note) => void;
  createNewNote: () => string;
  deleteEmptyNotes: () => void;
  orderReversed: boolean;
  setOrderReversed: React.Dispatch<React.SetStateAction<boolean>>;
  sortValue: string;
  setSortValue: React.Dispatch<React.SetStateAction<string>>;
  sortOptions: string[];
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
        getNoteById,
        deleteNote,
        updateNote,
        createNewNote,
        deleteEmptyNotes,
        orderReversed,
        setOrderReversed,
        sortValue,
        setSortValue,
        sortOptions,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;
