import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import type { DK64Item, DKBBanana } from "../../classes";
import { Game } from "../../components";
import { DK64Category } from "../../enums";
import { factory } from "../../levels/factory";
import { japes } from "../../levels/japes";
import { socket } from "../../utils/socket";

describe("Game tests", () => {
  const setOptionsMock = vi.fn();
  const setStartMock = vi.fn();
  const setLastCollectedMock = vi.fn();

  const getScreen = (
    count: number,
    total: number,
    seed: string,
    timer: boolean,
    collectables: (DK64Item | DKBBanana)[]
  ) => {
    return render(
      <Game
        options={{
          count,
          dkbTotal: total,
          dk64Total: total,
          seed,
          timer,
          collectables
        }}
        setOptions={setOptionsMock}
        setStart={setStartMock}
        socket={socket}
        lastCollected={null}
        setLastCollected={setLastCollectedMock}
        playerName="Test Player"
        roomName="TestRoom"
      />
    );
  };

  test("Check game with seed and no autoRefresh", async () => {
    const screen = await getScreen(5, 10, "Seed", true, japes.items);
    expect(screen.getByText("Go get 'em!")).toBeVisible();
    expect(screen.getByText("Japes Tunnel Fairy")).toBeVisible();

    await screen.getByText("Japes Tunnel Fairy").click();
    await screen.getByText("Japes Diddy Mountaintop GB").click();
    await screen.getByText("Japes Diddy Medal").click();
    await screen.getByText("Japes Diddy BP").click();
    await screen.getByText("Japes Lanky Medal").click();

    expect(screen.getByText("GG!")).toBeVisible();
    expect(screen.getByText("5")).toBeVisible();
  });

  test("Check game with seed and autoRefresh (with reset)", async () => {
    const screen = await getScreen(1, 10, "Seed", false, japes.items);
    expect(screen.getByText("10 left")).toBeVisible();
    expect(screen.getByText("Japes Tunnel Fairy")).toBeVisible();

    await screen.getByText("Japes Tunnel Fairy").click();

    expect(screen.getByText("Japes Tunnel Fairy")).not.toBeInTheDocument();
    expect(screen.getByText("Japes Mountaintop GB")).toBeVisible();

    await screen.getByText("RECONFIGURE").click();
    await screen.getByText("NAH").click();
    await screen.getByText("RECONFIGURE").click();
    await screen.getByText("YEAH").click();

    expect(setOptionsMock).toHaveBeenCalledWith(null);
    expect(setStartMock).toHaveBeenCalledWith(false);
  });

  test("Pause/resume and reset completed game", async () => {
    vi.resetAllMocks();
    const screen = await getScreen(
      1,
      5,
      "Seed",
      true,
      factory.items.filter((item) => item.category === DK64Category.CompanyCoin)
    );

    await screen.getByText("PAUSE").click();
    expect(screen.getByText("0").first()).toHaveStyle(
      "animation: completeCounter 2s infinite"
    );
    await screen.getByText("RESUME").click();

    await screen.getByText("Nintendo Coin").click();
    await screen.getByText("RECONFIGURE").click();

    expect(screen.getByText("YEAH")).not.toBeInTheDocument();
    expect(setOptionsMock).toHaveBeenCalledWith(null);
    expect(setStartMock).toHaveBeenCalledWith(false);
  });
});
