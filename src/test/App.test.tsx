import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import App from "../App";

describe("App tests", () => {
  const getScreen = () => {
    return render(<App />);
  };

  test("Check initial render", async () => {
    expect((await getScreen()).getByText("Squawksatoo")).toBeVisible();
  });

  test("DKB config tab", async () => {
    expect((await getScreen()).getByText("Layer").last()).toBeVisible();
  });

  test("DK64 config tab", async () => {
    const screen = await getScreen();
    await screen.getByRole("tab").last().click();
    expect(screen.getByText("Level").last()).toBeVisible();
  });

  test("Start DKB game", async () => {
    const screen = await getScreen();
    await screen.getByRole("button").click();
    expect(screen.getByText("Reconfigure")).toBeVisible();
  });

  test("Start DK64 game", async () => {
    const screen = await getScreen();
    await screen.getByRole("tab").last().click();
    await screen.getByRole("button").click();
    expect(screen.getByText("Reconfigure")).toBeVisible();
  });
});
