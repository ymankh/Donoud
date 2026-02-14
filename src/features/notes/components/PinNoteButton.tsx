import { FC, MouseEventHandler } from "react";
import { TiPinOutline, TiPin } from "react-icons/ti";

const PinNoteButton: FC<{
  onClick: MouseEventHandler<SVGElement>;
  active: boolean;
  color: string;
}> = ({ onClick, active, color }) => {
  return (
    <>
      {active ? (
        <TiPin style={{ fontSize: 20, color }} onClick={onClick} />
      ) : (
        <TiPinOutline
          style={{ fontSize: 20, color }}
          onClick={onClick}
        />
      )}
    </>
  );
};

export default PinNoteButton;
