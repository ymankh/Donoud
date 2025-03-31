import { Note, Task } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const BottomNavigator = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("tasks")) setValue("tasks");
    else setValue("notes")
  }, [location]);
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 5000 }}
      elevation={3}
    >
      <BottomNavigation
        sx={{ bgcolor: "#2b3035" }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Notes" value="notes" icon={<Note />} onClick={() => { navigate("notes") }} />
        <BottomNavigationAction label="Tasks" value="tasks" icon={<Task />} onClick={() => { navigate("tasks") }} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavigator;
