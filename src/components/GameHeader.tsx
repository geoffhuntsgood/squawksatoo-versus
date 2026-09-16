import { Grid, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useReward } from "react-rewards";
import { DKTimer } from "../inputs";
import { ItemWithPlayerId } from "../utils/types";

export const GameHeader = ({
  timer,
  total,
  completed,
  players,
  shouldBePaused,
  setShouldBePaused
}: {
  timer: boolean;
  total: number;
  completed: ItemWithPlayerId[];
  players: string[];
  shouldBePaused: boolean;
  setShouldBePaused: Dispatch<SetStateAction<boolean>>;
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

  useEffect(() => {
    if (completed.length !== 0 && completed.length === total) {
      setShouldBePaused(true);
      setHeader("GG!");
      rewardLeft();
      rewardRight();
    } else {
      const display = total - completed.length;
      setHeader(`${display < 0 ? 0 : display} left`);
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
        {players.map((player: string) => (
          <Typography
            color="textPrimary"
            variant="h3"
            sx={
              shouldBePaused
                ? { animation: "completeCounter 2s infinite" }
                : { color: "white" }
            }
          >
            {player}: {completed.filter((c) => c.playerId === player).length}
          </Typography>
        ))}
      </Grid>
      <Grid size={4}>
        {timer && <DKTimer shouldBePaused={shouldBePaused} />}
        <div id="rewardRight" style={{ float: "right" }} />
      </Grid>
    </>
  );
};
