import { FC } from 'react'
import { StickyNoteColor, stickyNoteColors } from '../../../contexts/NoteContext'



const SelectNoteColor: FC<{ handelSelectNoteColor: (color: StickyNoteColor) => void, selectedColor: StickyNoteColor }> = ({ handelSelectNoteColor, selectedColor }) => {


    return <select
        value={selectedColor}
        onChange={(event) => handelSelectNoteColor(event.target.value as StickyNoteColor)}
        className="border px-2 py-1 rounded"
        style={{ color: stickyNoteColors[selectedColor].text, backgroundColor: stickyNoteColors[selectedColor].note }}
    >
        {Object.keys(stickyNoteColors).
            map(color => <option
                key={color} value={color}
                style={{
                    color: stickyNoteColors[color as StickyNoteColor].text,
                    backgroundColor: stickyNoteColors[color as StickyNoteColor].note
                }}
            >{color}</option>)}
    </select>;
};

export default SelectNoteColor;