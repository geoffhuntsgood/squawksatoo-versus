import type { DK64Item, DKBBanana } from "../classes";

export type GameType = "DKB" | "DK64";

export type LastGot = {
  item: DK64Item | DKBBanana;
  index: number;
  playerId: string;
};
