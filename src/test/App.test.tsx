import { beforeEach, describe, expect, test } from "vitest";
import { render, RenderResult } from "vitest-browser-react";
import { userEvent } from "vitest/browser";
import App from "../App";

describe("App tests", () => {
  const getScreen = () => {
    return render(<App />);
  };

  let screen: RenderResult;

  beforeEach(async () => {
    screen = await getScreen();
    await userEvent.type(screen.getByText("Player Name *").first(), "Geoff");
    await userEvent.type(screen.getByText("Room Name *").first(), "12345");
    await screen.getByText("Go!").click();
  });

  test("Check initial render", async () => {
    expect(screen.getByText("Squawksatoo VS")).toBeVisible();
  });

  test("DKB config tab", async () => {
    expect(screen.getByText("Layer").last()).toBeVisible();
  });

  test("DK64 config tab", async () => {
    await screen.getByRole("tab").last().click();
    expect(screen.getByText("Level").last()).toBeVisible();
  });

  test("Start DKB game", async () => {
    await screen.getByText("Get 43 bananas").click();
    expect(screen.getByText("Waiting")).toBeVisible();
  });

  test("Start DK64 game", async () => {
    await screen.getByRole("tab").last().click();
    await screen.getByText("Get 370 items").click();
    expect(screen.getByText("Waiting")).toBeVisible();
  });
});
