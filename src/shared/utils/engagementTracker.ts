export type MessageType = "success" | "info" | "warning" | "error";

export interface MessageHistoryEntry {
  id: string;
  message: string;
  type: MessageType;
  source: string;
  createdAt: string;
}

export interface AchievementMeta {
  key: string;
  title: string;
  description: string;
}

export interface EasterEggMeta {
  key: string;
  title: string;
  description: string;
  unlockHint: string;
}

export interface AchievementUnlockEntry {
  key: string;
  unlockedAt: string;
  source: string;
}

const MESSAGE_HISTORY_KEY = "donoud-message-history";
const ACHIEVEMENT_HISTORY_KEY = "donoud-achievement-history";
const EASTER_EGG_HISTORY_KEY = "donoud-easter-egg-history";
const ENGAGEMENT_UPDATE_EVENT = "donoud-engagement-updated";
const MAX_MESSAGE_HISTORY = 120;

export const achievementCatalog: AchievementMeta[] = [
  {
    key: "daily-completion",
    title: "Task Finisher",
    description: "Complete all tasks in one day.",
  },
  {
    key: "speedrun",
    title: "Morning Speedrun",
    description: "Complete all tasks before 12:00 PM.",
  },
  {
    key: "streak-7",
    title: "Perfect Week",
    description: "Reach a 7-day completion streak.",
  },
];

export const easterEggCatalog: EasterEggMeta[] = [
  {
    key: "birthday-toast",
    title: "Birthday Surprise",
    description: "A birthday greeting appears in the app.",
    unlockHint: "Open the app on February 17.",
  },
  {
    key: "night-owl",
    title: "Night Owl",
    description: "A late-night mode message is triggered.",
    unlockHint: "Open the app between 12:00 AM and 12:04 AM.",
  },
  {
    key: "swan-guardian",
    title: "Swan Guardian",
    description: "The swan warns you about disturbing its area.",
    unlockHint: "Tap the swan icon repeatedly until the warning toast appears.",
  },
  {
    key: "swan-long-press",
    title: "Swan Secret",
    description: "A hidden long-press swan message appears.",
    unlockHint: "Press and hold the swan icon for 3 seconds.",
  },
];

const createId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const readFromStorage = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as T;
    return parsed;
  } catch {
    return fallback;
  }
};

const writeToStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(ENGAGEMENT_UPDATE_EVENT));
};

export const recordMessageHistory = (input: {
  message: string;
  type: MessageType;
  source: string;
}) => {
  const history = readFromStorage<MessageHistoryEntry[]>(MESSAGE_HISTORY_KEY, []);
  const next: MessageHistoryEntry = {
    id: createId(),
    message: input.message,
    type: input.type,
    source: input.source,
    createdAt: new Date().toISOString(),
  };
  const trimmed = [next, ...history].slice(0, MAX_MESSAGE_HISTORY);
  writeToStorage(MESSAGE_HISTORY_KEY, trimmed);
};

const unlockFromCatalog = (
  key: string,
  source: string,
  storageKey: string,
  catalog: Array<{ key: string }>
) => {
  const existsInCatalog = catalog.some((item) => item.key === key);
  if (!existsInCatalog) return false;

  const history = readFromStorage<AchievementUnlockEntry[]>(storageKey, []);
  if (history.some((item) => item.key === key)) {
    return false;
  }
  const next: AchievementUnlockEntry = {
    key,
    unlockedAt: new Date().toISOString(),
    source,
  };
  writeToStorage(storageKey, [next, ...history]);
  return true;
};

export const unlockAchievement = (key: string, source: string): boolean =>
  unlockFromCatalog(key, source, ACHIEVEMENT_HISTORY_KEY, achievementCatalog);

export const unlockEasterEgg = (key: string, source: string): boolean =>
  unlockFromCatalog(key, source, EASTER_EGG_HISTORY_KEY, easterEggCatalog);

export const getMessageHistory = () =>
  readFromStorage<MessageHistoryEntry[]>(MESSAGE_HISTORY_KEY, []);

export const clearMessageHistory = () => {
  writeToStorage(MESSAGE_HISTORY_KEY, []);
};

export const getAchievementHistory = () =>
  readFromStorage<AchievementUnlockEntry[]>(ACHIEVEMENT_HISTORY_KEY, []);

export const getEasterEggHistory = () =>
  readFromStorage<AchievementUnlockEntry[]>(EASTER_EGG_HISTORY_KEY, []);

export const engagementUpdateEvent = ENGAGEMENT_UPDATE_EVENT;
