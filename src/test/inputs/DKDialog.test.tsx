import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { DKDialog } from "../../inputs";

describe("DKDialog tests", () => {
  const setOpenMock = vi.fn();
  const handleYesActionMock = vi.fn();
  const handleNoActionMock = vi.fn();

  const getScreen = (
    open: boolean,
    handleYes?: boolean,
    handleNo?: boolean,
    yesLabel?: string,
    noLabel?: string
  ) => {
    return render(
      <DKDialog
        title="Test Dialog"
        description="Test Description"
        open={open}
        setOpen={setOpenMock}
        handleYesAction={handleYes ? handleYesActionMock : undefined}
        handleNoAction={handleNo ? handleNoActionMock : undefined}
        yesLabel={yesLabel}
        noLabel={noLabel}
      />
    );
  };

  test("Check initial render (not open)", async () => {
    const screen = await getScreen(false);
    expect(screen.getByText("Test Dialog")).not.toBeInTheDocument();
  });

  test("Check initial render and button visibility (open)", async () => {
    const screen = await getScreen(true, true, true, "Yes", "No");
    expect(screen.getByText("Test Dialog")).toBeVisible();
    expect(screen.getByText("Yes")).toBeVisible();
    expect(screen.getByText("No")).toBeVisible();
  });

  test("Check yes button action", async () => {
    const screen = await getScreen(true, true, false, "Yes");
    await screen.getByText("Yes").click();
    expect(handleYesActionMock).toHaveBeenCalledOnce();
  });

  test("Check no button action", async () => {
    vi.resetAllMocks();
    const screen = await getScreen(true, false, true, undefined, "No");
    await screen.getByText("No").click();
    expect(handleNoActionMock).toHaveBeenCalledOnce();
    expect(setOpenMock).toHaveBeenCalledOnce();
  });
});
