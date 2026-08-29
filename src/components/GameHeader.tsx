import { Cancel, CheckCircle } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useReward } from "react-rewards";
import type { useStopwatchResultType } from "react-timer-hook/dist/types/src/useStopwatch";
import { DKTimer } from "../inputs";

export const GameHeader = ({
  timer,
  stopwatch,
  total,
  completed,
  failures,
  autoRefresh,
  recycle
}: {
  timer: boolean;
  stopwatch: useStopwatchResultType;
  total: number;
  completed: number;
  failures?: number;
  autoRefresh?: boolean;
  recycle?: boolean;
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
    ? { animation: "rightCounter 2s infinite" }
    : { color: "white" };

  const wrongAnimate = !stopwatch.isRunning
    ? { animation: "wrongCounter 2s infinite" }
    : { color: "white" };

  const midColSize = () => {
    if (failures !== undefined) {
      return timer ? 2 : 3;
    } else {
      return timer ? 4 : 6;
    }
  };

  useEffect(() => {
    if (
      completed !== 0 &&
      (completed === total ||
        (failures && !recycle && completed + failures === total))
    ) {
      stopwatch.pause();
      setHeader("GG!");
      rewardLeft();
      rewardRight();
    } else {
      if (autoRefresh) {
        if (failures && !recycle) {
          setHeader(`${total - completed - failures} left`);
        } else {
          setHeader(`${total - completed} left`);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed, total, failures]);

  return (
    <>
      <Grid size={timer ? 4 : 6}>
        <Typography color="textPrimary" variant="h1">
          {header}
        </Typography>
        <div id="rewardLeft" />
      </Grid>
      <Grid size={midColSize()}>
        <Typography color="textPrimary" variant="h1" sx={rightAnimate}>
          <IconButton sx={rightAnimate}>
            <CheckCircle />
          </IconButton>
          {completed}
        </Typography>
      </Grid>
      {failures !== undefined && (
        <Grid size={midColSize()}>
          <Typography color="textPrimary" variant="h1" sx={wrongAnimate}>
            <IconButton sx={wrongAnimate}>
              <Cancel />
            </IconButton>
            {failures}
          </Typography>
        </Grid>
      )}
      <Grid size={4}>
        {timer && <DKTimer stopwatch={stopwatch} />}
        <div id="rewardRight" style={{ float: "right" }} />
      </Grid>
    </>
  );
};
