import { render } from "vitest-browser-react";
import { GameHeader } from "../../components";
import { DK64Category } from "../../enums";
import { ItemWithPlayerId } from "../../utils/types";

describe("GameHeader tests", async () => {
  const setShouldBePausedMock = vi.fn();

  const getScreen = (
    timer: boolean,
    total: number,
    completed: ItemWithPlayerId[],
    shouldBePaused: boolean
  ) => {
    return render(
      <GameHeader
        timer={timer}
        total={total}
        completed={completed}
        players={["Geoff"]}
        shouldBePaused={shouldBePaused}
        setShouldBePaused={setShouldBePausedMock}
      />
    );
  };

  test("Check initial render with completion", async () => {
    const completed = [
      {
        name: "Test",
        category: DK64Category.Blueprint,
        playerId: "Geoff"
      }
    ];

    const screen = await getScreen(false, 1, completed, true);
    expect(screen.getByText("GG!")).toBeInTheDocument();
  });

  test("Check in progress game", async () => {
    const screen = await getScreen(false, 3, [], false);
    expect(screen.getByText("3 left")).toBeInTheDocument();
  });
});
