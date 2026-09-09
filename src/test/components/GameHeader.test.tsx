import { useStopwatch } from "react-timer-hook";
import type { useStopwatchResultType } from "react-timer-hook/dist/types/src/useStopwatch";
import { describe, expect, test } from "vitest";
import { render, renderHook } from "vitest-browser-react";
import { GameHeader } from "../../components";
import { DK64Category } from "../../enums";
import { ItemWithPlayerId } from "../../utils/types";

describe("GameHeader tests", async () => {
  const getStopwatch = async (isRunning: boolean) =>
    await renderHook(() => useStopwatch({ autoStart: isRunning }));

  const getScreen = (
    timer: boolean,
    stopwatch: useStopwatchResultType,
    total: number,
    completed: ItemWithPlayerId[]
  ) => {
    return render(
      <GameHeader
        timer={timer}
        stopwatch={stopwatch}
        total={total}
        completed={completed}
        players={["Geoff"]}
      />
    );
  };

  test("Check initial render with completion", async () => {
    const watch = (await getStopwatch(false)).result.current;
    const screen = await getScreen(false, watch, 1, [
      {
        name: "Test",
        category: DK64Category.Blueprint,
        playerId: "Geoff"
      }
    ]);
    expect(screen.getByText("GG!")).toBeInTheDocument();
  });

  test("Check in progress game", async () => {
    const watch = (await getStopwatch(false)).result.current;
    const screen = await getScreen(false, watch, 3, []);
    expect(screen.getByText("3 left")).toBeInTheDocument();
  });
});
