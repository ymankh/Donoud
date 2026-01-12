import { createCollection, localStorageCollectionOptions } from "@tanstack/db";

export interface TaskRecord {
  id: string;
  task: string;
  done: boolean;
  date: string;
  category: string;
  details?: string;
}

export interface NoteRecord {
  id: string;
  text: string;
  date: string;
  lastChange: string;
  isPined: boolean;
  color: string;
  folderId?: string;
}

export interface FolderRecord {
  id: string;
  name: string;
}

export const tasksCollection = createCollection<TaskRecord>(
  localStorageCollectionOptions({
    storageKey: "tasks",
    getKey: (task) => task.id,
  })
);

export const notesCollection = createCollection<NoteRecord>(
  localStorageCollectionOptions({
    storageKey: "notes",
    getKey: (note) => note.id,
  })
);

export const foldersCollection = createCollection<FolderRecord>(
  localStorageCollectionOptions({
    storageKey: "folders",
    getKey: (folder) => folder.id,
  })
);

const parseDate = (value: string | Date) =>
  value instanceof Date ? value : new Date(value);

export const fromTaskRecord = (task: TaskRecord) => ({
  ...task,
  date: parseDate(task.date),
});

export const toTaskRecord = (
  task: Omit<TaskRecord, "date"> & { date: Date | string }
) => ({
  ...task,
  date: parseDate(task.date).toISOString(),
});

export const fromNoteRecord = (note: NoteRecord) => ({
  ...note,
  date: parseDate(note.date),
  lastChange: parseDate(note.lastChange),
});

export const toNoteRecord = (
  note: Omit<NoteRecord, "date" | "lastChange"> & {
    date: Date | string;
    lastChange: Date | string;
  }
) => ({
  ...note,
  date: parseDate(note.date).toISOString(),
  lastChange: parseDate(note.lastChange).toISOString(),
});
