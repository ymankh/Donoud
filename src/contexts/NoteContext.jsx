import { createContext, useEffect, useState } from "react";
import { v4 } from "uuid";

const NoteContext = createContext();

function makeNotes(notes) {
  return JSON.parse(notes).map((note) => {
    return {
      ...note,
      date: new Date(note.date),
      lastChange: new Date(note.lastChange),
    };
  });
}

export const NoteContextProvider = ({ children }) => {
  let initialNotes = [];
  try {
    initialNotes = makeNotes(localStorage.getItem("notes"));
  } catch (error) {
    console.error(error);
  }
  const [notes, setNotes] = useState(initialNotes);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const deleteNote = (deletedNote) => {
    setNotes((previous) =>
      previous.filter((note) => note.id !== deletedNote.id)
    );
  };
  const updateNote = (updatedNote) => {
    setNotes((previous) =>
      previous.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };
  const getNoteById = (id) => notes.find((note) => note.id.toString() === id);
  const createNewNote = () => {
    const newNote = {
      id: v4(),
      text: "",
      date: new Date(),
      lastChange: new Date(),
    };
    setNotes((previous) => [
      ...previous,
      { ...newNote, lastChange: new Date() },
    ]);
    return newNote.id;
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNoteById, deleteNote, updateNote, createNewNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;
