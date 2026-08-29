import type { DKBLayer } from "../classes/DKBLayer";
import { DKBCategory, LayerName } from "../enums";

export const core: DKBLayer = {
  name: LayerName.Core,
  bananas: [
    {
      num: 1,
      name: "Victory over Void Kong!",
      category: DKBCategory.Quintuple
    },
    {
      num: 2,
      name: "A View of the King",
      category: DKBCategory.Regular
    },
    {
      num: 3,
      name: "In the Belly of K. Rool",
      category: DKBCategory.Regular
    },
    {
      num: 4,
      name: "Floating over Fractone Fort",
      category: DKBCategory.Regular
    },
    {
      num: 5,
      name: "Shifty Smash: Inhale and Destroy",
      category: DKBCategory.ShiftySmash
    },
    {
      num: 6,
      name: "Planet Core Smashin' Stats",
      category: DKBCategory.Smashintone
    },
    {
      num: 7,
      name: "Planet Core Chip Exchange",
      category: DKBCategory.Chiptone
    },
    {
      num: 8,
      name: "Survived the Gravel Gauntlet",
      category: DKBCategory.Regular
    },
    {
      num: 9,
      name: "Klaptrapped behind the Goo",
      category: DKBCategory.Regular
    },
    {
      num: 10,
      name: "The Switcheroo Chase",
      category: DKBCategory.Regular
    },
    {
      num: 11,
      name: "Korner of the Krevasse",
      category: DKBCategory.Regular
    },
    {
      num: 12,
      name: "Cracking Open the Way",
      category: DKBCategory.Regular
    },
    {
      num: 14,
      name: "Stomped Stompenclomper! Again!",
      category: DKBCategory.Regular
    },
    {
      num: 15,
      name: "Planet Core Quiz Master",
      category: DKBCategory.Quiztone
    },
    {
      num: 16,
      name: "Shifty Smash: Skyward Smashing",
      category: DKBCategory.ShiftySmash
    },
    {
      num: 17,
      name: "Fractone Cradle Climb",
      category: DKBCategory.Regular
    },
    {
      num: 18,
      name: "Turf Surf Pit Stop",
      category: DKBCategory.Regular
    },
    {
      num: 19,
      name: "Turf Surf Finish Line",
      category: DKBCategory.Regular
    },
    {
      num: 20,
      name: "Cranky's Planet Core Rant",
      category: DKBCategory.Cranky
    },
    {
      num: 21,
      name: "Rocked King K. Rool!",
      category: DKBCategory.Quintuple
    },
    {
      num: 13,
      name: "The Kremling Krew's Last Stand",
      category: DKBCategory.Regular,
      isPostgame: true
    },
    {
      num: 22,
      name: "Halfway through the Harmoneel",
      isPostgame: true,
      category: DKBCategory.Triple
    },
    {
      num: 23,
      name: "End of Harmoneel",
      isPostgame: true,
      category: DKBCategory.Quintuple
    }
  ]
};
