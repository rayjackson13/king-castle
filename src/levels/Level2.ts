import { Player } from "../classes/Player";
import { PlayerAnimations, PlayerAnimationTitle } from '../data/playerAnimations';

import BackgroundImage from '../assets/img/backgroundLevel2.png';
import { Checkpoint } from '../classes/Checkpoint';
import { Background } from '../classes/Background';
import { LevelName } from "./index";
import { Level } from "../classes/Level";
import { CollisionSystem } from "../classes/CollisionSystem";
import { Collisions } from "../data/collisions";

export class Level2 extends Level {
  name = LevelName.Level2;
  nextLevel = LevelName.Level3;

  reset = () => {
    CollisionSystem.init(Collisions[LevelName.Level2]);
    this.resetElements();

    this.background = new Background({
      sourceURI: BackgroundImage
    });

    this.player = new Player({
      position: { x: 1 * 64, y: 100 },
      size: { x: 25, y: 25 },
      animations: PlayerAnimations,
      animationName: PlayerAnimationTitle.IdleLeft,
    });

    this.door = new Checkpoint({
      position: { x: 772, y: 335 },
      onLevelPassed: this.onComplete,
    });
  };
}
