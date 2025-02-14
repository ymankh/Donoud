import { FC, MouseEventHandler } from "react";
import { TiPinOutline, TiPin } from "react-icons/ti";

const PinNoteButton: FC<{
  onClick: MouseEventHandler<SVGElement>;
  active: boolean;
}> = ({ onClick, active }) => {
  return (
    <>
      {active ? (
        <TiPin style={{ fontSize: 20, color: "#E8E0E8" }} onClick={onClick} />
      ) : (
        <TiPinOutline
          style={{ fontSize: 20, color: "#E8E0E8" }}
          onClick={onClick}
        />
      )}
    </>
  );
};

export default PinNoteButton;
