import type { DKBLayer } from "../classes/DKBLayer";
import { DKBCategory, LayerName } from "../enums";

export const divide: DKBLayer = {
  name: LayerName.Divide,
  bananas: [
    {
      num: 1,
      name: "Stomped Stompenclomper!",
      category: DKBCategory.Quintuple
    },
    {
      num: 2,
      name: "A Switcheroo Boost",
      category: DKBCategory.Challenge
    },
    {
      num: 3,
      name: "A Switcheroo Breakthrough",
      category: DKBCategory.Challenge
    },
    {
      num: 4,
      name: "A Masterful Switcheroo Maneuver",
      category: DKBCategory.Challenge
    },
    {
      num: 5,
      name: "Divide Quiz Master",
      category: DKBCategory.Quiztone
    },
    {
      num: 6,
      name: "Switcheroo through the Wall",
      category: DKBCategory.Regular
    },
    {
      num: 7,
      name: "Safe-Landing Switcheroo",
      category: DKBCategory.Regular
    },
    {
      num: 8,
      name: "Battle: Uproot to the Brute",
      category: DKBCategory.Battle
    },
    {
      num: 9,
      name: "Cranky's Divide Rant",
      category: DKBCategory.Cranky
    },
    {
      num: 10,
      name: "Decked Out in Animal Print",
      isPostgame: true,
      category: DKBCategory.Glamtone
    }
  ]
};
