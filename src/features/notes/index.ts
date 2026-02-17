// Notes feature public API
export { default as NotesPage } from "./pages/Notes";
export { default as NoteEditPage } from "./pages/NoteEdit";
export { useNotes } from "./hooks/useNotes";
export type { Note, StickyNoteColor } from "./hooks/useNotes";
export { stickyNoteColors } from "./hooks/useNotes";
export type { Folder } from "./models/NoteFolder";
export { notesRoutes } from "./routes";
