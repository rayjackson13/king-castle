import { ILevel, LevelParams } from "../interfaces/ILevel";
import { Level1 } from "./Level1";
import { Level2 } from "./Level2";

export type LevelsDictionary = { 
  [x: string]: new (levelParams: LevelParams) => ILevel
};

export const enum LevelName {
  Level1 = 'level1',
  Level2 = 'level2',
}

export const Levels: LevelsDictionary = {
  [LevelName.Level1]: Level1,
  [LevelName.Level2]: Level2,
};
