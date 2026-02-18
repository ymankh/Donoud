import { useEffect, useRef, useState } from "react";
import { GiSwan } from "react-icons/gi";
import { Notifications } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useFilter } from "@/shared/hooks/useFilter";
import {
  clearMessageHistory,
  engagementUpdateEvent,
  getMessageHistory,
  type MessageHistoryEntry,
  unlockEasterEgg,
} from "@/shared/utils/engagementTracker";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Chip,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { format } from "date-fns";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "min(260px, 48vw)",
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
  const [clicksCounter, setClicksCounter] = useState(0);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [messageHistory, setMessageHistory] = useState<MessageHistoryEntry[]>([]);
  const holdTimerRef = useRef<ReturnType<typeof globalThis.setTimeout> | null>(null);
  const { filter, setFilter } = useFilter();
  // Function that returns a random sentence/message
  const getRandomIndex = () => {
    return sentences[Math.floor(Math.random() * sentences.length)];
  };
  const onClick = () => {
    setClicksCounter((prevCounter) =>
      prevCounter + 1 <= 3 ? prevCounter + 1 : 0
    );
    if (clicksCounter >= 3) {
      const message = getRandomIndex();
      toast.warning(message);
      unlockEasterEgg("swan-guardian", "navbar:swan-click");
    }
  };

  const onSwanHoldStart = () => {
    if (holdTimerRef.current) {
      globalThis.clearTimeout(holdTimerRef.current);
    }
    holdTimerRef.current = globalThis.setTimeout(() => {
      const sessionKey = "swan-long-press-toast";
      if (!sessionStorage.getItem(sessionKey)) {
        const message = "You found the swan's secret long-press. 🦢";
        toast.info(message);
        unlockEasterEgg("swan-long-press", "navbar:swan-long-press");
        sessionStorage.setItem(sessionKey, "true");
      }
    }, 3000);
  };

  const onSwanHoldEnd = () => {
    if (holdTimerRef.current) {
      globalThis.clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };
  useEffect(() => {
    const reload = () => {
      setMessageHistory(getMessageHistory());
    };
    reload();
    window.addEventListener("storage", reload);
    window.addEventListener(engagementUpdateEvent, reload);

    const intervalId = setInterval(() => {
      setClicksCounter((prevCounter) =>
        prevCounter - 1 >= 0 ? prevCounter - 1 : 0
      );
    }, 1000);

    return () => {
      window.removeEventListener("storage", reload);
      window.removeEventListener(engagementUpdateEvent, reload);
      clearInterval(intervalId); // Clean up the interval when the component unmounts
      onSwanHoldEnd();
    };
  }, []);

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box component="span" sx={{ fontSize: 30, display: "flex", cursor: "pointer" }}>
            <GiSwan
              onClick={onClick}
              onMouseDown={onSwanHoldStart}
              onMouseUp={onSwanHoldEnd}
              onMouseLeave={onSwanHoldEnd}
              onTouchStart={onSwanHoldStart}
              onTouchEnd={onSwanHoldEnd}
            />
          </Box>
          <Typography variant="h6" component="span">
            DoNoud
          </Typography>
        </Box>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Search>
            <StyledInputBase
              placeholder="Filter"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            />
          </Search>
          <IconButton
            color="inherit"
            aria-label="message history"
            onClick={() => setHistoryOpen(true)}
          >
            <Badge
              color="error"
              badgeContent={messageHistory.length > 99 ? "99+" : messageHistory.length}
            >
              <Notifications />
            </Badge>
          </IconButton>
        </Stack>
      </Toolbar>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
      >
        <DialogTitle>Messages History</DialogTitle>
        <DialogContent dividers>
          {messageHistory.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No messages yet.
            </Typography>
          ) : (
            <List dense sx={{ py: 0 }}>
              {messageHistory.slice(0, 80).map((entry) => (
                <ListItem key={entry.id} sx={{ px: 0 }}>
                  <ListItemText
                    primary={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip size="small" label={entry.type} />
                        <Typography variant="body2">{entry.message}</Typography>
                      </Stack>
                    }
                    secondary={`${entry.source} • ${format(
                      new Date(entry.createdAt),
                      "PPp"
                    )}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHistoryOpen(false)}>Close</Button>
          <Button
            color="error"
            disabled={messageHistory.length === 0}
            onClick={() => {
              clearMessageHistory();
              setMessageHistory([]);
            }}
          >
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Navbar;
