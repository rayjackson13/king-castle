import { ILevel, LevelParams } from "../interfaces/ILevel";
import { Credits } from "./Credits";
import { Level1 } from "./Level1";
import { Level2 } from "./Level2";
import { Level3 } from "./Level3";
import { Title } from "./Title";

export type LevelsDictionary = { 
  [x: string]: new (levelParams: LevelParams) => ILevel
};

export const enum LevelName {
  Title = 'Title',
  Level1 = 'level1',
  Level2 = 'level2',
  Level3 = 'level3',
  Credits = 'Credits'
}

export const Levels: LevelsDictionary = {
  [LevelName.Title]: Title,
  [LevelName.Level1]: Level1,
  [LevelName.Level2]: Level2,
  [LevelName.Level3]: Level3,
  [LevelName.Credits]: Credits,
};
