import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { DKItemRow } from "../../inputs";

describe("DKItemRow tests", () => {
  const successMock = vi.fn();
  const failureMock = vi.fn();

  const getScreen = (disabled: boolean, failure: boolean = false) => {
    return render(
      <DKItemRow
        name="Test Row"
        disabled={disabled}
        bgColor="blue"
        onSuccess={successMock}
        onFailure={failure ? failureMock : undefined}
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

  test("Check success action", async () => {
    const screen = await getScreen(false);
    await screen.getByRole("button").click();
    expect(successMock).toHaveBeenCalledOnce();
  });

  test("Check success action on text click", async () => {
    vi.resetAllMocks();
    const screen = await getScreen(false);
    await screen.getByText("Test Row").click();
    expect(successMock).toHaveBeenCalledOnce();
  });

  test("Check no interaction on text click when disabled", async () => {
    vi.resetAllMocks();
    const screen = await getScreen(true);
    await screen.getByText("Test Row").click();
    expect(successMock).not.toHaveBeenCalled();
  });

  test("Check failure action", async () => {
    vi.resetAllMocks();
    const screen = await getScreen(false, true);
    await screen.getByRole("button").last().click();
    expect(failureMock).toHaveBeenCalledOnce();
  });
});
