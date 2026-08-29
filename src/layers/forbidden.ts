import type { DKBLayer } from "../classes/DKBLayer";
import { DKBCategory, LayerName } from "../enums";

export const forbidden: DKBLayer = {
  name: LayerName.Forbidden,
  bananas: [
    {
      num: 1,
      name: "Scrubbed Muckety-Muck!",
      category: DKBCategory.Quintuple
    },
    {
      num: 2,
      name: "Secret in the Shaft",
      category: DKBCategory.Regular
    },
    {
      num: 3,
      name: "Soggy First Steps",
      category: DKBCategory.Challenge
    },
    {
      num: 4,
      name: "Swift Sideways Shuffle",
      category: DKBCategory.Challenge
    },
    {
      num: 5,
      name: "No Swimming, No Slipping",
      category: DKBCategory.Challenge
    },
    {
      num: 6,
      name: "Battle: Nighty Night, Nemesis",
      category: DKBCategory.Battle
    },
    {
      num: 7,
      name: "Pitching for Passage",
      category: DKBCategory.Regular
    },
    {
      num: 8,
      name: "Past the Shuffling Ceiling",
      category: DKBCategory.Regular
    },
    {
      num: 9,
      name: "Under, Up, and Inside",
      category: DKBCategory.Regular
    },
    {
      num: 10,
      name: "Battle: Forged Path Upward",
      category: DKBCategory.Battle
    },
    {
      num: 11,
      name: "Passage to the Lonely Island",
      category: DKBCategory.Regular
    },
    {
      num: 12,
      name: "Perilous Passage",
      category: DKBCategory.Regular
    },
    {
      num: 13,
      name: "Cranky's Forbidden Rant",
      category: DKBCategory.Cranky
    },
    {
      num: 14,
      name: "Halfway Shuffled",
      category: DKBCategory.Challenge
    },
    {
      num: 15,
      name: "Balloons in the Shuffle",
      category: DKBCategory.Challenge
    },
    {
      num: 16,
      name: "Survived the Shuffle",
      category: DKBCategory.Challenge
    },
    {
      num: 17,
      name: "Unwelcome at Go-No-Further Gate!",
      category: DKBCategory.Regular
    },
    {
      num: 18,
      name: "Battle: Shuffling Walls",
      category: DKBCategory.Battle
    },
    {
      num: 19,
      name: "Forbidden Smashin' Stats",
      category: DKBCategory.Smashintone
    },
    {
      num: 20,
      name: "Passage through Lava",
      category: DKBCategory.Regular
    },
    {
      num: 21,
      name: "Shuffling Ascent",
      category: DKBCategory.Challenge
    },
    {
      num: 22,
      name: "Behind the Shuffle",
      category: DKBCategory.Challenge
    },
    {
      num: 23,
      name: "Atop the Shuffle",
      category: DKBCategory.Challenge
    },
    {
      num: 25,
      name: "Forbidden Chip Exchange",
      category: DKBCategory.Chiptone
    },
    {
      num: 24,
      name: "A Gift from Grumpy",
      category: DKBCategory.Regular,
      isPostgame: true
    }
  ]
};
