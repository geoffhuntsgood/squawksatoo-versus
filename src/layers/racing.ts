import type { DKBLayer } from "../classes/DKBLayer";
import { DKBCategory, LayerName } from "../enums";

export const racing: DKBLayer = {
  name: LayerName.Racing,
  bananas: [
    {
      num: 1,
      name: "Bruised Peekabruiser! Again!",
      category: DKBCategory.Quintuple
    },
    {
      num: 2,
      name: "Battle: Jumping Jukes",
      category: DKBCategory.Battle
    },
    {
      num: 3,
      name: "Battle: Turf Surf Trampling",
      category: DKBCategory.Battle
    },
    {
      num: 4,
      name: "Rumbling with Rambi",
      category: DKBCategory.Regular,
      isPostgame: true
    },
    {
      num: 5,
      name: "Racing Quiz Master",
      category: DKBCategory.Quiztone
    },
    {
      num: 6,
      name: "Cranky's Racing Rant",
      category: DKBCategory.Cranky
    },
    {
      num: 7,
      name: "Liftoff-Lope Finish Line",
      category: DKBCategory.Challenge
    },
    {
      num: 8,
      name: "Liftoff-Lope Buzzer Beater",
      category: DKBCategory.Challenge
    },
    {
      num: 9,
      name: "Tower at the Finish Line",
      category: DKBCategory.Challenge
    },
    {
      num: 10,
      name: "Viewing the Track from the Back",
      category: DKBCategory.Regular
    }
  ]
};
