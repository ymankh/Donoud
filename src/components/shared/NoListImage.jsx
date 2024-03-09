import noListImage from "../../images/nolist.png";

const NoListImage = () => {
  return (
    <>
      <h6>It is time to be productive. Every second counts...</h6>
      <img className="no-lists" src={noListImage} alt="No tasks yet" />
    </>
  );
};

export default NoListImage;
