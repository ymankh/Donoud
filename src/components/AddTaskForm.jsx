import { useContext, useState } from "react";
import TasksContext from "../contexts/TasksContext";
import { Bounce, toast } from "react-toastify";

function randomEmoji() {
  const emojis = ["😐", "😑", "😬", "🙄", "🙅‍♀️", "🤷‍♂️", "💁‍♂️", "🚶‍♂️","👀", "🤦‍♀️"]
  return emojis[Math.floor(Math.random() * emojis.length)];
}

const AddTaskForm = () => {
  const [task, setTask] = useState("");
  const { addTask } = useContext(TasksContext);

  const onChange = (e) => {
    setTask(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (task.length < 5) {
      toast.error("Task should be at least 5 characters" + randomEmoji(), {
        transition: Bounce,
      });
      return;
    }

    addTask(task);
    setTask("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="Task" className="form-label">
          Add a new task.
        </label>
        <input
          type="text"
          className="form-control"
          id="Task"
          aria-describedby="newTask"
          placeholder="ex  water the planet... "
          value={task}
          onChange={onChange}
        />
        <div id="newTask" className="form-text"></div>
      </div>
      <button type="submit" className="btn btn-primary">
        add
      </button>
    </form>
  );
};

export default AddTaskForm;
