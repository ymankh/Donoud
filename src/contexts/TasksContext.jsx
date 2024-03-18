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

// eslint-disable-next-line react/prop-types
export const TasksContextProvider = ({ children }) => {
  const [editedTask, setEditedTask] = useState({});
  const [todaysTasksName, setTodaysTasksName] = useState(
    "tasks" + formattedDate()
  );
  function updateTodaysTaskName() {
    setTodaysTasksName("tasks" + formattedDate());
  }
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
  const updateOldTasks = () => {
    updateTodaysTaskName();
    clearStorageFormEmptyArras();
    try {
      setOldTasks(
        Object.entries(localStorage)
          .filter((tasks) => tasks[0] !== todaysTasksName)
          .map((tasks) => [tasks[0], makeTasks(JSON.parse(tasks[1]))])
          .sort((a, b) => b[1][0]["date"] - a[1][0]["date"])
      );
    } catch (error) {
      setOldTasks([]);
    }
  };
  useEffect(() => {
    // get all old tasks days and remove junk.
    clearStorageFormEmptyArras();
    updateOldTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Save tasks to local storage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks" + formattedDate(), JSON.stringify(tasks));
  }, [tasks]);

  const markTaskFinished = (finishedTask) => {
    updateTodaysTaskName();
    const taskStorageName = getTaskStorageName(finishedTask);
    if (taskStorageName === todaysTasksName) {
      setTasks((previous) => {
        const newTasks = previous.map((task) =>
          task.id === finishedTask.id ? { ...task, done: !task.done } : task
        );
        return newTasks;
      });
    } else {
      const tasks = getTasksByStorageName(taskStorageName);
      const updatedTasks = tasks.map((task) =>
        task.id === finishedTask.id ? { ...task, done: !task.done } : task
      );
      saveUpdatedTaskInStorage(taskStorageName, updatedTasks);
    }
  };

  const deleteTask = (deletedTask) => {
    updateTodaysTaskName();
    const taskStorageName = getTaskStorageName(deletedTask);
    if (taskStorageName === todaysTasksName)
      setTasks((previousTasks) => {
        const newTasks = previousTasks.filter(
          (task) => task.id !== deletedTask.id
        );
        return newTasks;
      });
    else {
      const taskStorage = getTasksByStorageName(taskStorageName);
      const updatedTasks = taskStorage.filter(
        (task) => task.id !== deletedTask.id
      );
      saveUpdatedTaskInStorage(taskStorageName, updatedTasks);
    }
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

  function saveUpdatedTaskInStorage(taskStorageName, updatedTasks) {
    if (updatedTasks.length === 0) localStorage.removeItem(taskStorageName);
    else localStorage.setItem(taskStorageName, JSON.stringify(updatedTasks));
    updateOldTasks();
  }

  function getTaskStorageName(task) {
    return "tasks" + formattedDate(task.date);
  }
  const saveEditedTask = () => {
    updateTodaysTaskName();
    const taskStorageName = getTaskStorageName(editedTask);
    if (taskStorageName === todaysTasksName) {
      setTasks((prevues) =>
        prevues.map((task) => (task.id === editedTask.id ? editedTask : task))
      );
    } else {
      const tasks = getTasksByStorageName(taskStorageName);
      const updatedTasks = tasks.map((task) =>
        task.id === editedTask.id ? editedTask : task
      );
      saveUpdatedTaskInStorage(taskStorageName, updatedTasks);
    }
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

function getTasksByStorageName(taskStorageName) {
  return makeTasks(JSON.parse(localStorage.getItem(taskStorageName)));
}

function clearStorageFormEmptyArras() {
  const keys = Object.keys(localStorage);
  keys.forEach((key) => {
    const value = JSON.parse(localStorage.getItem(key));
    if (
      !value ||
      value === "null" ||
      value === "undefined" ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      localStorage.removeItem(key);
    }
  });
}
