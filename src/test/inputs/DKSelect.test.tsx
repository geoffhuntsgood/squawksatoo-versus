import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { DKSelect } from "../../inputs";

describe("DKSelect tests", () => {
  const selectMock = vi.fn();

  const getScreen = () => {
    return render(
      <DKSelect
        label="Test Select"
        value="0"
        handleChange={selectMock}
        selectItems={["0", "1", "2"]}
      />
    );
  };

  test("Check initial render", async () => {
    const screen = await getScreen();
    expect(screen.getByRole("combobox")).toBeVisible();
  });

  test("Test select action", async () => {
    const screen = await getScreen();
    await screen.getByRole("combobox").click();
    expect(screen.getByRole("listbox")).toBeVisible();
    await screen.getByText("1").click();
    expect(selectMock).toHaveBeenCalledWith("1");
  });
});
