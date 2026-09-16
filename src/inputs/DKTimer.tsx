import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useStopwatch } from "react-timer-hook";

export const DKTimer = ({ shouldBePaused }: { shouldBePaused: boolean }) => {
  const { seconds, minutes, hours, pause, start } = useStopwatch({
    interval: 20
  });

  useEffect(() => {
    if (shouldBePaused) {
      pause();
    } else {
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldBePaused]);

  return (
    <Typography
      color="textPrimary"
      variant="h1"
      sx={shouldBePaused ? { animation: "pauseTimer 2s infinite" } : {}}
    >
      {hours}:{String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </Typography>
  );
};
