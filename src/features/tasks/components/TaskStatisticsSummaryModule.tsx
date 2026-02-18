import { useMemo } from "react";
import { format, startOfDay, subDays } from "date-fns";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Task } from "../models/TasksModel";

interface Props {
  tasks: Task[];
}

const TaskStatisticsSummaryModule: React.FC<Props> = ({ tasks }) => {
  const today = startOfDay(new Date());

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.done).length;
    const pending = total - completed;
    const overdue = tasks.filter(
      (task) => !task.done && startOfDay(task.date).getTime() < today.getTime()
    ).length;
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);
    const avgPerDay7 = Math.round(
      (Array.from({ length: 7 }).reduce<number>((acc, _, index) => {
        const day = subDays(today, index).getTime();
        return (
          acc +
          tasks.filter((task) => startOfDay(task.date).getTime() === day).length
        );
      }, 0) /
        7) *
        10
    ) / 10;
    const activeCategories = new Set(tasks.map((task) => task.category || "Uncategorized"))
      .size;

    return {
      total,
      completed,
      pending,
      overdue,
      completionRate,
      avgPerDay7,
      activeCategories,
    };
  }, [tasks, today]);

  const categoryChart = useMemo(() => {
    const counts = new Map<string, number>();
    tasks.forEach((task) => {
      const key = task.category || "Uncategorized";
      counts.set(key, (counts.get(key) || 0) + 1);
    });

    const maxCount = Math.max(...counts.values(), 0);
    return Array.from(counts.entries())
      .map(([label, value]) => ({
        label,
        value,
        percent: maxCount === 0 ? 0 : Math.round((value / maxCount) * 100),
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [tasks]);

  const categoryQualityChart = useMemo(() => {
    const byCategory = new Map<string, { total: number; done: number }>();
    tasks.forEach((task) => {
      const key = task.category || "Uncategorized";
      const existing = byCategory.get(key) || { total: 0, done: 0 };
      byCategory.set(key, {
        total: existing.total + 1,
        done: existing.done + (task.done ? 1 : 0),
      });
    });

    return Array.from(byCategory.entries())
      .map(([label, value]) => ({
        label,
        total: value.total,
        done: value.done,
        pending: value.total - value.done,
        completion: value.total === 0 ? 0 : Math.round((value.done / value.total) * 100),
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [tasks]);

  const weeklyChart = useMemo(() => {
    return Array.from({ length: 7 }).map((_, index) => {
      const day = subDays(today, 6 - index);
      const dayTasks = tasks.filter(
        (task) => startOfDay(task.date).getTime() === day.getTime()
      );
      const done = dayTasks.filter((task) => task.done).length;
      return {
        label: format(day, "EEE"),
        total: dayTasks.length,
        done,
        rate: dayTasks.length === 0 ? 0 : Math.round((done / dayTasks.length) * 100),
      };
    });
  }, [tasks, today]);

  const productivity14 = useMemo(() => {
    const last14 = Array.from({ length: 14 }).map((_, index) => {
      const day = subDays(today, 13 - index);
      const dayTasks = tasks.filter(
        (task) => startOfDay(task.date).getTime() === day.getTime()
      );
      const done = dayTasks.filter((task) => task.done).length;
      return {
        label: format(day, "d"),
        total: dayTasks.length,
        done,
      };
    });

    const maxTotal = Math.max(...last14.map((day) => day.total), 0);
    const maxDone = Math.max(...last14.map((day) => day.done), 0);
    const current7Done = last14.slice(7).reduce((sum, day) => sum + day.done, 0);
    const previous7Done = last14.slice(0, 7).reduce((sum, day) => sum + day.done, 0);
    const momentum =
      previous7Done === 0
        ? current7Done > 0
          ? 100
          : 0
        : Math.round(((current7Done - previous7Done) / previous7Done) * 100);

    return {
      days: last14.map((day) => ({
        ...day,
        totalHeight: maxTotal === 0 ? 0 : Math.round((day.total / maxTotal) * 100),
        doneHeight: maxDone === 0 ? 0 : Math.round((day.done / maxDone) * 100),
      })),
      momentum,
      current7Done,
      previous7Done,
    };
  }, [tasks, today]);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="h2">
            Statistics & Summary
          </Typography>
          <Chip label={`${stats.completionRate}% complete`} color="primary" />
        </Stack>

        <Grid container spacing={1.5} sx={{ mt: 1 }}>
          {[
            { label: "Total Tasks", value: stats.total },
            { label: "Completed", value: stats.completed },
            { label: "Pending", value: stats.pending },
            { label: "Overdue", value: stats.overdue },
            { label: "Avg / Day (7d)", value: stats.avgPerDay7 },
            { label: "Active Categories", value: stats.activeCategories },
          ].map((item) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={item.label}>
              <Paper sx={{ p: 1.5 }}>
                <Typography variant="caption" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography variant="h6">{item.value}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2">Completion Balance</Typography>
            <Typography variant="caption" color="text.secondary">
              {stats.completed} done / {stats.pending} pending
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.6} sx={{ mt: 0.8 }}>
            <Box
              sx={{
                height: 10,
                borderRadius: 1,
                bgcolor: "success.main",
                width: `${stats.total === 0 ? 0 : (stats.completed / stats.total) * 100}%`,
                minWidth: stats.completed > 0 ? 12 : 0,
              }}
            />
            <Box
              sx={{
                height: 10,
                borderRadius: 1,
                bgcolor: "warning.main",
                width: `${stats.total === 0 ? 0 : (stats.pending / stats.total) * 100}%`,
                minWidth: stats.pending > 0 ? 12 : 0,
              }}
            />
          </Stack>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Task Categories
          </Typography>
          {categoryChart.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Add tasks to see category distribution.
            </Typography>
          ) : (
            <Stack spacing={1}>
              {categoryChart.map((row) => (
                <Box key={row.label}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">{row.label}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {row.value}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={row.percent}
                    sx={{ height: 8, borderRadius: 1, mt: 0.35 }}
                  />
                </Box>
              ))}
            </Stack>
          )}
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Category Completion Quality
          </Typography>
          {categoryQualityChart.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Add tasks to see category quality.
            </Typography>
          ) : (
            <Stack spacing={1}>
              {categoryQualityChart.map((row) => (
                <Box key={row.label}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">{row.label}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {row.done}/{row.total} ({row.completion}%)
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={row.completion}
                    sx={{ height: 7, borderRadius: 1, mt: 0.35 }}
                  />
                </Box>
              ))}
            </Stack>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Last 7 Days Completion
          </Typography>
          <Grid container spacing={1} columns={{ xs: 7 }}>
            {weeklyChart.map((day) => (
              <Grid size={{ xs: 1 }} key={day.label}>
                <Paper sx={{ p: 1, textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary">
                    {day.label}
                  </Typography>
                  <Box
                    sx={{
                      height: 52,
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                      mt: 0.6,
                    }}
                  >
                    <Box
                      sx={{
                        width: "65%",
                        height: `${Math.max(day.rate, 6)}%`,
                        bgcolor: day.rate > 0 ? "primary.main" : "action.disabled",
                        borderRadius: 0.8,
                      }}
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {day.done}/{day.total}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2">14-Day Productivity Trend</Typography>
            <Chip
              size="small"
              color={productivity14.momentum >= 0 ? "success" : "warning"}
              label={`${productivity14.momentum >= 0 ? "+" : ""}${productivity14.momentum}% momentum`}
            />
          </Stack>
          <Typography variant="caption" color="text.secondary">
            Done tasks: {productivity14.current7Done} (last 7d) vs{" "}
            {productivity14.previous7Done} (previous 7d)
          </Typography>
          <Grid container spacing={0.7} columns={{ xs: 14 }} sx={{ mt: 0.6 }}>
            {productivity14.days.map((day, index) => (
              <Grid size={{ xs: 1 }} key={`${day.label}-${index}`}>
                <Paper sx={{ p: 0.6, textAlign: "center" }}>
                  <Box
                    sx={{
                      height: 56,
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                      gap: 0.3,
                    }}
                  >
                    <Box
                      sx={{
                        width: "40%",
                        height: `${Math.max(day.totalHeight, day.total > 0 ? 8 : 0)}%`,
                        bgcolor: "info.main",
                        borderRadius: 0.8,
                        opacity: 0.5,
                      }}
                    />
                    <Box
                      sx={{
                        width: "40%",
                        height: `${Math.max(day.doneHeight, day.done > 0 ? 8 : 0)}%`,
                        bgcolor: "success.main",
                        borderRadius: 0.8,
                      }}
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {day.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskStatisticsSummaryModule;
