import {
  createCollection,
  localStorageCollectionOptions,
  type LocalStorageCollectionUtils,
} from "@tanstack/db";

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

export const tasksCollection = createCollection<
  TaskRecord,
  string,
  LocalStorageCollectionUtils
>(
  localStorageCollectionOptions<TaskRecord, string>({
    storageKey: "tasks",
    getKey: (task) => task.id,
  })
);

export const notesCollection = createCollection<
  NoteRecord,
  string,
  LocalStorageCollectionUtils
>(
  localStorageCollectionOptions<NoteRecord, string>({
    storageKey: "notes",
    getKey: (note) => note.id,
  })
);

export const foldersCollection = createCollection<
  FolderRecord,
  string,
  LocalStorageCollectionUtils
>(
  localStorageCollectionOptions<FolderRecord, string>({
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

export interface UIStateRecord {
  id: string;
  modalOpen: boolean;
  filter: string;
  editingTask: TaskRecord | null;
  selectedFolder: string;
  sortValue: string;
  orderReversed: boolean;
}

export const uiStateCollection = createCollection<
  UIStateRecord,
  string,
  LocalStorageCollectionUtils
>(
  localStorageCollectionOptions<UIStateRecord, string>({
    storageKey: "ui_state",
    getKey: (state) => state.id,
  })
);
