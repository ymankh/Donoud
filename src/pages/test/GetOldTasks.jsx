import { useContext } from "react";
import { toast } from "react-toastify";
import TasksContext from "../../contexts/TasksContext";

function handleFileSelect(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = async function (event) {
    try {
      // Parse the JSON data
      const jsonData = JSON.parse(event.target.result);
      // Store the data in local storage
      Object.keys(jsonData).forEach((key) => {
        localStorage.setItem(key, jsonData[key]);
      });

      alert("Data imported successfully!");
    } catch (error) {
      alert("Error importing data. Please make sure the file is valid JSON.");
    }
  };

  reader.readAsText(file);
}

const GetOldTasks = () => {
  const { setTasks, makeTasks } = useContext(TasksContext);
  const importData = async () => {
    try {
      // Prompt the user to select a file
      const keys = Object.keys(localStorage);
      const tasks = [];
      keys.forEach((key) => {
        if (key !== "tasks") tasks.push(...JSON.parse(localStorage[key]));
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      setTasks(makeTasks(tasks))
      toast.info("All tasks has been imported");
    } catch (error) {
      console.error("Error importing data:", error);
      toast.error("An error occurred while importing data. Please try again.");
    }
  };

  return <button onClick={importData}>Get old tasks</button>;
};

export default GetOldTasks;
