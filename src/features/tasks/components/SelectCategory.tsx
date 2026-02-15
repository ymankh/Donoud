import { FC } from "react";
import { taskCategories, TaskCategory } from "../models/TasksModel";
import { FormControl, Select, MenuItem, SelectChangeEvent } from "@mui/material";

const SelectCategory: FC<{ handelSelect: (valuer: TaskCategory) => void, selectedTaskCategory: TaskCategory }> = ({ handelSelect, selectedTaskCategory }) => {
    return (
        <FormControl fullWidth size="small">
            <Select
                id="Task"
                value={selectedTaskCategory}
                onChange={(event: SelectChangeEvent) => handelSelect(event.target.value as TaskCategory)}
                displayEmpty
            >
                <MenuItem value="" disabled>
                    Category
                </MenuItem>
                {taskCategories.map((category) => (
                    <MenuItem key={category} value={category}>
                        {category}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default SelectCategory;
