import type { DKBCategory } from "../enums";

export class DKBBanana {
  constructor(
    public readonly num: number,
    public readonly name: string,
    public readonly category: DKBCategory,
    public readonly category2?: DKBCategory,
    public readonly isPostgame?: boolean,
    public readonly hellMode?: boolean
  ) {}
}
