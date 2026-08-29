import { Box, Grid } from "@mui/material";
import random from "random";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useStopwatch } from "react-timer-hook";
import { DKBBanana, type GameOptions } from "../classes";
import { DKButton, DKDialog, DKHR, DKItemRow } from "../inputs";
import { GameHeader } from "./GameHeader";

export const DKBGame = ({
  options,
  setOptions,
  setStart
}: {
  options: GameOptions;
  setOptions: Dispatch<SetStateAction<GameOptions | null>>;
  setStart: Dispatch<SetStateAction<boolean>>;
}) => {
  const [reconfigOpen, setReconfigOpen] = useState(false);
  const [available, setAvailable] = useState<DKBBanana[]>([]);
  const [displayed, setDisplayed] = useState<DKBBanana[]>([]);
  const [completed, setCompleted] = useState<DKBBanana[]>([]);
  const [rightCount, setRightCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [total] = useState(
    options.autoRefresh ? options.dkbTotal : options.count
  );

  const stopwatch = useStopwatch({ autoStart: true, interval: 20 });

  const replaceBanana = (displayIndex: number, success: boolean) => {
    const notCompleted = [...available];
    const onDeck = [...displayed];

    const prevUp = onDeck[displayIndex];
    const nextUp = notCompleted.shift();

    if (prevUp && nextUp) {
      onDeck.splice(displayIndex, 1, nextUp);

      if (options.recycle && !success) {
        notCompleted.splice(random.int(0, notCompleted.length), 0, prevUp);
      }
    }

    setAvailable(notCompleted);
    setDisplayed(onDeck);
  };

  const onComplete = (banana: DKBBanana, index: number, success: boolean) => {
    if (!options.recycle || (options.recycle && success)) {
      const done = [...completed];
      done.push(banana);
      setCompleted(done);
    }

    if (success) {
      setRightCount(rightCount + 1);
    } else {
      setWrongCount(wrongCount + 1);
    }

    if (options.autoRefresh) {
      replaceBanana(index, success);
    }
  };

  const reset = () => {
    setOptions(null);
    setStart(false);
  };

  useEffect(() => {
    if (options.seed) {
      random.use(options.seed);
    }

    const notCompleted = [];
    const initial = [...options.bananas];
    for (let i = 0; i < total; i++) {
      const banana = random.choice(initial);

      if (banana) {
        initial.splice(initial.indexOf(banana), 1);
        notCompleted.push(banana);
      }
    }

    const onDeck = [];
    for (let i = 0; i < options.count; i++) {
      const banana = notCompleted.shift();
      if (banana) {
        onDeck.push(banana);
      }
    }

    setAvailable(notCompleted);
    setDisplayed(onDeck);
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
        completed={rightCount}
        autoRefresh={options.autoRefresh}
        failures={wrongCount}
        recycle={options.recycle}
      />

      <DKHR />

      <Box
        sx={{
          width: "100%",
          margin: "0 auto",
          maxHeight: "50vh",
          overflowY: "scroll"
        }}
      >
        {displayed.length > 0 &&
          displayed.map((banana: DKBBanana, index: number) => (
            <DKItemRow
              key={index}
              name={banana.name}
              bgColor="#072207"
              disabled={completed.indexOf(banana) !== -1}
              onSuccess={() => onComplete(banana, index, true)}
              onFailure={() => onComplete(banana, index, false)}
            />
          ))}
      </Box>

      <DKHR />

      {options.timer &&
        ((!options.recycle && rightCount + wrongCount < total) ||
          (options.recycle && rightCount < total)) && (
          <DKButton
            label={stopwatch.isRunning ? "Pause" : "Resume"}
            handleClick={() =>
              stopwatch.isRunning ? stopwatch.pause() : stopwatch.start()
            }
          />
        )}

      <DKButton
        label="Reconfigure"
        handleClick={() => {
          if (
            (!options.recycle && rightCount + wrongCount < total) ||
            (options.recycle && rightCount < total)
          ) {
            stopwatch.pause();
            setReconfigOpen(true);
          } else {
            reset();
          }
        }}
      />
    </Grid>
  );
};
