import { FC } from "react";
import { taskCategories, TaskCategory } from "../Models/TasksModel"

const SelectCategory: FC<{ handelSelect: (valuer: TaskCategory) => void, selectedTaskCategory: TaskCategory }> = ({ handelSelect, selectedTaskCategory }) => {
    return <select
        className="form-control"
        id="Task"
        aria-describedby="newTask"
        value={selectedTaskCategory}
        onChange={(event) => handelSelect(event.target.value as TaskCategory)}
    >
        <option value="" disabled>
            Category
        </option>
        {taskCategories.map((category) => (
            <option key={category} value={category}>
                {category}
            </option>
        ))}
    </select>
}

export default SelectCategory;