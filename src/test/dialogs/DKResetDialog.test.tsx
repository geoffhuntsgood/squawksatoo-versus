import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { DKResetDialog } from "../../dialogs";

describe("DKResetDialog tests", () => {
  const setOpenMock = vi.fn();
  const handleCancelActionMock = vi.fn();

  const getScreen = (open: boolean) => {
    return render(
      <DKResetDialog
        open={open}
        setOpen={setOpenMock}
        handleCancelAction={handleCancelActionMock}
      />
    );
  };

  test("Check initial render (not open)", async () => {
    const screen = await getScreen(false);
    expect(screen.getByText("Test Dialog")).not.toBeInTheDocument();
  });

  test("Check initial render (open)", async () => {
    const screen = await getScreen(true);
    expect(screen.getByText("Reconfigure")).toBeVisible();
    expect(screen.getByText("Cancel")).toBeVisible();
  });

  test("Check cancel button action", async () => {
    vi.resetAllMocks();
    const screen = await getScreen(true);
    await screen.getByText("No").click();
    expect(handleCancelActionMock).toHaveBeenCalledOnce();
    expect(setOpenMock).toHaveBeenCalledOnce();
  });
});
