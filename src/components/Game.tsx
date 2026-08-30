import { Grid } from "@mui/material";
import random from "random";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useStopwatch } from "react-timer-hook";
import type { Socket } from "socket.io-client";
import type { DK64Item, DKBBanana, GameOptions } from "../classes";
import { DK64Category } from "../enums";
import { DKButton, DKDialog, DKHR, DKItemRow } from "../inputs";
import type { LastCollected } from "../utils/types";
import { GameHeader } from "./GameHeader";

export const Game = ({
  options,
  setOptions,
  setStart,
  socket,
  lastCollected,
  playerName,
  roomName
}: {
  options: GameOptions;
  setOptions: Dispatch<SetStateAction<GameOptions | null>>;
  setStart: Dispatch<SetStateAction<boolean>>;
  socket: Socket;
  lastCollected: LastCollected | null;
  playerName: string;
  roomName: string;
}) => {
  const [reconfigOpen, setReconfigOpen] = useState(false);
  const [available, setAvailable] = useState<(DK64Item | DKBBanana)[]>([]);
  const [displayed, setDisplayed] = useState<(DK64Item | DKBBanana)[]>([]);
  const [completed, setCompleted] = useState<(DK64Item | DKBBanana)[]>([]);

  const stopwatch = useStopwatch({ interval: 20 });

  const replaceItem = (displayIndex: number) => {
    const notCompleted = [...available];
    const onDeck = [...displayed];
    const nextUp = notCompleted.shift();

    if (nextUp) {
      onDeck.splice(displayIndex, 1, nextUp);

      setAvailable(notCompleted);
      setDisplayed(onDeck);
    }
  };

  const onComplete = (
    item: DK64Item | DKBBanana,
    index: number,
    emit: boolean
  ) => {
    const done = [...completed];
    done.push(item);
    setCompleted(done);
    replaceItem(index);

    if (emit) {
      socket.emit("collected_client", item, index, playerName, roomName);
    }
  };

  const reset = () => {
    setOptions(null);
    setStart(false);
  };

  const pause = (emit: boolean) => {
    stopwatch.pause();
    if (emit) {
      socket.emit("pause_client", roomName);
    }
  };

  const resume = (emit: boolean) => {
    stopwatch.start();
    if (emit) {
      socket.emit("resume_client", roomName);
    }
  };

  useEffect(() => {
    if (lastCollected && playerName && lastCollected.playerId !== playerName) {
      onComplete(lastCollected.item, lastCollected.index, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastCollected]);

  useEffect(() => {
    if (options.seed) {
      random.use(options.seed);
    }

    const notCompleted = [];
    const initial = [...options.collectables];
    for (let i = 0; i < options.total; i++) {
      const item = random.choice(initial);

      if (item) {
        initial.splice(initial.indexOf(item), 1);

        if (item.category === DK64Category.ColoredBanana) {
          const itemCopy = { ...item };
          itemCopy.name = item.name.replace(
            "{{X}}",
            String(random.int(20, 100))
          );
          notCompleted.push(itemCopy);
        } else {
          notCompleted.push(item);
        }
      }
    }

    const onDeck = [];
    for (let i = 0; i < options.count; i++) {
      const item = notCompleted.shift();
      if (item) {
        onDeck.push(item);
      }
    }

    setAvailable(notCompleted);
    setDisplayed(onDeck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("pause_server", () => pause(false));
    socket.on("resume_server", () => resume(false));
    socket.on("reconfig_server", reset);

    return () => {
      socket.off("pause_server", () => pause(false));
      socket.off("resume_server", () => resume(false));
      socket.off("reconfig_server", reset);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={1}>
      <DKDialog
        title="Are you sure?"
        description="You'll lose your current progress!"
        open={reconfigOpen}
        setOpen={setReconfigOpen}
        yesLabel="Yeah"
        noLabel="Nah"
        handleYesAction={reset}
        handleNoAction={() => stopwatch.start()}
      />

      <GameHeader
        timer={options.timer}
        stopwatch={stopwatch}
        total={options.total}
        completed={completed.length}
      />

      <DKHR />

      {displayed.length > 0 &&
        displayed.map((item: DK64Item | DKBBanana, index: number) => {
          return (
            <DKItemRow
              key={index}
              name={item.name}
              disabled={completed.indexOf(item) !== -1}
              onComplete={() => onComplete(item, index, true)}
            />
          );
        })}

      <DKHR />

      {options.timer && completed.length < options.total && (
        <DKButton
          label={stopwatch.isRunning ? "Pause" : "Resume"}
          handleClick={() => (stopwatch.isRunning ? pause(true) : resume(true))}
        />
      )}

      <DKButton
        label="Reconfigure"
        handleClick={() => {
          reset();
          socket.emit("reconfig_client", roomName);
        }}
      />
    </Grid>
  );
};
