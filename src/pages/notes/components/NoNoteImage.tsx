import noNotes from "../../../assets/noNotes.svg";

const NoNoteImage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center ">
      <img src={noNotes} alt="no notes" className="img-fluid" />
    </div>
  );
};

export default NoNoteImage;
