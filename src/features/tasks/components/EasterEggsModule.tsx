import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  Chip,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import {
  easterEggCatalog,
  engagementUpdateEvent,
  getEasterEggHistory,
  type AchievementUnlockEntry,
} from "@/shared/utils/engagementTracker";

const EasterEggsModule: React.FC = () => {
  const [history, setHistory] = useState<AchievementUnlockEntry[]>([]);

  useEffect(() => {
    const reload = () => {
      setHistory(getEasterEggHistory());
    };
    reload();
    window.addEventListener("storage", reload);
    window.addEventListener(engagementUpdateEvent, reload);
    return () => {
      window.removeEventListener("storage", reload);
      window.removeEventListener(engagementUpdateEvent, reload);
    };
  }, []);

  const historyMap = useMemo(() => {
    return new Map(history.map((entry) => [entry.key, entry]));
  }, [history]);

  const discovered = easterEggCatalog.filter((egg) => historyMap.has(egg.key));
  const progressValue =
    easterEggCatalog.length === 0
      ? 0
      : (discovered.length / easterEggCatalog.length) * 100;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="h2">
            Easter Eggs
          </Typography>
          <Chip label={`${discovered.length}/${easterEggCatalog.length} discovered`} />
        </Stack>

        <Typography variant="caption" color="text.secondary" sx={{ mt: 1.2, display: "block" }}>
          Only discovered easter eggs are shown.
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progressValue}
          sx={{ mt: 0.6, height: 8, borderRadius: 1 }}
        />

        <Divider sx={{ my: 1.5 }} />
        {discovered.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No easter eggs discovered yet.
          </Typography>
        ) : (
          <List dense sx={{ py: 0 }}>
            {discovered.map((egg) => {
              const unlocked = historyMap.get(egg.key);
              return (
                <ListItem key={egg.key} sx={{ px: 0 }}>
                  <ListItemText
                    primary={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2">{egg.title}</Typography>
                        <Chip size="small" label="Discovered" color="success" />
                      </Stack>
                    }
                    secondary={
                      unlocked
                        ? `${egg.description} • How to unlock: ${egg.unlockHint} • Discovered ${format(
                            new Date(unlocked.unlockedAt),
                            "PPp"
                          )}`
                        : `${egg.description} • How to unlock: ${egg.unlockHint}`
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default EasterEggsModule;
