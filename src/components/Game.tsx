import { Grid } from "@mui/material";
import random from "random";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useStopwatch } from "react-timer-hook";
import type { Socket } from "socket.io-client";
import type { DK64Item, DKBBanana, GameOptions } from "../classes";
import { DK64Category } from "../enums";
import { DKButton, DKHR, DKItemRow } from "../inputs";
import type { ItemWithPlayerId, LastCollected } from "../utils/types";
import { GameHeader } from "./GameHeader";

export const Game = ({
  options,
  setOptions,
  setStart,
  socket,
  playerName,
  roomName,
  players
}: {
  options: GameOptions;
  setOptions: Dispatch<SetStateAction<GameOptions | null>>;
  setStart: Dispatch<SetStateAction<boolean>>;
  socket: Socket;
  playerName: string;
  roomName: string;
  players: string[];
}) => {
  const [available, setAvailable] = useState<(DK64Item | DKBBanana)[]>([]);
  const [displayed, setDisplayed] = useState<(DK64Item | DKBBanana)[]>([]);
  const [completed, setCompleted] = useState<ItemWithPlayerId[]>([]);
  const [lastCollected, setLastCollected] = useState<LastCollected | null>(
    null
  );

  const stopwatch = useStopwatch({ autoStart: true, interval: 20 });

  const total = (Object.values(DK64Category) as string[]).includes(
    options.collectables[0].category
  )
    ? options.dk64Total
    : options.dkbTotal;

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
    playerId: string,
    emit: boolean
  ) => {
    const done = [...completed];
    done.push({
      ...item,
      playerId
    });
    setCompleted(done);
    replaceItem(index);

    if (emit) {
      socket.emit("collected_client", item, index, playerId, roomName);
    }
  };

  const updateLastItem = (
    item: DK64Item | DKBBanana,
    index: number,
    playerId: string
  ) => {
    setLastCollected({
      item,
      index,
      playerId
    });
  };

  const reset = () => {
    setOptions(null);
    setLastCollected(null);
    setStart(false);
  };

  const pauseAll = () => {
    stopwatch.pause();
    socket.emit("pause_client", roomName);
  };

  const resumeAll = () => {
    stopwatch.start();
    socket.emit("resume_client", roomName);
  };

  useEffect(() => {
    if (lastCollected && playerName && lastCollected.playerId !== playerName) {
      onComplete(
        lastCollected.item,
        lastCollected.index,
        lastCollected.playerId,
        false
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastCollected]);

  useEffect(() => {
    if (options.seed) {
      random.use(options.seed);
    }

    const notCompleted = [];
    const initial = [...options.collectables];
    const total = (Object.values(DK64Category) as string[]).includes(
      initial[0].category
    )
      ? options.dk64Total
      : options.dkbTotal;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("collected_server", updateLastItem);
    socket.on("pause_server", stopwatch.pause);
    socket.on("resume_server", stopwatch.start);
    socket.on("reset_server", reset);

    return () => {
      socket.off("collected_server");
      socket.off("pause_server");
      socket.off("resume_server");
      socket.off("reset_server");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={1}>
      <GameHeader
        timer={options.timer}
        stopwatch={stopwatch}
        total={total}
        completed={completed}
        players={players}
      />

      <DKHR />

      {displayed.length > 0 &&
        displayed.map((item: DK64Item | DKBBanana, index: number) => (
          <DKItemRow
            key={index}
            name={item.name}
            disabled={completed.findIndex((c) => c.name === item.name) !== -1}
            onComplete={() => onComplete(item, index, playerName, true)}
          />
        ))}

      <DKHR />

      {options.timer && completed.length < total && (
        <DKButton
          label={stopwatch.isRunning ? "Pause" : "Resume"}
          handleClick={() => (stopwatch.isRunning ? pauseAll() : resumeAll())}
        />
      )}

      {completed.length === total && (
        <DKButton
          label="Restart"
          handleClick={() => {
            socket.emit("reset_client", roomName);
            reset();
          }}
        />
      )}
    </Grid>
  );
};
