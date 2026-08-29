import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import type { DKBBanana } from "../../classes";
import { DKBGame } from "../../components";
import { groove } from "../../layers/groove";

describe("DKBGame tests", () => {
  const setOptionsMock = vi.fn();
  const setStartMock = vi.fn();

  const getScreen = (
    count: number,
    dkbTotal: number,
    seed: string | null,
    timer: boolean,
    autoRefresh: boolean,
    recycle: boolean,
    bananas: DKBBanana[]
  ) => {
    return render(
      <DKBGame
        options={{
          count,
          dk64Total: 0,
          dkbTotal,
          seed: seed || "",
          timer,
          autoRefresh,
          recycle,
          useKongColors: false,
          bananas,
          items: []
        }}
        setOptions={setOptionsMock}
        setStart={setStartMock}
      />
    );
  };

  test("Check game with seed and no autoRefresh", async () => {
    const screen = await getScreen(
      5,
      10,
      "Seed",
      true,
      false,
      false,
      groove.bananas
    );
    expect(screen.getByText("Go get 'em!")).toBeVisible();
    expect(screen.getByText("A Gift from a Fan")).toBeVisible();

    await screen.getByText("Rising Bass Line").click();
    await screen.getByText("Smash and Receive").click();
    await screen.getByText("Beat the Concrete").click();
    await screen.getByText("Disco-Ball Destruction").click();
    await screen.getByRole("button").all()[3].click();

    expect(screen.getByText("GG!")).toBeVisible();
    expect(screen.getByText("4")).toBeVisible();
    expect(screen.getByText("1").first()).toBeVisible();
  });

  test("Check game with seed and autoRefresh (with reset)", async () => {
    const screen = await getScreen(
      1,
      10,
      "Seed",
      false,
      true,
      false,
      groove.bananas
    );
    expect(screen.getByText("10 left")).toBeVisible();
    expect(screen.getByText("A Gift from a Fan")).toBeVisible();

    await screen.getByText("A Gift from a Fan").click();
    expect(screen.getByText("A Gift from a Fan")).not.toBeInTheDocument();
    expect(screen.getByText("Smash and Receive")).toBeVisible();

    await screen.getByText("RECONFIGURE").click();
    await screen.getByText("NAH").click();
    await screen.getByText("RECONFIGURE").click();
    await screen.getByText("YEAH").click();

    expect(setOptionsMock).toHaveBeenCalledWith(null);
    expect(setStartMock).toHaveBeenCalledWith(false);
  });

  test("Check game with seed and autoRefresh/recycle", async () => {
    const screen = await getScreen(
      1,
      10,
      "Seed",
      false,
      true,
      true,
      groove.bananas
    );
    expect(screen.getByText("10 left")).toBeVisible();
    expect(screen.getByText("A Gift from a Fan")).toBeVisible();

    await screen.getByRole("button").all()[3].click();
    expect(screen.getByText("A Gift from a Fan")).not.toBeInTheDocument();
    expect(screen.getByText("Smash and Receive")).toBeVisible();
    expect(screen.getByText("10 left")).toBeVisible();
  });

  test("Check game completion with no recycle and failure", async () => {
    const screen = await getScreen(
      2,
      10,
      "Seed",
      false,
      false,
      false,
      groove.bananas
    );
    expect(screen.getByText("A Gift from a Fan")).toBeVisible();
    await screen.getByRole("button").all()[3].click();
    await screen.getByText("Smash and Receive").click();
    expect(screen.getByText("GG!")).toBeInTheDocument();
  });

  test("Pause/resume and reset completed game", async () => {
    vi.resetAllMocks();
    const screen = await getScreen(
      1,
      5,
      null,
      true,
      false,
      false,
      groove.bananas.filter((banana) => banana.hellMode === true)
    );

    await screen.getByText("PAUSE").click();
    expect(screen.getByText("0").first()).toHaveStyle(
      "animation: rightCounter 2s infinite"
    );
    await screen.getByText("RESUME").click();

    await screen.getByText("A Complete Fossil Collection").click();
    await screen.getByText("RECONFIGURE").click();

    expect(screen.getByText("YEAH")).not.toBeInTheDocument();
    expect(setOptionsMock).toHaveBeenCalledWith(null);
    expect(setStartMock).toHaveBeenCalledWith(false);
  });
});
