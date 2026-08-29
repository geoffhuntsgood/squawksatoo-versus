import { Grid } from "@mui/material";
import random from "random";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useStopwatch } from "react-timer-hook";
import type { Socket } from "socket.io-client";
import type { DK64Item, GameOptions } from "../classes";
import { DK64Category } from "../enums";
import { DKButton, DKDialog, DKHR, DKItemRow } from "../inputs";
import { getKongColorInfo } from "../utils/levelApi";
import type { LastGot } from "../utils/types";
import { GameHeader } from "./GameHeader";

export const DK64Game = ({
  options,
  setOptions,
  setStart,
  isConnected,
  socket,
  lastGot,
  playerName,
  roomName
}: {
  options: GameOptions;
  setOptions: Dispatch<SetStateAction<GameOptions | null>>;
  setStart: Dispatch<SetStateAction<boolean>>;
  isConnected: boolean;
  socket: Socket;
  lastGot: LastGot | null;
  playerName: string;
  roomName: string;
}) => {
  const [reconfigOpen, setReconfigOpen] = useState(false);
  const [available, setAvailable] = useState<DK64Item[]>([]);
  const [displayed, setDisplayed] = useState<DK64Item[]>([]);
  const [completed, setCompleted] = useState<DK64Item[]>([]);
  const [total] = useState(
    options.autoRefresh ? options.dk64Total : options.count
  );

  const stopwatch = useStopwatch({ autoStart: true, interval: 20 });

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

  const onComplete = (item: DK64Item, index: number, emit: boolean) => {
    const done = [...completed];
    done.push(item);
    setCompleted(done);

    if (options.autoRefresh) {
      replaceItem(index);
    }

    if (isConnected && emit) {
      socket.emit("item_get", item, index, playerName, roomName);
    }
  };

  const reset = () => {
    setOptions(null);
    setStart(false);
  };

  const pauseResume = (emit: boolean) => {
    if (stopwatch.isRunning) {
      stopwatch.pause();
    } else {
      stopwatch.start();
    }

    if (emit) {
      socket.emit("pause", roomName);
    }
  };

  useEffect(() => {
    if (lastGot && playerName && lastGot.playerId !== playerName) {
      onComplete(lastGot.item as DK64Item, lastGot.index, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastGot]);

  useEffect(() => {
    const emittedPauseResume = () => {
      pauseResume(false);
    };

    socket.on("paused", emittedPauseResume);
    socket.on("reconfigure", reset);

    if (options.seed) {
      random.use(options.seed);
    }

    const notCompleted = [];
    const initial = [...options.items];
    for (let i = 0; i < total; i++) {
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

    return () => {
      socket.off("paused", emittedPauseResume);
      socket.off("reconfigure", reset);
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
        total={total}
        completed={completed.length}
        autoRefresh={options.autoRefresh}
      />

      <DKHR />

      {displayed.length > 0 &&
        displayed.map((item: DK64Item, index: number) => {
          const kongInfo = getKongColorInfo(item.name, options.useKongColors);
          return (
            <DKItemRow
              key={index}
              name={kongInfo.label}
              bgColor={options.useKongColors ? kongInfo.color : "#072207"}
              disabled={completed.indexOf(item) !== -1}
              onSuccess={() => onComplete(item, index, true)}
            />
          );
        })}

      <DKHR />

      {options.timer && completed.length < total && (
        <DKButton
          label={stopwatch.isRunning ? "Pause" : "Resume"}
          handleClick={() => pauseResume(true)}
        />
      )}

      <DKButton
        label="Reconfigure"
        handleClick={() => {
          reset();
          socket.emit("reconfig", roomName);
        }}
      />
    </Grid>
  );
};
