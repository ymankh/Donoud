import { Route, Routes, useLocation } from "react-router-dom";
import Tasks from "../pages/tasks/Tasks";
import NoteEdit from "../pages/notes/NoteEdit";
import Notes from "../pages/notes/Notes";
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/notes/:noteId" element={<NoteEdit />} />
      <Route
        path="*"
        element={
          <>
            <h1>Note Found</h1>
          </>
        }
      />
    </Routes>
  );
};

export default AnimatedRoutes;
