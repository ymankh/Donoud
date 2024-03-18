import ListItem from "./ListItem";
import AddTaskForm from "../AddTaskForm";
import NoListImage from "../shared/NoListImage";
import { motion } from "framer-motion";
import { format } from "date-fns";

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

// eslint-disable-next-line react/prop-types
const TaskList = ({ tasks = [{}] }) => {
  return (
    <section id="notes">
      <div className="container py-5 h-100 ">
        <div className="row  d-flex justify-content-center align-items-center h-100">
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
