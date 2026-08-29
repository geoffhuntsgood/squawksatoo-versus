import type { DK64Category, DK64Barrel } from "../enums";

export class DK64Item {
  constructor(
    public readonly name: string,
    public readonly category: DK64Category,
    public readonly subCategory?: DK64Barrel,
    public readonly hellMode?: boolean
  ) {}
}
