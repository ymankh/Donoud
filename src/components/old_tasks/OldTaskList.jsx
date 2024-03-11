import ListItem from "../todays_tasks/ListItem";
import { motion } from "framer-motion";

const formattedDate = () => {
  const date = new Date();
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};
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
const OldTaskList = ({ tasks = [{}] }) => {
  return (
    <section id="notes">
      <div className="container py-5 h-100 ">
        <div className="row  d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-8 col-xl-6">
            <div className="card rounded-3">
              <div className="card-body p-4">
                <p className="mb-2">
                  <span className="h5 me-2">{formattedDate(tasks[0].date)} tasks</span>
                </p>
                <div className="mb-3 form-check"></div>
                <motion.ul
                  variants={container}
                  initial="hidden"
                  animate="visible"
                  className="list-group rounded-0"
                >
                  {tasks.map((task) => (
                    <ListItem key={task.id} task={task} />
                  ))}
                </motion.ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OldTaskList;
