import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Note from "../components/Note";
import { MouseEvent, useEffect, useMemo, useState } from "react";
import NoNoteImage from "../components/NoNoteImage";
import { motion, AnimatePresence } from "framer-motion";
import AddNoteFloatButton from "../components/AddNoteFloatButton";
import { useNotes } from "../hooks/useNotes";
import { useFilter } from "@/shared/hooks/useFilter";
import FolderCard from "../components/FolderCard";
import { ArrowDownward, ArrowUpward, MoreVert, Sort } from "@mui/icons-material";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const Notes = () => {
  const {
    notes: allNotes,
    folders,
    deleteEmptyNotes,
    sortOptions,
    sortValue,
    setSortValue,
    orderReversed,
    setOrderReversed,
    selectedFolder,
    selectedFolderPath,
    setSelectedFolder,
  } = useNotes();
  const { filter } = useFilter();
  const [viewMode, setViewMode] = useState<"root" | "all-notes">("root");
  const [sortAnchorEl, setSortAnchorEl] = useState<HTMLElement | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const sortMenuOpen = Boolean(sortAnchorEl);
  const menuOpen = Boolean(menuAnchorEl);

  const rootChildFolders = useMemo(
    () =>
      folders.filter((folder) => (folder.parentId ?? "") === (selectedFolder || "")),
    [folders, selectedFolder]
  );

  const childFolders = useMemo(() => {
    if (viewMode === "all-notes") return [];
    return rootChildFolders;
  }, [rootChildFolders, viewMode]);

  const notes = allNotes
    .filter((note) =>
      note.text.includes(filter) &&
      (viewMode === "all-notes"
        ? true
        : selectedFolder
          ? note.folderId === selectedFolder
          : note.folderId === undefined)
    )
    .sort((a, b) => {
      let difference = 0;
      if (sortValue === "Date created")
        difference = b.date.getTime() - a.date.getTime();
      else difference = b.lastChange.getTime() - a.lastChange.getTime();
      if (orderReversed) return -difference;
      return difference;
    })
    .sort((a, b) => {
      if (Boolean(a.isPined) !== Boolean(b.isPined)) {
        return a.isPined ? -1 : 1;
      } else {
        return 0;
      }
    });

  useEffect(() => {
    deleteEmptyNotes();
  }, []);

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const openSortMenu = (event: MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

  const closeSortMenu = () => {
    setSortAnchorEl(null);
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      <Container sx={{ pt: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
          {viewMode !== "all-notes" ? (
            <Breadcrumbs aria-label="folder breadcrumb">
              <Link
                underline="hover"
                color={!selectedFolder ? "text.primary" : "inherit"}
                onClick={() => {
                  setSelectedFolder("");
                  setViewMode("root");
                }}
                sx={{ cursor: "pointer" }}
              >
                ~
              </Link>
              {selectedFolderPath.map((folder, index) => {
                const isLast = index === selectedFolderPath.length - 1;
                return isLast ? (
                  <Typography key={folder.id} color="text.primary">
                    {folder.name}
                  </Typography>
                ) : (
                  <Link
                    key={folder.id}
                    underline="hover"
                    color="inherit"
                    onClick={() => setSelectedFolder(folder.id)}
                    sx={{ cursor: "pointer" }}
                  >
                    {folder.name}
                  </Link>
                );
              })}
            </Breadcrumbs>
          ) : (
            <Box />
          )}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={openSortMenu}
              variant="text"
              color="inherit"
              startIcon={<Sort fontSize="small" />}
              size="small"
            >
              {sortValue}
            </Button>
            <IconButton
              size="small"
              color="inherit"
              onClick={() => setOrderReversed((prev) => !prev)}
              aria-label="toggle sort order"
            >
              {orderReversed ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
            </IconButton>
            <IconButton size="small" color="inherit" onClick={openMenu} aria-label="view options">
              <MoreVert fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Menu anchorEl={sortAnchorEl} open={sortMenuOpen} onClose={closeSortMenu}>
          {sortOptions.map((option) => (
            <MenuItem
              key={option}
              onClick={() => {
                setSortValue(option);
                closeSortMenu();
              }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
        <Menu anchorEl={menuAnchorEl} open={menuOpen} onClose={closeMenu}>
          <MenuItem
            onClick={() => {
              setViewMode("root");
              closeMenu();
            }}
          >
            Root contents
          </MenuItem>
          <MenuItem
            onClick={() => {
              setViewMode("all-notes");
              closeMenu();
            }}
          >
            All notes
          </MenuItem>
        </Menu>
      </Container>
      <AddNoteFloatButton />
      <AnimatePresence mode="wait">
        {notes.length > 0 || childFolders.length > 0 ? (
          <Container key="notes-list" sx={{ pb: 12 }}>
            <Box sx={{ m: 1 }} />
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              style={{
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              }}
            >
              <AnimatePresence>
                {childFolders.map((folder) => (
                  <motion.div key={`folder-${folder.id}`} variants={item} exit="exit">
                    <FolderCard name={folder.name} onOpen={() => setSelectedFolder(folder.id)} />
                  </motion.div>
                ))}
                {notes.map((note) => (
                  <motion.div key={note.id} variants={item} exit="exit">
                    <Note note={note} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </Container>
        ) : (
          <NoNoteImage key="no-notes" />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Notes;
