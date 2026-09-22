import { render } from "vitest-browser-react";
import { DKCheckbox } from "../../inputs";

describe("DKCheckbox tests", () => {
  const checkMock = vi.fn();

  const getScreen = (withTooltip: boolean) => {
    return render(
      <DKCheckbox
        label="Test Checkbox"
        checked={true}
        handleChange={checkMock}
        helpText={withTooltip ? "Test Tooltip" : ""}
      />
    );
  };

  test("Check initial render with tooltip", async () => {
    const screen = await getScreen(true);
    expect(screen.getByText("Test Checkbox?")).toBeVisible();
  });

  test("Check action trigger (no tooltip)", async () => {
    const screen = await getScreen(false);
    await screen.getByText("Test Checkbox").click();
    expect(checkMock).toHaveBeenCalledOnce();
  });
});
