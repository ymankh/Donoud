import { ChangeEvent, FormEvent, useContext, useState } from "react";
import TasksContext from "../contexts/TasksContext";
import { Bounce, toast } from "react-toastify";
import { TaskCategory } from "../Models/TasksModel";
import { getSentenceForTask, randomEmoji, taskKeywords } from "./sentencesGenerator";
import SelectCategory from "./SelectCategory";


const AddTaskForm = () => {
  const [task, setTask] = useState("");
  const [selectedTaskCategory, setSelectedTaskCategory] =
    useState<TaskCategory>("" as TaskCategory);
  const { addTask } = useContext(TasksContext)!;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.length < 5) {
      toast.error("Task should be at least 5 characters" + randomEmoji(), {
        transition: Bounce,
      });
      return;
    }

    const showToast = (sentence: string) => {
      toast.success(sentence, { transition: Bounce });
    };

    const checkTask = (task: string, keywords: string[]) => {
      return keywords.some((word) => task.includes(word));
    };

    const handleTask = (task: string) => {
      for (const [taskName, keywords] of Object.entries(taskKeywords)) {
        if (checkTask(task, keywords)) {
          showToast(getSentenceForTask(taskName));
          return;
        }
      }
    };

    handleTask(task);
    addTask(task, selectedTaskCategory);
    setTask("");
    setSelectedTaskCategory("");
  };
  const changeTaskCategory = (e: ChangeEvent<HTMLSelectElement>) =>
    setSelectedTaskCategory(e.target.value as TaskCategory);
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="Task" className="form-label">
          Add a new task.
        </label>
        <div className="row">
          <div className="col-8">
            <input
              type="text"
              className="form-control"
              id="Task"
              aria-describedby="newTask"
              placeholder="ex  water the planet... "
              value={task}
              onChange={onChange}
            />
          </div>
          <div className="col-4">
            <SelectCategory selectedTaskCategory={selectedTaskCategory} handelSelect={(value: TaskCategory) => setSelectedTaskCategory(value)} />
          </div>
        </div>
        <div id="newTask" className="form-text"></div>
      </div>
      <button type="submit" className="btn btn-primary">
        add
      </button>
    </form>
  );
};

export default AddTaskForm;
