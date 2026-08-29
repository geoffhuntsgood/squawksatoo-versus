import { describe, expect, test } from "vitest";
import {
  DK64Item,
  DK64Level,
  DKBBanana,
  DKBLayer,
  GameOptions
} from "../../classes";
import { DK64Category, DKBCategory, LayerName, LevelName } from "../../enums";

describe("Class instantiation sanity checks", () => {
  test("DK64Item check", () => {
    expect(new DK64Item("Banana", DK64Category.GB).category).toBe(
      DK64Category.GB
    );
  });

  test("DK64Level check", () => {
    expect(
      new DK64Level(LevelName.Japes, [
        { name: "Banana", category: DK64Category.GB }
      ]).items
    ).toHaveLength(1);
  });

  test("DKBBanana check", () => {
    expect(new DKBBanana(1, "Banana", DKBCategory.Battle).name).toBe("Banana");
  });

  test("DKBLayer check", () => {
    expect(
      new DKBLayer(LayerName.Hilltop, [
        { num: 1, name: "Banana", category: DKBCategory.Battle }
      ]).bananas
    ).toHaveLength(1);
  });

  test("GameOptions check", () => {
    expect(
      new GameOptions(3, 10, 10, "12345", true, false, true, false, [], [])
        .timer
    ).toBe(true);
  });
});
