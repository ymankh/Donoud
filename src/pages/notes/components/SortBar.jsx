import { Container } from "react-bootstrap";
import { FaArrowUp, FaSortAmountDown } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { FaArrowDown } from "react-icons/fa6";
import { useContext, useState } from "react";
import NoteContext from "../../../contexts/NoteContext";

function SortBar() {
  const {
    sortOptions,
    sortValue: value,
    setSortValue: setValue,
    orderReversed,
    setOrderReversed,
  } = useContext(NoteContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      <div className="d-flex flex-row-reverse">
        <div>
          <button
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className="btn"
          >
            <FaSortAmountDown className="me-2" />
            {value}
          </button>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            {sortOptions.map((option) => {
              return (
                <MenuItem
                  key={option}
                  onClick={() => {
                    setValue(option);
                    handleClose();
                  }}
                >
                  {option}
                </MenuItem>
              );
            })}
          </Menu>{" "}
          |{" "}
          <button
            className="btn"
            onClick={() => setOrderReversed((pre) => !pre)}
          >
            {orderReversed ? <FaArrowUp /> : <FaArrowDown />}
          </button>
        </div>
      </div>
    </Container>
  );
}
export default SortBar;
