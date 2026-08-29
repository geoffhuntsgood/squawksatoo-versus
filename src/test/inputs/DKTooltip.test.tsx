import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { DKTooltip } from "../../inputs";

describe("DKTooltip tests", () => {
  const getScreen = () => {
    return render(<DKTooltip helpText="Test Tooltip" />);
  };

  test("Check initial render", async () => {
    const screen = await getScreen();
    await screen.getByLabelText("Test Tooltip").hover();
    expect(screen.getByTestId("question")).toBeVisible();
  });
});
