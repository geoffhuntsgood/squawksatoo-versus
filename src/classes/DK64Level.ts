import type { LevelName } from "../enums";
import type { DK64Item } from "./DK64Item";

export class DK64Level {
  constructor(
    public readonly name: LevelName,
    public readonly items: DK64Item[]
  ) {}
}
