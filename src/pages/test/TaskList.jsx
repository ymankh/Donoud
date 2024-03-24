import { useEffect, useState } from 'react';

const TaskList = () => {
  // State to store grouped tasks
  const [groupedTasks, setGroupedTasks] = useState({});

  useEffect(() => {
    // Function to group tasks by date
    const groupTasksByDate = (tasksData) => {
      const grouped = {};
      tasksData.forEach((task) => {
        // Extract date (without time) as string
        const taskDate = task.date.split('T')[0];
        // Add task to corresponding date list
        grouped[taskDate] = grouped[taskDate] || [];
        grouped[taskDate].push(task);
      });
      return grouped;
    };

    // Retrieve tasks data from local storage
    const tasksData = JSON.parse(localStorage.getItem('tasks')) || [];

    // Group tasks by date
    const grouped = groupTasksByDate(tasksData);

    // Set grouped tasks state
    setGroupedTasks(grouped);
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div>
      {/* Iterate through grouped tasks */}
      {Object.entries(groupedTasks).map(([date, tasks]) => (
        <div key={date}>
          <h2>{date}</h2>
          <ul>
            {/* Iterate through tasks for current date */}
            {tasks.map((task) => (
              <li key={task.id}>
                {task.task}
                {/* You can display additional task details here */}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TaskList;