import { Route, Routes, useLocation } from "react-router-dom";
import { EasterEggsPage, TaskStatsPage, TasksPage } from "@/features/tasks";
import { NotesPage, NoteEditPage, notesRoutes } from "@/features/notes";
import { NotFound } from "@/shared/components/NotFound";


const AppRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/tasks/stats" element={<TaskStatsPage />} />
      <Route path="/tasks/easter-eggs" element={<EasterEggsPage />} />
      <Route path={notesRoutes.root} element={<NotesPage mode="root" />} />
      <Route path={notesRoutes.all} element={<NotesPage mode="all-notes" />} />
      <Route path={notesRoutes.folderPattern} element={<NotesPage mode="folder" />} />
      <Route path={notesRoutes.notePattern} element={<NoteEditPage />} />
      <Route
        path="*"
        element={
          <NotFound/>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
