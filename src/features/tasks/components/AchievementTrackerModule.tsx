import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import {
  Box,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import {
  achievementCatalog,
  engagementUpdateEvent,
  getAchievementHistory,
  type AchievementUnlockEntry,
} from "@/shared/utils/engagementTracker";

const AchievementTrackerModule: React.FC = () => {
  const [achievementHistory, setAchievementHistory] = useState<
    AchievementUnlockEntry[]
  >([]);

  useEffect(() => {
    const reload = () => {
      setAchievementHistory(getAchievementHistory());
    };
    reload();
    window.addEventListener("storage", reload);
    window.addEventListener(engagementUpdateEvent, reload);
    return () => {
      window.removeEventListener("storage", reload);
      window.removeEventListener(engagementUpdateEvent, reload);
    };
  }, []);

  const achievementUnlockMap = useMemo(() => {
    return new Map(achievementHistory.map((entry) => [entry.key, entry]));
  }, [achievementHistory]);

  const unlockedCount = achievementCatalog.filter((item) =>
    achievementUnlockMap.has(item.key)
  ).length;
  const progressValue =
    achievementCatalog.length === 0
      ? 0
      : (unlockedCount / achievementCatalog.length) * 100;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="h2">
            Achievements
          </Typography>
          <Chip label={`${unlockedCount}/${achievementCatalog.length} unlocked`} />
        </Stack>

        <Box sx={{ mt: 1.5 }}>
          <Typography variant="caption" color="text.secondary">
            Achievement Progress
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progressValue}
            sx={{ mt: 0.5, height: 8, borderRadius: 1 }}
          />
        </Box>

        <Typography variant="subtitle2" sx={{ mt: 2 }}>
          Achievements
        </Typography>
        <List dense sx={{ py: 0 }}>
          {achievementCatalog.map((item) => {
            const unlocked = achievementUnlockMap.get(item.key);
            return (
              <ListItem key={item.key} sx={{ px: 0 }}>
                <ListItemText
                  primary={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="body2">{item.title}</Typography>
                      <Chip
                        size="small"
                        label={unlocked ? "Unlocked" : "Locked"}
                        color={unlocked ? "success" : "default"}
                      />
                    </Stack>
                  }
                  secondary={
                    unlocked
                      ? `${item.description} • ${format(
                          new Date(unlocked.unlockedAt),
                          "PPp"
                        )}`
                      : item.description
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};

export default AchievementTrackerModule;
