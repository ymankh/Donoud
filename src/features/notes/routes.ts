export const notesRoutes = {
  root: "/notes",
  all: "/notes/all",
  folderPattern: "/notes/folder/:folderId",
  notePattern: "/notes/note/:noteId",
  folder: (folderId: string) => `/notes/folder/${folderId}`,
  note: (noteId: string) => `/notes/note/${noteId}`,
} as const;
