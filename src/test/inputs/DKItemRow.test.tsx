import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { DKItemRow } from "../../inputs";

describe("DKItemRow tests", () => {
  const completeMock = vi.fn();

  const getScreen = (disabled: boolean) => {
    return render(
      <DKItemRow
        name="Test Row"
        disabled={disabled}
        onComplete={completeMock}
      />
    );
  };

  test("Check initial render", async () => {
    const row = (await getScreen(false)).getByText("Test Row");
    expect(row).toBeVisible();
    expect(row).toHaveStyle({ textDecoration: "none" });
  });

  test("Check disabled style", async () => {
    const row = (await getScreen(true)).getByText("Test Row");
    expect(row).toHaveStyle({
      cursor: "not-allowed"
    });
  });

  test("Check complete action on button click", async () => {
    const screen = await getScreen(false);
    await screen.getByRole("button").click();
    expect(completeMock).toHaveBeenCalledOnce();
  });

  test("Check complete action on text click", async () => {
    vi.resetAllMocks();
    const screen = await getScreen(false);
    await screen.getByText("Test Row").click();
    expect(completeMock).toHaveBeenCalledOnce();
  });

  test("Check no interaction on text click when disabled", async () => {
    vi.resetAllMocks();
    const screen = await getScreen(true);
    await screen.getByText("Test Row").click();
    expect(completeMock).not.toHaveBeenCalled();
  });
});
