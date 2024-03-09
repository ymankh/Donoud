import { createContext, useState, useEffect } from "react";
import { v4 } from "uuid";

const TasksContext = createContext();

function formattedDate(date = new Date(), separator = "_") {
  return (
    date.getFullYear() +
    separator +
    (date.getMonth() + 1) +
    separator +
    date.getDate()
  );
}

function makeTasks(tasks = [{ date: "" }]) {
  return tasks.map((task) => ({ ...task, date: new Date(task.date) }));
}

export const TasksContextProvider = ({ children }) => {
  const todaysTasksName = "tasks" + formattedDate();
  // Load tasks from local storage or use default tasks if local storage is empty
  let initialTasks = [];
  try {
    initialTasks =
      makeTasks(JSON.parse(localStorage.getItem(todaysTasksName))) || [];
  } catch (error) {
    /* empty */
  }

  const [tasks, setTasks] = useState(initialTasks);
  const [oldTasks, setOldTasks] = useState([]);
  useEffect(() => {
    // get all old tasks days.
    try {
      setOldTasks(
        Object.entries(localStorage)
          .filter((tasks) => tasks[0] !== todaysTasksName)
          .map((tasks) => [tasks[0], makeTasks(JSON.parse(tasks[1]))])
      );
    } catch (error) {
      setOldTasks([]);
    }
  }, [todaysTasksName]);
  // Save tasks to local storage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks" + formattedDate(), JSON.stringify(tasks));
  }, [tasks]);

  const markTaskFinished = (id) => {
    setTasks((previousTasks) => {
      const newTasks = previousTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      );
      return newTasks;
    });
  };

  const deleteTask = (id) => {
    setTasks((previousTasks) => {
      const newTasks = previousTasks.filter((task) => task.id !== id);
      return newTasks;
    });
  };

  const addTask = (task) => {
    setTasks((previousTasks) => {
      const date = new Date();
      const newTask = {
        id: v4(),
        task,
        done: false,
        date: date,
      };
      return [newTask, ...previousTasks];
    });
  };

  const [editedTask, setEditedTask] = useState({});
  const saveEditedTask = () => {
    const storageItemName = "tasks" + formattedDate(editedTask.date);
    console.log(storageItemName);
    const updatedTasks = makeTasks(
      JSON.parse(localStorage.getItem(storageItemName))
    ).map((task) => (task.id === editedTask.id ? editedTask : task));

    if (todaysTasksName === storageItemName) {
      setTasks(updatedTasks);
    } else {
      setOldTasks((prevues) =>
        prevues.map((tasks) => tasks[0] === storageItemName)
          ? [storageItemName, updatedTasks]
          : tasks
      );
      localStorage.setItem(storageItemName, JSON.stringify(updatedTasks));
    }

    console.log(updatedTasks);
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        oldTasks,
        editedTask,
        markTaskFinished,
        addTask,
        deleteTask,
        setEditedTask,
        saveEditedTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContext;
