import { describe, expect, test } from "vitest";
import { DK64Barrel, DK64Category, LevelName } from "../../enums";
import {
  getCategoriesForLevel,
  getItemsForCategories,
  getItemsForLevel,
  getKongColorInfo
} from "../../utils/levelApi";
import { kongColors } from "../../utils/theme";

describe("levelApi tests", () => {
  describe("getItemsForLevel tests", () => {
    const expected = {
      [LevelName.All]: 374,
      [LevelName.Isles]: 46,
      [LevelName.Japes]: 44,
      [LevelName.Aztec]: 47,
      [LevelName.Factory]: 46,
      [LevelName.Galleon]: 44,
      [LevelName.Forest]: 46,
      [LevelName.Caves]: 44,
      [LevelName.Castle]: 48,
      [LevelName.Helm]: 9
    };

    Object.values(LevelName).forEach((level: LevelName) => {
      test(`${level}`, () => {
        expect(getItemsForLevel(level)).toHaveLength(expected[level]);
      });
    });
  });

  describe("getCategoriesForLevel tests", () => {
    const expected = {
      [LevelName.All]: 11,
      [LevelName.Isles]: 7,
      [LevelName.Japes]: 9,
      [LevelName.Aztec]: 9,
      [LevelName.Factory]: 10,
      [LevelName.Galleon]: 9,
      [LevelName.Forest]: 9,
      [LevelName.Caves]: 9,
      [LevelName.Castle]: 9,
      [LevelName.Helm]: 5
    };

    Object.values(LevelName).forEach((level: LevelName) => {
      test(`${level}`, () => {
        expect(getCategoriesForLevel(level)).toHaveLength(expected[level]);
      });
    });
  });

  describe("getItemsForCategories tests", () => {
    test("Categories: 0, Hell Mode: No", () => {
      expect(getItemsForCategories(LevelName.Factory, [], false)).toHaveLength(
        44
      );
    });

    test("Categories: 0, Hell Mode: Yes", () => {
      expect(getItemsForCategories(LevelName.Factory, [], true)).toHaveLength(
        46
      );
    });

    test("Categories: 1, Hell Mode: No", () => {
      expect(
        getItemsForCategories(LevelName.Factory, [DK64Category.GB], false)
      ).toHaveLength(19);
    });

    test("Categories: 2, Hell Mode: No", () => {
      expect(
        getItemsForCategories(
          LevelName.Factory,
          [DK64Category.Fairy, DK64Category.Crown],
          false
        )
      ).toHaveLength(3);
    });

    test("Categories: 0, Hell Mode: No, Barrels: 1", () => {
      const items = getItemsForCategories(LevelName.Factory, [], false, [
        DK64Barrel.BeaverBother
      ]);
      expect(items).toContainEqual({
        name: "Factory Diddy Storage Vines Bonus GB",
        category: DK64Category.GB,
        subCategory: DK64Barrel.BeaverBother
      });
      expect(items).not.toContainEqual({
        name: "Factory Diddy Block Tower Bonus GB",
        category: DK64Category.GB,
        subCategory: DK64Barrel.PerilPathPanic
      });
    });

    test("Categories: 1, Hell Mode: No, Barrels: 1", () => {
      const items = getItemsForCategories(
        LevelName.Galleon,
        [DK64Category.GB],
        false,
        [DK64Barrel.BattyBarrelBandit]
      );
      expect(items).toContainEqual({
        name: "Galleon Chunky 5DS Bonus GB",
        category: DK64Category.GB,
        subCategory: DK64Barrel.BattyBarrelBandit
      });
      expect(items).not.toContainEqual({
        name: "Galleon Tiny Submarine Bonus GB",
        category: DK64Category.GB,
        subCategory: DK64Barrel.BigBugBash
      });
    });
  });

  describe("getKongColorInfo tests", () => {
    test("useKongColors: No", () => {
      const info = getKongColorInfo("Helm Donkey Medal", false);
      expect(info.label).toBe("Helm Donkey Medal");
      expect(info.color).toBe("black");
    });

    test("Japes Donkey", () => {
      const info = getKongColorInfo("Japes Donkey GB", true);
      expect(info.label).toBe("Japes GB");
      expect(info.color).toBe(kongColors.Donkey);
    });

    test("Aztec Diddy", () => {
      const info = getKongColorInfo("Aztec Diddy Doin' Stuff", true);
      expect(info.label).toBe("Aztec Doin' Stuff");
      expect(info.color).toBe(kongColors.Diddy);
    });

    test("Factory Lanky", () => {
      const info = getKongColorInfo("Factory Lanky Collectable of Doom", true);
      expect(info.label).toBe("Factory Collectable of Doom");
      expect(info.color).toBe(kongColors.Lanky);
    });

    test("Galleon Tiny", () => {
      const info = getKongColorInfo("Galleon Tiny Crown...?", true);
      expect(info.label).toBe("Galleon Crown...?");
      expect(info.color).toBe(kongColors.Tiny);
    });

    test("Forest Chunky", () => {
      const info = getKongColorInfo("Forest Chunky uhhh", true);
      expect(info.label).toBe("Forest uhhh");
      expect(info.color).toBe(kongColors.Chunky);
    });
  });
});
