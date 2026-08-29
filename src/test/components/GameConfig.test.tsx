import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";
import { GameConfig } from "../../components";
import { DK64Category, DKBCategory, LayerName, LevelName } from "../../enums";
import type { GameType } from "../../utils/types";

describe("GameConfig tests", () => {
  const setOptionsMock = vi.fn();
  const setGoLabelMock = vi.fn();

  const getScreen = (currentGame: GameType) => {
    return render(
      <GameConfig
        currentGame={currentGame}
        setOptions={setOptionsMock}
        setGoLabel={setGoLabelMock}
      />
    );
  };

  describe("DKB", () => {
    test("Check initial DKB render", async () => {
      const screen = await getScreen("DKB");
      expect(screen.getByText("Layer").last()).toBeVisible();
      expect(screen.getByText("Level")).not.toBeInTheDocument();
    });

    test("Change DKB config options", async () => {
      const screen = await getScreen("DKB");
      const selects = screen.getByRole("combobox").all();
      await selects[2].click(); // Count
      await screen.getByText("5").click();
      await selects[3].click(); // Total
      await screen.getByText("20").click();
      await userEvent.type(screen.getByText("Seed").first(), "12345");
      await screen.getByText("Timer").click();
      await screen.getByText("Recycle wrong bananas").click();

      expect(setOptionsMock).toHaveBeenLastCalledWith(
        expect.objectContaining({
          count: 5,
          dkbTotal: 20,
          timer: false,
          autoRefresh: true,
          recycle: true,
          seed: "12345"
        })
      );
    });

    test("Change DKB options that recount items", async () => {
      vi.resetAllMocks();
      const screen = await getScreen("DKB");
      const selects = screen.getByRole("combobox").all();
      await selects[2].click(); // Count
      await screen.getByText("5").click();
      await screen.getByText("Include Postgame").click();
      await screen.getByText("Hell Mode").click();
      await screen.getByText("Auto-refresh").click();
      await selects[0].click(); // Layer
      await screen.getByText(LayerName.Groove).click();
      await selects[1].click(); // Category
      await screen.getByText(DKBCategory.Battle).click();

      expect(setOptionsMock).toHaveBeenLastCalledWith(
        expect.objectContaining({
          bananas: [
            {
              num: 26,
              name: "Battle: Opposite Obliteration",
              category: DKBCategory.Battle
            },
            {
              num: 27,
              name: "Battle: Cliff-Wall Ambush",
              category: DKBCategory.Battle
            }
          ]
        })
      );
    });

    test("Expanded count for All Layers", async () => {
      vi.resetAllMocks();
      const screen = await getScreen("DKB");
      const selects = screen.getByRole("combobox").all();
      await selects[0].click();
      await screen.getByText(LayerName.All).click();
      await selects[2].click();
      await screen.getByText("15").click();

      expect(setOptionsMock).toHaveBeenLastCalledWith(
        expect.objectContaining({ count: 15 })
      );
    });
  });

  describe("DK64", () => {
    test("Check initial DK64 render", async () => {
      const screen = await getScreen("DK64");
      expect(screen.getByText("Level").last()).toBeVisible();
      expect(screen.getByText("Layer")).not.toBeInTheDocument();
    });

    test("Change DK64 config options", async () => {
      const screen = await getScreen("DK64");
      const selects = screen.getByRole("combobox").all();
      await selects[3].click(); // Count
      await screen.getByText("5").click();
      await selects[4].click(); // Total
      await screen.getByText("10").first().click();
      await userEvent.type(screen.getByText("Seed").first(), "12345");
      await screen.getByText("Timer").click();
      await screen.getByText("Auto-refresh").click();
      await screen.getByText("Use Kong colors").click();

      expect(setOptionsMock).toHaveBeenLastCalledWith(
        expect.objectContaining({
          count: 5,
          dk64Total: 10,
          timer: false,
          autoRefresh: false,
          useKongColors: true,
          seed: "12345"
        })
      );
    });

    test("Change DK64 options that recount items", async () => {
      vi.resetAllMocks();
      const screen = await getScreen("DK64");
      const selects = screen.getByRole("combobox").all();
      await selects[3].click(); // Count
      await screen.getByText("5").click();
      await screen.getByText("Hell Mode").click();
      await screen.getByText("Auto-refresh").click();
      await selects[0].click(); // Level
      await screen.getByText(LevelName.Factory).click();
      await selects[1].click(); // Category
      await screen.getByText(DK64Category.CompanyCoin).click();

      expect(setOptionsMock).toHaveBeenLastCalledWith(
        expect.objectContaining({
          items: [
            {
              name: "Nintendo Coin",
              hellMode: true,
              category: DK64Category.CompanyCoin
            }
          ]
        })
      );
    });
  });
});
