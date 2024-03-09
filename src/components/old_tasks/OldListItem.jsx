import { motion } from "framer-motion";

function formateDate(date = new Date()) {
  const hours = date.getHours();
  let amOrPm = "am";
  let displayedHour = hours;
  if (hours === 0) {
    displayedHour = 12;
  }
  if (hours >= 12) {
    amOrPm = "pm";
    if (hours > 12) {
      displayedHour = hours - 12;
    }
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${amOrPm} ${displayedHour}:${minutes}`;
}

const OldListItem = ({
  // eslint-disable-next-line react/prop-types
  task = { id: "", task: "", done: false, date: new Date() },
}) => {
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <motion.li
      variants={item}
      exit={item}
      className="task  list-group-item border-0 d-flex align-items-center ps-0"
    >
      <div className="row">
        <div
          style={task.done ? { textDecoration: "line-through" } : {}}
          className="col-12"
        >
          {task.task}{" "}
        </div>
        <div className="small text-muted col-12">
          {" "}
          {formateDate(task.date)}{" "}
        </div>
      </div>
    </motion.li>
  );
};

export default OldListItem;
