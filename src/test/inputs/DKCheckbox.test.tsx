import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { DKCheckbox } from "../../inputs";

describe("DKCheckbox tests", () => {
  const checkMock = vi.fn();

  const getScreen = () => {
    return render(
      <DKCheckbox
        label="Test Checkbox"
        checked={true}
        handleChange={checkMock}
        helpText="Test Tooltip"
      />
    );
  };

  test("Check initial render", async () => {
    const screen = await getScreen();
    expect(screen.getByText("Test Checkbox")).toBeVisible();
  });

  test("Check action trigger", async () => {
    const screen = await getScreen();
    await screen.getByText("Test Checkbox").click();
    expect(checkMock).toHaveBeenCalledOnce();
  });
});
