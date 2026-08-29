import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { DKButton } from "../../inputs";

describe("DKButton tests", () => {
  const clickMock = vi.fn();

  const getScreen = () => {
    return render(<DKButton label="Test Button" handleClick={clickMock}/>);
  };

  test("Check initial render", async () => {
    const screen = await getScreen();
    expect(screen.getByText("Test Button")).toBeVisible();
  });

  test("Check click action", async () => {
    const screen = await getScreen();
    await screen.getByText("Test Button").click();
    expect(clickMock).toHaveBeenCalledOnce();
  });
});
