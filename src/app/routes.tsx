import { Route, Routes, useLocation } from "react-router-dom";
import { TasksPage } from "@/features/tasks";
import { NotesPage, NoteEditPage } from "@/features/notes";
import { NotFound } from "@/shared/components/NotFound";


const AppRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/notes/:noteId" element={<NoteEditPage />} />
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
