import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { DKMultiSelect } from "../../inputs";

describe("DKMultiSelect tests", () => {
  const selectMock = vi.fn();

  const getScreen = () => {
    return render(
      <DKMultiSelect
        label="Test Select"
        values={[]}
        handleChange={selectMock}
        selectItems={["0", "1", "2"]}
      />
    );
  };

  test("Check initial render", async () => {
    const screen = await getScreen();
    expect(screen.getByRole("combobox")).toBeVisible();
  });

  test("Test single select action", async () => {
    const screen = await getScreen();
    await screen.getByRole("combobox").click();
    expect(screen.getByRole("listbox")).toBeVisible();
    await screen.getByText("1").click();
    expect(selectMock).toHaveBeenCalledWith(["1"]);
  });

  test("Test select all action", async () => {
    vi.resetAllMocks();
    const screen = await getScreen();
    await screen.getByRole("combobox").click();
    expect(screen.getByRole("listbox")).toBeVisible();
    await screen.getByText("Select/Unselect All").click();
    expect(selectMock).toHaveBeenCalledWith(["0", "1", "2"]);
  });
});
