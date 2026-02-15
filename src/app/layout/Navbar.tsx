import { useEffect, useState } from "react";
import { GiSwan } from "react-icons/gi";
import { toast } from "react-toastify";
import { useFilter } from "@/shared/hooks/useFilter";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "150px",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 1.5),
    width: "100%",
  },
}));

const sentences = [
  "Cease interfering with the swan's territory! 🛑",
  "Quit disturbing the swan's serene environment! ❌",
  "Desist from agitating the swan! 🚫",
  "Halt provoking the swan's tranquility! 🛑",
  "Refrain from bothering the graceful swan! 🦢",
  "Stop irritating the elegant swan! 😡",
  "Cease disrupting the swan's peaceful demeanor! 🚫",
  "Quit bothering the majestic swan! 🛑",
  "Desist from disturbing the swan's graceful glide! ❌",
  "Halt interfering with the serene presence of the swan! 🦢",
];

const Navbar = () => {
  const [clicksCounter, setClickCounter] = useState(0);
  const { filter, setFilter } = useFilter();
  // Function that returns a random sentence/message
  const getRandomIndex = () => {
    return sentences[Math.floor(Math.random() * sentences.length)];
  };
  const onClick = () => {
    setClickCounter((prevCounter) =>
      prevCounter + 1 <= 3 ? prevCounter + 1 : 0
    );
    if (clicksCounter >= 3) {
      toast.warning(getRandomIndex());
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setClickCounter((prevCounter) =>
        prevCounter - 1 >= 0 ? prevCounter - 1 : 0
      );
    }, 1000);

    return () => {
      clearInterval(intervalId); // Clean up the interval when the component unmounts
    };
  }, []);

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box component="span" sx={{ fontSize: 30, display: "flex", cursor: "pointer" }}>
            <GiSwan onClick={onClick} />
          </Box>
          <Typography variant="h6" component="span">
            DoNoud
          </Typography>
        </Box>
        <Search>
          <StyledInputBase
            placeholder="Filter"
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
