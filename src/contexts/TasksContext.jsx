import { createContext, useState, useEffect } from "react";
import { v4 } from "uuid";

const TasksContext = createContext();
function makeTasks(jsonTasks = [{ date: "" }]) {
  return jsonTasks.map( task => ({ ...task, date: new Date(task.date) }));
}


// eslint-disable-next-line react/prop-types
export const TasksContextProvider = ({ children }) => {
  const [editedTask, setEditedTask] = useState({});
  // Load tasks from local storage or use default tasks if local storage is empty
  
  let initTasks = []
  try {
   initTasks = makeTasks(JSON.parse(localStorage.getItem("tasks")))  
  } catch (error) {// 
  }
  const [tasks, setTasks] = useState(initTasks);
  // Save tasks to local storage whenever tasks state changes
  const markTaskFinished = (finishedTask) => {
    setTasks((previous) => {
      const newTasks = previous.map((task) =>
        task.id === finishedTask.id ? { ...task, done: !task.done } : task
      );
      return newTasks;
    });
  };

  useEffect(()=>{
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])
  const deleteTask = (deletedTask) => {
    setTasks((previousTasks) => {
      const newTasks = previousTasks.filter(
        (task) => task.id !== deletedTask.id
      );
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

  const saveEditedTask = () => {
      setTasks((prevues) =>
        prevues.map((task) => (task.id === editedTask.id ? editedTask : task))
      );
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        editedTask,
        setTasks,
        makeTasks, 
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

