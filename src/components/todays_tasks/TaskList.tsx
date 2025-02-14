import ListItem from "./ListItem";
import AddTaskForm from "../AddTaskForm";
import NoListImage from "../shared/NoListImage";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { Task } from "../../Models/TasksModel";

// Function to Get a Random Congrats Message
function congratsTasksFinished(): string {
  const sentences = [
    "Congratulations on completing all your tasks for today! 🎉",
    "Well done on checking off everything on your to-do list today! 🌟",
    "Hats off to you for finishing all your tasks today! 👒",
    "Congratulations on a productive day! All tasks completed! 🚀",
    "You did it! All tasks for today are done! Congratulations! 🥳",
    "Way to go! You've conquered all your tasks for today! 🏆",
    "Congratulations on accomplishing everything you set out to do today! 🎉",
    "Fantastic job! You've successfully completed all your tasks for today! 🌟",
    "Mission accomplished! You've finished all your tasks for today! 🎯",
    "You've nailed it! All tasks completed! Congratulations! 💼",
  ];
  return sentences[Math.floor(Math.random() * sentences.length)];
}

// Motion Variants
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const TaskList: React.FC<{
  tasks: Task[];
}> = ({ tasks = [] }) => {
  const { width, height } = useWindowSize();
  const [celebrating, setCelebrating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [allTasksDone, setAllTasksDone] = useState(false);

  // Sort tasks to show unfinished tasks first
  tasks.sort((a, b) => (!a.done && b.done ? -1 : 1));

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      if (tasks.length > 0) setAllTasksDone(!tasks.some((task) => !task.done));
      return;
    }

    if (
      tasks.length > 0 &&
      tasks.every((task) => task.done) &&
      !celebrating &&
      !allTasksDone
    ) {
      toast.success(congratsTasksFinished());
      setCelebrating(true);
      setAllTasksDone(true);
      setTimeout(() => {
        setCelebrating(false);
      }, 10 * 1000);
    }
  }, [tasks, celebrating, allTasksDone, isMounted]);

  return (
    <section id="notes">
      {celebrating && (
        <Confetti
          numberOfPieces={800}
          recycle={false}
          run={celebrating}
          width={width}
          height={height}
        />
      )}
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-8 col-xl-6">
            <div className="card rounded-3">
              <div className="card-body p-4 shadow">
                <p className="mb-2">
                  <span className="h2 me-2">Today&rsquo;s Tasks</span>
                </p>
                <p className="text-muted pb-2">
                  {format(new Date(), "EE, d MMM")}
                </p>
                <AddTaskForm />
                <div className="mb-3 form-check"></div>
                <motion.ul
                  variants={container}
                  initial="hidden"
                  animate="visible"
                  className="list-group rounded-0"
                >
                  {tasks.length === 0 ? (
                    <NoListImage />
                  ) : (
                    tasks.map((task) => <ListItem key={task.id} task={task} />)
                  )}
                </motion.ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskList;
