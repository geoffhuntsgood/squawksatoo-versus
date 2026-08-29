import { Box, Grid } from "@mui/material";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { DK64Item, DKBBanana, GameOptions } from "../classes";
import {
  DK64Barrel,
  DK64Category,
  DKBCategory,
  LayerName,
  LevelName
} from "../enums";
import { DKCheckbox, DKMultiSelect, DKSelect, DKTextBox } from "../inputs";
import {
  getBananasForCategories,
  getCategoriesForLayer
} from "../utils/layerApi";
import {
  getBarrelsForLevel,
  getCategoriesForLevel,
  getItemsForCategories
} from "../utils/levelApi";
import type { GameType } from "../utils/types";

export const GameConfig = ({
  currentGame,
  setOptions,
  setGoLabel,
}: {
  currentGame: GameType;
  setOptions: Dispatch<SetStateAction<GameOptions | null>>;
  setGoLabel: Dispatch<SetStateAction<string>>;
}) => {
  const [config, setConfig] = useState({
    count: 1,
    dkbTotal: 5,
    dk64Total: 5,
    seed: "",
    timer: true,
    autoRefresh: true,
    recycle: false,
    useKongColors: false
  });

  const [layer, setLayer] = useState<string>(LayerName.Lagoon);
  const [dkbCats, setDKBCats] = useState<DKBCategory[]>([]);
  const [selectedDKBCats, setSelectedDKBCats] = useState<string[]>([]);

  const [level, setLevel] = useState<string>(LevelName.All);
  const [dk64Cats, setDK64Cats] = useState<DK64Category[]>([]);
  const [selectedDK64Cats, setSelectedDK64Cats] = useState<string[]>([]);
  const [dk64Barrels, setDK64Barrels] = useState<DK64Barrel[]>([]);
  const [selectedDK64Barrels, setSelectedDK64Barrels] = useState<string[]>([]);

  const [includePostgame, setIncludePostgame] = useState(false);
  const [hellMode, setHellMode] = useState(false);

  const [bananas, setBananas] = useState<DKBBanana[]>(
    getBananasForCategories(layer as LayerName, [], includePostgame, hellMode)
  );
  const [items, setItems] = useState<DK64Item[]>(
    getItemsForCategories(level as LevelName, [], hellMode)
  );

  const getCountRange = () => {
    if (currentGame === "DKB" && layer === LayerName.All) {
      return ["1", "2", "3", "4", "5", "10", "15", "20"];
    }

    const range = [];
    const totalLength = currentGame === "DKB" ? bananas.length : items.length;
    const maxAtOnce = totalLength > 5 ? 5 : totalLength;

    for (let i = 1; i <= maxAtOnce; i++) {
      range.push(String(i));
    }
    return range;
  };

  const getTotalRange = () => {
    const range = [];
    const total = currentGame === "DKB" ? bananas.length : items.length;
    for (let i = 5; i <= total; i++) {
      if (i % 5 === 0) {
        range.push(String(i));
      }
    }
    if (!range.includes(String(total))) {
      range.push(String(total));
    }
    return range;
  };

  const getHellModeTooltip = () => {
    if (currentGame === "DKB") {
      return (
        <>
          Adds long goals to the pool:
          <ul style={{ margin: "0" }}>
            <li>Rehearsal bananas</li>
            <li>Battle and Boss Rushes</li>
            <li>A Complete Fossil Collection</li>
            <li>The Best of the Bunch</li>
          </ul>
        </>
      );
    } else {
      return (
        <>
          Adds long goals to the pool:
          <ul style={{ margin: "0" }}>
            <li>Company Coins</li>
            <li>DK Arcade GB</li>
            <li>Rareware GB</li>
          </ul>
        </>
      );
    }
  };

  useEffect(() => {
    const bananas = getBananasForCategories(
      layer as LayerName,
      selectedDKBCats as DKBCategory[],
      includePostgame,
      hellMode
    );

    setConfig((prev) => ({
      ...prev,
      dkbTotal: bananas.length,
      count: bananas.length < prev.count ? bananas.length : prev.count
    }));

    setDKBCats(getCategoriesForLayer(layer as LayerName));
    setBananas(bananas);
  }, [layer, selectedDKBCats, includePostgame, hellMode]);

  useEffect(() => {
    const items = getItemsForCategories(
      level as LevelName,
      selectedDK64Cats as DK64Category[],
      hellMode,
      selectedDK64Barrels as DK64Barrel[]
    );

    setConfig((prev) => ({
      ...prev,
      dk64Total: items.length,
      count: items.length < prev.count ? items.length : prev.count
    }));

    setDK64Cats(getCategoriesForLevel(level as LevelName));
    setDK64Barrels(getBarrelsForLevel(level as LevelName));
    setItems(items);
  }, [level, selectedDK64Cats, selectedDK64Barrels, hellMode]);

  useEffect(() => {
    if (currentGame === "DKB" && bananas.length > 0) {
      setGoLabel(`Get ${config.count}/${config.dkbTotal}`);
      setOptions({
        ...config,
        bananas,
        items: []
      });
    }
    if (currentGame === "DK64" && items.length > 0) {
      setGoLabel(`Get ${config.count}/${config.dk64Total}`);
      setOptions({
        ...config,
        items,
        bananas: []
      });
    }
  }, [currentGame, bananas, items, config, setGoLabel, setOptions]);

  return (
    <Grid container spacing={1}>
      <Grid size={2} />

      <Grid size={4}>
        <Box sx={{ margin: "10px" }}>
          {currentGame === "DKB" && (
            <DKSelect
              label="Layer"
              value={layer}
              handleChange={setLayer}
              selectItems={Object.values(LayerName)}
            />
          )}

          {currentGame === "DK64" && (
            <DKSelect
              label="Level"
              value={level}
              handleChange={setLevel}
              selectItems={Object.values(LevelName)}
            />
          )}

          {currentGame === "DKB" && (
            <DKMultiSelect
              label="Categories"
              values={selectedDKBCats}
              handleChange={setSelectedDKBCats}
              selectItems={dkbCats}
            />
          )}

          {currentGame === "DK64" && (
            <>
              <DKMultiSelect
                mini={true}
                label="Categories"
                values={selectedDK64Cats}
                handleChange={setSelectedDK64Cats}
                selectItems={dk64Cats}
              />
              <DKMultiSelect
                mini={true}
                label="Barrels"
                values={selectedDK64Barrels}
                handleChange={setSelectedDK64Barrels}
                selectItems={dk64Barrels}
              />
            </>
          )}

          <DKSelect
            mini={true}
            label="Shown"
            value={String(config.count)}
            handleChange={(val) => setConfig({ ...config, count: Number(val) })}
            selectItems={getCountRange()}
          />

          {currentGame === "DKB" && (
            <DKSelect
              mini={true}
              label="Total"
              value={String(config.dkbTotal)}
              handleChange={(val) =>
                setConfig({ ...config, dkbTotal: Number(val) })
              }
              selectItems={getTotalRange()}
            />
          )}
          {currentGame === "DK64" && (
            <DKSelect
              mini={true}
              label="Total"
              value={String(config.dk64Total)}
              handleChange={(val) =>
                setConfig({ ...config, dk64Total: Number(val) })
              }
              selectItems={getTotalRange()}
            />
          )}

          <DKTextBox
            label="Seed"
            value={config.seed}
            handleChange={(val) => setConfig({ ...config, seed: String(val) })}
          />
        </Box>
      </Grid>

      <Grid size={5}>
        <Box sx={{ margin: "10px" }}>
          <DKCheckbox
            label="Timer"
            checked={config.timer}
            handleChange={(val) =>
              setConfig({ ...config, timer: Boolean(val) })
            }
          />

          <DKCheckbox
            label="Auto-refresh"
            checked={config.autoRefresh}
            handleChange={(val) =>
              setConfig({ ...config, autoRefresh: Boolean(val) })
            }
            helpText={`Continuously adds new goals until you run out (currently ${currentGame === "DKB" ? bananas.length : items.length}).`}
          />

          {currentGame === "DKB" && config.autoRefresh && (
            <DKCheckbox
              label="Recycle wrong bananas"
              checked={config.recycle}
              handleChange={(val) =>
                setConfig({ ...config, recycle: Boolean(val) })
              }
              helpText="Adds a wrong-marked banana back to the pool so that the correct one can be obtained later."
            />
          )}

          {currentGame === "DK64" && (
            <DKCheckbox
              label="Use Kong colors"
              checked={config.useKongColors}
              handleChange={(val) =>
                setConfig({ ...config, useKongColors: Boolean(val) })
              }
              helpText="Shows Kong colors instead of their names."
            />
          )}

          {currentGame === "DKB" && (
            <DKCheckbox
              label="Include Postgame"
              checked={includePostgame}
              handleChange={setIncludePostgame}
              helpText="Adds all bananas that only appear after defeating K. Rool."
            />
          )}

          <DKCheckbox
            label="Hell Mode"
            checked={hellMode}
            handleChange={setHellMode}
            helpText={getHellModeTooltip()}
          />
        </Box>
      </Grid>

      <Grid size={1} />
    </Grid>
  );
};
