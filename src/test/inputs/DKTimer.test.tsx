import { useStopwatch } from "react-timer-hook";
import { describe, expect, test } from "vitest";
import { render, renderHook } from "vitest-browser-react";
import { DKTimer } from "../../inputs";

describe("DKTimer tests", async () => {
  const stopwatch = await renderHook(() => useStopwatch());

  const getScreen = () => {
    return render(<DKTimer stopwatch={stopwatch.result.current} />);
  };

  test("Check initial render", async () => {
    await getScreen();
    expect(stopwatch.result.current.isRunning).toBe(true);
  });

  test("Check pause style", async () => {
    stopwatch.result.current.isRunning = false;
    const timer = (await getScreen()).getByText("0:00:00");
    expect(stopwatch.result.current.isRunning).toBe(false);
    expect(timer).toHaveStyle({ animation: "pauseTimer 2s infinite" });
  });
});
