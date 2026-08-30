import { CheckCircle } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useReward } from "react-rewards";
import type { useStopwatchResultType } from "react-timer-hook/dist/types/src/useStopwatch";
import { DKTimer } from "../inputs";

export const GameHeader = ({
  timer,
  stopwatch,
  total,
  completed
}: {
  timer: boolean;
  stopwatch: useStopwatchResultType;
  total: number;
  completed: number;
}) => {
  const [header, setHeader] = useState("Go get 'em!");

  const rewardSettings = {
    lifetime: 5000,
    spread: 180,
    elementCount: 50,
    zIndex: 9999,
    emoji: ["🍌"]
  };

  const { reward: rewardLeft } = useReward(
    "rewardLeft",
    "emoji",
    rewardSettings
  );

  const { reward: rewardRight } = useReward(
    "rewardRight",
    "emoji",
    rewardSettings
  );

  const rightAnimate = !stopwatch.isRunning
    ? { animation: "completeCounter 2s infinite" }
    : { color: "white" };

  useEffect(() => {
    if (completed !== 0 && completed === total) {
      stopwatch.pause();
      setHeader("GG!");
      rewardLeft();
      rewardRight();
    } else {
      setHeader(`${total - completed} left`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed, total]);

  return (
    <>
      <Grid size={timer ? 4 : 6}>
        <Typography color="textPrimary" variant="h1">
          {header}
        </Typography>
        <div id="rewardLeft" />
      </Grid>
      <Grid size={timer ? 4 : 6}>
        <Typography color="textPrimary" variant="h1" sx={rightAnimate}>
          <IconButton sx={rightAnimate}>
            <CheckCircle />
          </IconButton>
          {completed}
        </Typography>
      </Grid>
      <Grid size={4}>
        {timer && <DKTimer stopwatch={stopwatch} />}
        <div id="rewardRight" style={{ float: "right" }} />
      </Grid>
    </>
  );
};
