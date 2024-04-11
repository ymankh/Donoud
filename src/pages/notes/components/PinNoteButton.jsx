import { TiPinOutline, TiPin } from "react-icons/ti";

const PinNoteButton = ({ onClick, active }) => {
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
