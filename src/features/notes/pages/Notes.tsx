import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
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
import {
  ArrowDownward,
  ArrowUpward,
  ContentCopy,
  ContentPaste,
  Delete,
  DriveFileMove,
  MoreVert,
  Sort,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { notesRoutes } from "../routes";
import { NotesClipboardMode } from "../hooks/useNotes";

const NOTES_CLIPBOARD_KEY = "notes-selection-clipboard";

type NotesClipboard = {
  noteIds: string[];
  folderIds: string[];
  mode: NotesClipboardMode;
};

const readClipboardFromSession = (): NotesClipboard | null => {
  try {
    const raw = sessionStorage.getItem(NOTES_CLIPBOARD_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as NotesClipboard;
    if (
      !parsed ||
      !Array.isArray(parsed.noteIds) ||
      !Array.isArray(parsed.folderIds) ||
      (parsed.mode !== "copy" && parsed.mode !== "move")
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

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

type NotesMode = "root" | "all-notes" | "folder";

interface NotesProps {
  mode: NotesMode;
}

const Notes = ({ mode }: NotesProps) => {
  const navigate = useNavigate();
  const { folderId } = useParams<{ folderId: string }>();
  const {
    notes: allNotes,
    folders,
    deleteEmptyNotes,
    deleteSelection,
    pasteSelection,
    sortOptions,
    sortValue,
    setSortValue,
    orderReversed,
    setOrderReversed,
    selectedFolderPath,
    setSelectedFolder,
  } = useNotes();
  const { filter } = useFilter();
  const [sortAnchorEl, setSortAnchorEl] = useState<HTMLElement | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([]);
  const [selectedFolderIds, setSelectedFolderIds] = useState<string[]>([]);
  const [clipboard, setClipboard] = useState<NotesClipboard | null>(
    readClipboardFromSession
  );
  const sortMenuOpen = Boolean(sortAnchorEl);
  const menuOpen = Boolean(menuAnchorEl);
  const activeFolderId = mode === "folder" ? folderId ?? "" : "";
  const isAllNotes = mode === "all-notes";

  const rootChildFolders = useMemo(
    () => folders.filter((folder) => (folder.parentId ?? "") === activeFolderId),
    [folders, activeFolderId]
  );

  const childFolders = useMemo(() => {
    if (isAllNotes) return [];
    return rootChildFolders;
  }, [rootChildFolders, isAllNotes]);

  const selectionMode = selectedNoteIds.length > 0 || selectedFolderIds.length > 0;
  const selectedCount = selectedNoteIds.length + selectedFolderIds.length;

  const notes = allNotes
    .filter((note) =>
      note.text.includes(filter) &&
      (isAllNotes
        ? true
        : activeFolderId
          ? note.folderId === activeFolderId
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
  }, [deleteEmptyNotes]);

  useEffect(() => {
    setSelectedFolder(activeFolderId);
  }, [activeFolderId, setSelectedFolder]);

  useEffect(() => {
    if (mode !== "folder") return;
    if (!folderId || !folders.some((folder) => folder.id === folderId)) {
      navigate(notesRoutes.root, { replace: true });
    }
  }, [mode, folderId, folders, navigate]);

  useEffect(() => {
    setSelectedNoteIds((prev) => prev.filter((id) => allNotes.some((note) => note.id === id)));
    setSelectedFolderIds((prev) => prev.filter((id) => folders.some((folder) => folder.id === id)));
  }, [allNotes, folders]);

  useEffect(() => {
    if (!clipboard) {
      sessionStorage.removeItem(NOTES_CLIPBOARD_KEY);
      return;
    }
    sessionStorage.setItem(NOTES_CLIPBOARD_KEY, JSON.stringify(clipboard));
  }, [clipboard]);

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

  const toggleNoteSelection = (id: string) => {
    setSelectedNoteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleFolderSelection = (id: string) => {
    setSelectedFolderIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const longPressSelectNote = (id: string) => {
    setSelectedNoteIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const longPressSelectFolder = (id: string) => {
    setSelectedFolderIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const clearSelection = () => {
    setSelectedNoteIds([]);
    setSelectedFolderIds([]);
  };

  const copySelection = (modeValue: NotesClipboardMode) => {
    if (!selectionMode) return;
    setClipboard({
      noteIds: selectedNoteIds,
      folderIds: selectedFolderIds,
      mode: modeValue,
    });
    clearSelection();
  };

  const removeSelection = () => {
    if (!selectionMode) return;
    deleteSelection({ noteIds: selectedNoteIds, folderIds: selectedFolderIds });
    clearSelection();
  };

  const pasteClipboard = () => {
    if (!clipboard) return;
    pasteSelection(
      { noteIds: clipboard.noteIds, folderIds: clipboard.folderIds },
      activeFolderId,
      clipboard.mode
    );
    if (clipboard.mode === "move") {
      setClipboard(null);
    }
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      <Container sx={{ pt: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
          {!isAllNotes ? (
            <Breadcrumbs aria-label="folder breadcrumb">
              <Link
                underline="hover"
                color={!activeFolderId ? "text.primary" : "inherit"}
                onClick={() => {
                  navigate(notesRoutes.root);
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
                    onClick={() => navigate(notesRoutes.folder(folder.id))}
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
            {selectionMode ? (
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="body2" sx={{ mr: 1 }}>
                  {selectedCount} selected
                </Typography>
                <Tooltip title="Copy">
                  <IconButton size="small" color="inherit" onClick={() => copySelection("copy")}>
                    <ContentCopy fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Move">
                  <IconButton size="small" color="inherit" onClick={() => copySelection("move")}>
                    <DriveFileMove fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton size="small" color="error" onClick={removeSelection}>
                    <Delete fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Button size="small" color="inherit" onClick={clearSelection}>
                  Cancel
                </Button>
              </Stack>
            ) : (
              <Stack direction="row" spacing={0.5} alignItems="center">
                {clipboard && (
                  <Tooltip title={`Paste ${clipboard.mode}`}>
                    <IconButton size="small" color="inherit" onClick={pasteClipboard}>
                      <ContentPaste fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
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
              </Stack>
            )}
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
              navigate(notesRoutes.root);
              closeMenu();
            }}
          >
            Root contents
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate(notesRoutes.all);
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
                    <FolderCard
                      id={folder.id}
                      name={folder.name}
                      onOpen={() => navigate(notesRoutes.folder(folder.id))}
                      selectionMode={selectionMode}
                      selected={selectedFolderIds.includes(folder.id)}
                      onToggleSelect={toggleFolderSelection}
                      onLongPressSelect={longPressSelectFolder}
                    />
                  </motion.div>
                ))}
                {notes.map((note) => (
                  <motion.div key={note.id} variants={item} exit="exit">
                    <Note
                      note={note}
                      selectionMode={selectionMode}
                      selected={selectedNoteIds.includes(note.id)}
                      onToggleSelect={toggleNoteSelection}
                      onLongPressSelect={longPressSelectNote}
                    />
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
