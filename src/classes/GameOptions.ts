import type { DK64Item } from "./DK64Item";
import type { DKBBanana } from "./DKBBanana";

export class GameOptions {
  constructor(
    public readonly count: number,
    public readonly total: number,
    public readonly seed: string,
    public readonly timer: boolean,
    public readonly collectables: (DK64Item | DKBBanana)[]
  ) {}
}
