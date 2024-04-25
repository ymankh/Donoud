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
  const sortOptions = ["Date created", "Date modified"];
  const [orderReversed, setOrderReversed] = useState(false);
  const [sortValue, setSortValue] = useState(sortOptions[0]);

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
      previous.map((note) =>
        note.id === updatedNote.id
          ? { ...updatedNote, lastChange: new Date() }
          : note
      )
    );
  };
  const getNoteById = (id) => {
    try {
      return notes.find((note) => note.id.toString() === id);
    } catch (error) {
      throw new Error(`There is no note with the ID ${id}`);
    }
  };
  const createNewNote = () => {
    const newNote = {
      id: v4(),
      text: "",
      date: new Date(),
      lastChange: new Date(),
      isPined: false,
    };
    setNotes((previous) => [
      ...previous,
      { ...newNote, lastChange: new Date() },
    ]);
    return newNote.id;
  };

  function deleteEmptyNotes() {
    setNotes((previous) => previous.filter((note) => note.text !== ""));
  }

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
