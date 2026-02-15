import { FC } from "react";
import { StickyNoteColor, stickyNoteColors } from "../hooks/useNotes";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";

const SelectNoteColor: FC<{
  handelSelectNoteColor: (color: StickyNoteColor) => void;
  selectedColor: StickyNoteColor;
}> = ({ handelSelectNoteColor, selectedColor }) => {
  return (
    <FormControl size="small" sx={{ minWidth: 140 }}>
      <Select
        value={selectedColor}
        onChange={(event: SelectChangeEvent) =>
          handelSelectNoteColor(event.target.value as StickyNoteColor)
        }
        sx={{
          color: stickyNoteColors[selectedColor].text,
          backgroundColor: stickyNoteColors[selectedColor].note,
          borderRadius: 2,
        }}
      >
        {Object.keys(stickyNoteColors).map((color) => (
          <MenuItem
            key={color}
            value={color}
            sx={{
              color: stickyNoteColors[color as StickyNoteColor].text,
              backgroundColor: stickyNoteColors[color as StickyNoteColor].note,
            }}
          >
            {color}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectNoteColor;
