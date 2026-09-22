import { useStopwatch } from "react-timer-hook";
import { render, renderHook } from "vitest-browser-react";
import { DKTimer } from "../../inputs";

describe("DKTimer tests", async () => {
  const stopwatch = await renderHook(() => useStopwatch());

  const getScreen = (shouldBePaused: boolean) => {
    return render(<DKTimer shouldBePaused={shouldBePaused} />);
  };

  test("Check initial render", async () => {
    await getScreen(false);
    expect(stopwatch.result.current.isRunning).toBe(true);
  });

  test("Check pause style", async () => {
    stopwatch.result.current.isRunning = false;
    const timer = (await getScreen(true)).getByText("0:00:00");
    expect(stopwatch.result.current.isRunning).toBe(false);
    expect(timer).toHaveStyle({ animation: "pauseTimer 2s infinite" });
  });
});
