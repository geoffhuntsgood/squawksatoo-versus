import type { DK64Item, DK64Level } from "../classes";
import { DK64Barrel, DK64Category, LevelName } from "../enums";
import { aztec } from "../levels/aztec";
import { castle } from "../levels/castle";
import { caves } from "../levels/caves";
import { factory } from "../levels/factory";
import { forest } from "../levels/forest";
import { galleon } from "../levels/galleon";
import { helm } from "../levels/helm";
import { isles } from "../levels/isles";
import { japes } from "../levels/japes";
import { kongColors } from "./theme";

const allLevels: DK64Level[] = [
  isles,
  japes,
  aztec,
  factory,
  galleon,
  forest,
  caves,
  castle,
  helm
];

export const getItemsForLevel = (levelName: LevelName): DK64Item[] => {
  return levelName === LevelName.All
    ? allLevels.flatMap((level) => level.items)
    : allLevels.filter((level) => level.name === levelName)[0].items;
};

export const getCategoriesForLevel = (levelName: LevelName): DK64Category[] => {
  const levelItems = getItemsForLevel(levelName);
  return [...new Set(levelItems.map((item) => item.category))];
};

export const getBarrelsForLevel = (levelName: LevelName): DK64Barrel[] => {
  const levelItems = getItemsForLevel(levelName);
  return [
    ...new Set(
      levelItems
        .map((item) => item.subCategory)
        .filter((barrel) => barrel !== undefined)
    )
  ];
};

export const getItemsForCategories = (
  levelName: LevelName,
  categories: DK64Category[],
  hellMode: boolean,
  barrels?: DK64Barrel[]
): DK64Item[] => {
  let items = getItemsForLevel(levelName);

  if (!hellMode) {
    items = items.filter((item) => !item.hellMode);
  }

  if (categories.length > 0 && barrels && barrels.length > 0) {
    return items.filter((item) =>
      categories.includes(item.category) && item.subCategory
        ? barrels.includes(item.subCategory)
        : true
    );
  } else if (categories.length > 0) {
    return items.filter((item) => categories.includes(item.category));
  } else if (barrels && barrels.length > 0) {
    return items.filter((item) =>
      item.subCategory ? barrels.includes(item.subCategory) : true
    );
  } else {
    return items;
  }
};

export const getKongColorInfo = (name: string, useKongColors: boolean) => {
  let label = name;
  let color = "black";

  if (!useKongColors) {
    return {
      label,
      color
    };
  }

  const levels = [
    "Japes",
    "Aztec",
    "Factory",
    "Galleon",
    "Forest",
    "Caves",
    "Castle",
    "Helm",
    "Isles"
  ];
  const kongs = ["Donkey", "Diddy", "Lanky", "Tiny", "Chunky"];

  levels.some((level) => {
    kongs.some((kong) => {
      if (name.startsWith(`${level} ${kong}`)) {
        label = name.replace(` ${kong}`, "");
        color = kongColors[kong as keyof typeof kongColors];
      }
    });
  });

  return {
    label,
    color
  };
};
