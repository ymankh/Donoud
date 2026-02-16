import { FaArrowUp, FaSortAmountDown } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { FaArrowDown } from "react-icons/fa6";
import { MouseEventHandler, useState } from "react";
import { useNotes } from "../hooks/useNotes";
import { Box, Button, Container, IconButton } from "@mui/material";

function SortBar() {
  const {
    sortOptions,
    sortValue: value,
    setSortValue: setValue,
    orderReversed,
    setOrderReversed,
  } = useNotes();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container sx={{ pt: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          variant="text"
          color="inherit"
          startIcon={<FaSortAmountDown />}
        >
          {value}
        </Button>
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
        </Menu>
        <IconButton color="inherit" onClick={() => setOrderReversed((pre) => !pre)} size="small">
          {orderReversed ? <FaArrowUp /> : <FaArrowDown />}
        </IconButton>
      </Box>
    </Container>
  );
}
export default SortBar;
