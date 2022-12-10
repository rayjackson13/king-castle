import { ILevel, LevelParams } from "../interfaces/ILevel";
import { Level1 } from "./Level1";
import { Level2 } from "./Level2";
import { Level3 } from "./Level3";

export type LevelsDictionary = { 
  [x: string]: new (levelParams: LevelParams) => ILevel
};

export const enum LevelName {
  Level1 = 'level1',
  Level2 = 'level2',
  Level3 = 'level3',
}

export const Levels: LevelsDictionary = {
  [LevelName.Level1]: Level1,
  [LevelName.Level2]: Level2,
  [LevelName.Level3]: Level3
};
