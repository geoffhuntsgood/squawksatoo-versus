import { describe, expect, test } from "vitest";
import { DKBCategory, LayerName } from "../../enums";
import {
  getBananasForCategories,
  getBananasForLayer,
  getCategoriesForLayer
} from "../../utils/layerApi";

describe("layerApi tests", () => {
  describe("getBananasForLayer tests", () => {
    const expected = {
      [LayerName.PreVoid]: 369,
      [LayerName.Ingot]: 36,
      [LayerName.Lagoon]: 56,
      [LayerName.Hilltop]: 38,
      [LayerName.Canyon]: 80,
      [LayerName.Divide]: 10,
      [LayerName.Freezer]: 87,
      [LayerName.Forest]: 83,
      [LayerName.Junction]: 15,
      [LayerName.Resort]: 42,
      [LayerName.Tempest]: 70,
      [LayerName.Landfill]: 27,
      [LayerName.Racing]: 10,
      [LayerName.Radiance]: 76,
      [LayerName.Groove]: 30,
      [LayerName.Feast]: 69,
      [LayerName.Forbidden]: 25,
      [LayerName.Core]: 23,
      [LayerName.All]: 777
    };

    Object.values(LayerName).forEach((layer: LayerName) => {
      test(`${layer}`, () => {
        expect(getBananasForLayer(layer)).toHaveLength(expected[layer]);
      });
    });
  });

  describe("getCategoriesForLayer tests", () => {
    const expected = {
      [LayerName.PreVoid]: 16,
      [LayerName.Ingot]: 14,
      [LayerName.Lagoon]: 10,
      [LayerName.Hilltop]: 13,
      [LayerName.Canyon]: 12,
      [LayerName.Divide]: 7,
      [LayerName.Freezer]: 12,
      [LayerName.Forest]: 12,
      [LayerName.Junction]: 6,
      [LayerName.Resort]: 14,
      [LayerName.Tempest]: 11,
      [LayerName.Landfill]: 10,
      [LayerName.Racing]: 6,
      [LayerName.Radiance]: 12,
      [LayerName.Groove]: 7,
      [LayerName.Feast]: 13,
      [LayerName.Forbidden]: 7,
      [LayerName.Core]: 8,
      [LayerName.All]: 17
    };

    Object.values(LayerName).forEach((layer: LayerName) => {
      test(`${layer}`, () => {
        expect(getCategoriesForLayer(layer)).toHaveLength(expected[layer]);
      });
    });
  });

  describe("getAllBananasForCategories tests", () => {
    test("Categories: 0, Postgame: No, Hell Mode: No", () => {
      expect(
        getBananasForCategories(LayerName.Groove, [], false, false)
      ).toHaveLength(26);
    });

    test("Categories: 1, Postgame: No, Hell Mode: No", () => {
      expect(
        getBananasForCategories(
          LayerName.Groove,
          [DKBCategory.Regular],
          false,
          false
        )
      ).toHaveLength(18);
    });

    test("Categories: 1, Postgame: Yes, Hell Mode: No", () => {
      expect(
        getBananasForCategories(
          LayerName.Groove,
          [DKBCategory.Regular],
          true,
          false
        )
      ).toHaveLength(20);
    });

    test("Categories: 2, Postgame: Yes, Hell Mode: Yes", () => {
      expect(
        getBananasForCategories(
          LayerName.Groove,
          [DKBCategory.Regular, DKBCategory.Challenge],
          true,
          true
        )
      ).toHaveLength(24);
    });

    test("Check category2", () => {
      expect(
        getBananasForCategories(
          LayerName.Freezer,
          [DKBCategory.ShiftySmash, DKBCategory.Challenge],
          true,
          true
        )
      ).toHaveLength(22);
    });
  });
});
