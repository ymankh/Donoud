import { ChangeEvent, FormEvent, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { TaskCategory } from "../models/TasksModel";
import { getBestTaskMatch, getSentenceForTask, randomEmoji } from "../utils/sentencesGenerator";
import SelectCategory from "./SelectCategory";
import { useTasks } from "../hooks/useTasks";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";
import { unlockEasterEgg } from "@/shared/utils/engagementTracker";

const EMOJI_COMBO_KEY = "easter-emoji-combo-count";
const LEGEND_UNLOCK_KEY = "easter-100th-task-unlocked";
const MAGIC_WORDS = ["moonlight", "stardust", "ضوء القمر", "نجمتي"] as const;
const FRIDAY_PRAYER_KEY = "easter-friday-prayer-toast";
const FRIDAY_PRAYER_WORDS = ["pray", "prayer", "صلاة", "دعاء", "quran", "قرآن"] as const;
const LUCKY_SEVEN_MINUTES = new Set([7, 17, 27, 37, 47, 57]);
const AUTHOR_EASTER_EGGS = [
  {
    id: "tolkien",
    triggers: ["tolkien", "j.r.r. tolkien", "hobbit", "middle earth"],
    message:
      "You invoked Tolkien mode. One task may seem small, but even the smallest step can shift the map of your entire day. Keep walking your road with courage and consistency. 📜🧭",
  },
  {
    id: "dostoevsky",
    triggers: ["dostoevsky", "crime and punishment", "karamazov"],
    message:
      "Dostoevsky easter egg unlocked. Deep work begins when you face the hard task instead of escaping it; finish this one honestly, and the next decision becomes lighter. 🕯️📘",
  },
  {
    id: "orwell",
    triggers: ["orwell", "1984", "animal farm", "george orwell"],
    message:
      "Orwell signal detected. Clear words create clear thought, so write your next task in plain language and execute it exactly. Precision is power. 📝⚙️",
  },
  {
    id: "agatha",
    triggers: ["agatha", "agatha christie", "poirot", "marple"],
    message:
      "Agatha Christie mystery unlocked. Treat your backlog like clues: sort by evidence, remove noise, and solve one item at a time until the story closes cleanly. 🔍🗂️",
  },
  {
    id: "mahfouz",
    triggers: ["mahfouz", "naguib mahfouz", "محفوظ", "نجيب محفوظ"],
    message:
      "Naguib Mahfouz easter egg found. Great days are built in ordinary streets and small routines, so honor this simple task and let it become part of a bigger life story. 🌇📚",
  },
] as const;
const emojiStartRegex =
  /^\s*(?:[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}])/u;
const hasLettersRegex = /\p{L}/u;
const nonAlphaNumericRegex = /[^\p{L}\p{N}]/gu;

const AddTaskForm = () => {
  const [task, setTask] = useState("");
  const [selectedTaskCategory, setSelectedTaskCategory] =
    useState<TaskCategory>("" as TaskCategory);
  const { addTask, tasks } = useTasks();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.length < 5) {
      toast.error("Task should be at least 5 characters" + randomEmoji(), {
        transition: Bounce,
        style: {
          backgroundColor: "#7F1D1D",
          color: "#FFFFFF",
        },
      });
      return;
    }

    const showToast = (sentence: string) => {
      toast.success(sentence, {
        transition: Bounce,
        style: {
          backgroundColor: "#14532D",
          color: "#FFFFFF",
        },
      });
    };

    const handleTask = (task: string) => {
      const taskName = getBestTaskMatch(task);
      if (taskName) {
        showToast(getSentenceForTask(taskName));
      }
    };

    const handleEasterEggs = (taskText: string, totalTasksAfterAdd: number) => {
      if (
        totalTasksAfterAdd === 100 &&
        !localStorage.getItem(LEGEND_UNLOCK_KEY)
      ) {
        toast.success("Legend mode unlocked: 100 tasks reached. 🏆");
        localStorage.setItem(LEGEND_UNLOCK_KEY, "true");
      }

      if (emojiStartRegex.test(taskText)) {
        const nextCombo =
          Number(sessionStorage.getItem(EMOJI_COMBO_KEY) || "0") + 1;
        if (nextCombo >= 3) {
          toast.success("Emoji combo unlocked. Pure vibes. ✨");
          sessionStorage.removeItem(EMOJI_COMBO_KEY);
        } else {
          sessionStorage.setItem(EMOJI_COMBO_KEY, String(nextCombo));
        }
      } else {
        sessionStorage.removeItem(EMOJI_COMBO_KEY);
      }

      const lowered = taskText.toLocaleLowerCase();
      const trimmedTask = taskText.trim();
      const foundMagicWord = MAGIC_WORDS.find((word) =>
        lowered.includes(word.toLocaleLowerCase())
      );
      if (foundMagicWord) {
        const magicKey = `easter-magic-word-${foundMagicWord.toLocaleLowerCase()}`;
        if (!sessionStorage.getItem(magicKey)) {
          toast.info("Secret keyword found. The stars noticed. ✨");
          sessionStorage.setItem(magicKey, "true");
        }
      }

      const now = new Date();
      const normalized = lowered.replace(nonAlphaNumericRegex, "");
      const reversed = normalized.split("").reverse().join("");

      if (
        normalized.length > 1 &&
        normalized === reversed &&
        unlockEasterEgg("palindrome-task", "tasks:add-palindrome")
      ) {
        toast.info("Palindrome detected. Mirror words unlocked. 🪞");
      }

      if (
        trimmedTask.length > 0 &&
        hasLettersRegex.test(trimmedTask) &&
        trimmedTask === trimmedTask.toLocaleUpperCase() &&
        unlockEasterEgg("caps-lock-prophecy", "tasks:add-caps")
      ) {
        toast.info("Caps lock prophecy unlocked. 📣");
      }

      if (trimmedTask.length === 5 && unlockEasterEgg("tiny-task", "tasks:add-tiny")) {
        toast.success("Tiny task unlocked: exactly five characters. 🤏");
      }

      const minutes = now.getMinutes();
      if (
        now.getHours() === 5 &&
        minutes <= 15 &&
        unlockEasterEgg("sunrise-entry", "tasks:add-sunrise")
      ) {
        toast.info("Sunrise entry unlocked. ☀️");
      }

      if (
        now.getHours() === 0 &&
        minutes <= 10 &&
        unlockEasterEgg("moonwalker-entry", "tasks:add-moonwalker")
      ) {
        toast.info("Moonwalker entry unlocked. 🌙");
      }

      if (
        LUCKY_SEVEN_MINUTES.has(minutes) &&
        unlockEasterEgg("lucky-seven", "tasks:add-lucky-seven")
      ) {
        toast.info("Lucky seven unlocked. 🎰");
      }

      const isFriday = now.getDay() === 5;
      if (isFriday) {
        const hasPrayerWord = FRIDAY_PRAYER_WORDS.some((word) =>
          lowered.includes(word.toLocaleLowerCase())
        );
        const fridayKey = `${FRIDAY_PRAYER_KEY}-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        if (hasPrayerWord && !sessionStorage.getItem(fridayKey)) {
          toast.success("Jumu'ah special unlocked. ✨");
          sessionStorage.setItem(fridayKey, "true");
        }
      }

      const foundAuthor = AUTHOR_EASTER_EGGS.find((author) =>
        author.triggers.some((trigger) =>
          lowered.includes(trigger.toLocaleLowerCase())
        )
      );
      if (foundAuthor) {
        toast.info(foundAuthor.message, {
          autoClose: 9000,
          style: {
            backgroundColor: "#0C4A6E",
            color: "#FFFFFF",
          },
        });
      }
    };

    handleTask(task);
    handleEasterEggs(task, tasks.length + 1);
    addTask(task, selectedTaskCategory);
    setTask("");
    setSelectedTaskCategory("");
  };

  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Add a new task
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <Box sx={{ flex: "1 1 auto" }}>
            <TextField
              fullWidth
              size="small"
              id="Task"
              placeholder="ex water the plant..."
              value={task}
              onChange={onChange}
            />
          </Box>
          <Box sx={{ width: { xs: "100%", sm: 180 } }}>
            <SelectCategory selectedTaskCategory={selectedTaskCategory} handelSelect={(value: TaskCategory) => setSelectedTaskCategory(value)} />
          </Box>
        </Stack>
      </Box>
      <Button type="submit" variant="contained" color="primary" size="large">
        Add task
      </Button>
    </form>
  );
};

export default AddTaskForm;
