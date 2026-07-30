import { BarChart, Note, Task } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNavigator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bottomNavigationValue = () => {
    if (location.pathname.includes("/tasks/stats")) return "stats";
    if (location.pathname.includes("/tasks")) return "tasks";
    return "notes";
  };
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.appBar,
      }}
      elevation={4}
    >
      <BottomNavigation
        value={bottomNavigationValue()}
        showLabels
        sx={{
          height: 52,
          "& .MuiBottomNavigationAction-root": {
            minWidth: 0,
            maxWidth: "none",
            py: 0.25,
          },
          "& .MuiBottomNavigationAction-label": {
            fontSize: "0.7rem",
          },
          "& .MuiSvgIcon-root": {
            fontSize: 20,
          },
        }}
      >
        <BottomNavigationAction
          label="Notes"
          value="notes"
          icon={<Note />}
          onClick={() => {
            navigate("/notes");
          }}
        />
        <BottomNavigationAction
          label="Tasks"
          value="tasks"
          icon={<Task />}
          onClick={() => {
            navigate("/tasks");
          }}
        />
        <BottomNavigationAction
          label="Stats"
          value="stats"
          icon={<BarChart />}
          onClick={() => {
            navigate("/tasks/stats");
          }}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavigator;
