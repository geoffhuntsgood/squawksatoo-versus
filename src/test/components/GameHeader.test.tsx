import { useStopwatch } from "react-timer-hook";
import { describe, expect, test } from "vitest";
import { render, renderHook } from "vitest-browser-react";
import { GameHeader } from "../../components";
import type { useStopwatchResultType } from "react-timer-hook/dist/types/src/useStopwatch";

describe("GameHeader tests", async () => {
  const getStopwatch = async (isRunning: boolean) => await renderHook(() => useStopwatch({ autoStart: isRunning }));

  const getScreen = (
    timer: boolean,
    stopwatch: useStopwatchResultType,
    total: number,
    completed: number,
    recycle: boolean,
    autoRefresh: boolean,
    failures?: number
  ) => {
    return render(
      <GameHeader
        timer={timer}
        stopwatch={stopwatch}
        total={total}
        completed={completed}
        failures={failures}
        autoRefresh={autoRefresh}
        recycle={recycle}
      />
    );
  };

  test("Check initial render", async () => {
    const watch = (await getStopwatch(false)).result.current;
    const screen = await getScreen(false, watch, 1, 1, false, false);
    expect(screen.getByText("GG!")).toBeInTheDocument();
  });

  test("Check failure inclusion", async () => {
    const watch = (await getStopwatch(false)).result.current;
    const screen = await getScreen(false, watch, 3, 0, false, true, 2);
    expect(screen.getByText("1 left")).toBeInTheDocument();
  });

  test("Check failure inclusion without recycling", async () => {
    const watch = (await getStopwatch(true)).result.current;
    const screen = await getScreen(false, watch, 4, 2, false, true, 2);
    expect(screen.getByText("GG!")).toBeInTheDocument();
  });

  test("Check failure exclusion", async () => {
    const watch = (await getStopwatch(true)).result.current;
    const screen = await getScreen(true, watch, 5, 2, true, true, 4);
    expect(screen.getByText("3 left")).toBeInTheDocument();
  });
});
