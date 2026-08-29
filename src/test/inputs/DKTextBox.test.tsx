import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";
import { DKTextBox } from "../../inputs";

describe("DKTextBox tests", () => {
  const typeMock = vi.fn();

  const getScreen = () => {
    return render(
      <DKTextBox label="Test TextBox" value="" handleChange={typeMock} />
    );
  };

  test("Check initial render", async () => {
    const screen = await getScreen();
    expect(screen.getByText("Test TextBox").first()).toBeVisible();
  });

  test("Check type action", async () => {
    const screen = await getScreen();
    await userEvent.type(screen.getByText("Test TextBox").first(), "12345");
    expect(typeMock).toHaveBeenCalledTimes(5);
  });
});
