import noNotes from "../../../assets/noNotes.svg";

const NoNoteImage = () => {
  return (
    <div className="row">
      <div className="col">
        <img className="w-100" src={noNotes} alt="no notes" />
      </div>
    </div>
  );
};

export default NoNoteImage;
