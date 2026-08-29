import type { DKBBanana, DKBLayer } from "../classes";
import { DKBCategory, LayerName } from "../enums";
import { canyon } from "../layers/canyon";
import { core } from "../layers/core";
import { divide } from "../layers/divide";
import { feast } from "../layers/feast";
import { forbidden } from "../layers/forbidden";
import { forest } from "../layers/forest";
import { freezer } from "../layers/freezer";
import { groove } from "../layers/groove";
import { hilltop } from "../layers/hilltop";
import { ingot } from "../layers/ingot";
import { junction } from "../layers/junction";
import { lagoon } from "../layers/lagoon";
import { landfill } from "../layers/landfill";
import { racing } from "../layers/racing";
import { radiance } from "../layers/radiance";
import { resort } from "../layers/resort";
import { tempest } from "../layers/tempest";

const allLayers: DKBLayer[] = [
  ingot,
  lagoon,
  hilltop,
  canyon,
  divide,
  freezer,
  forest,
  junction,
  resort,
  tempest,
  landfill,
  racing,
  radiance,
  groove,
  feast,
  forbidden,
  core
];

export const getBananasForLayer = (layerName: LayerName): DKBBanana[] => {
  if (layerName === LayerName.All) {
    return allLayers.flatMap((layer: DKBLayer) => layer.bananas);
  }

  if (layerName === LayerName.PreVoid) {
    return allLayers
      .filter((layer: DKBLayer) =>
        [
          LayerName.Lagoon,
          LayerName.Hilltop,
          LayerName.Canyon,
          LayerName.Divide,
          LayerName.Freezer,
          LayerName.Forest,
          LayerName.Junction
        ].includes(layer.name)
      )
      .flatMap((layer: DKBLayer) => layer.bananas);
  }

  return allLayers.filter((layer: DKBLayer) => layer.name === layerName)[0]
    .bananas;
};

export const getCategoriesForLayer = (layerName: LayerName): DKBCategory[] => {
  const layerBananas = getBananasForLayer(layerName);
  const cats: DKBCategory[] = [];
  layerBananas.forEach((banana: DKBBanana) => {
    if (!cats.includes(banana.category)) {
      cats.push(banana.category);
    }
    if (banana.category2 && !cats.includes(banana.category2)) {
      cats.push(banana.category2);
    }
  });
  return cats;
};

export const getBananasForCategories = (
  layerName: LayerName,
  categories: DKBCategory[],
  includePostgame: boolean,
  hellMode: boolean
): DKBBanana[] => {
  let bananas = getBananasForLayer(layerName);

  if (!hellMode) {
    bananas = bananas.filter((banana: DKBBanana) => !banana.hellMode);
  }

  if (!includePostgame) {
    bananas = bananas.filter((banana: DKBBanana) => !banana.isPostgame);
  }

  if (categories.length === 0) {
    return bananas;
  } else {
    return bananas.filter((banana: DKBBanana) => {
      return banana.category2
        ? categories.includes(banana.category) ||
            categories.includes(banana.category2)
        : categories.includes(banana.category);
    });
  }
};
