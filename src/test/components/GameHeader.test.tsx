import { useStopwatch } from "react-timer-hook";
import type { useStopwatchResultType } from "react-timer-hook/dist/types/src/useStopwatch";
import { describe, expect, test } from "vitest";
import { render, renderHook } from "vitest-browser-react";
import { GameHeader } from "../../components";

describe("GameHeader tests", async () => {
  const getStopwatch = async (isRunning: boolean) =>
    await renderHook(() => useStopwatch({ autoStart: isRunning }));

  const getScreen = (
    timer: boolean,
    stopwatch: useStopwatchResultType,
    total: number,
    completed: number
  ) => {
    return render(
      <GameHeader
        timer={timer}
        stopwatch={stopwatch}
        total={total}
        completed={completed}
      />
    );
  };

  test("Check initial render with completion", async () => {
    const watch = (await getStopwatch(false)).result.current;
    const screen = await getScreen(false, watch, 1, 1);
    expect(screen.getByText("GG!")).toBeInTheDocument();
  });

  test("Check in progress game", async () => {
    const watch = (await getStopwatch(false)).result.current;
    const screen = await getScreen(false, watch, 3, 0);
    expect(screen.getByText("3 left")).toBeInTheDocument();
  });
});
