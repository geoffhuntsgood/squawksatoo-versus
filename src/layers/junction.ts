import type { DKBLayer } from "../classes/DKBLayer";
import { DKBCategory, LayerName } from "../enums";

export const junction: DKBLayer = {
  name: LayerName.Junction,
  bananas: [
    {
      num: 1,
      name: "Freezer Path's Special Scoop",
      category: DKBCategory.Regular
    },
    {
      num: 2,
      name: "Cooled Off Inflammonite!",
      category: DKBCategory.Quintuple
    },
    {
      num: 3,
      name: "Freezer Path's Hidden Snack",
      category: DKBCategory.Regular
    },
    {
      num: 5,
      name: "Forest Path's Birdbrain",
      category: DKBCategory.Regular
    },
    {
      num: 6,
      name: "Uprooted Abracajabya!",
      category: DKBCategory.Quintuple
    },
    {
      num: 7,
      name: "Forest Path's Hidden Snack",
      category: DKBCategory.Regular
    },
    {
      num: 9,
      name: "Cleared the Way to Clash Point!",
      category: DKBCategory.Regular
    },
    {
      num: 10,
      name: "Clash Point's Hidden Snack",
      category: DKBCategory.Regular
    },
    {
      num: 11,
      name: "Battle: A Fiery Fracas",
      category: DKBCategory.Battle
    },
    {
      num: 12,
      name: "Target on the Run",
      category: DKBCategory.Challenge
    },
    {
      num: 13,
      name: "Out-of-Range Perch",
      category: DKBCategory.Challenge
    },
    {
      num: 14,
      name: "Target Escaped",
      category: DKBCategory.Challenge
    },
    {
      num: 15,
      name: "Cranky's Junction Rant",
      category: DKBCategory.Cranky
    },
    {
      num: 4,
      name: "Shifty Smash: Freezer Path",
      isPostgame: true,
      category: DKBCategory.ShiftySmash
    },
    {
      num: 8,
      name: "Shifty Smash: Forest Path",
      isPostgame: true,
      category: DKBCategory.ShiftySmash
    }
  ]
};
