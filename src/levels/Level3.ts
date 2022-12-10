import { Player } from "../classes/Player";
import { PlayerAnimations, PlayerAnimationTitle } from '../data/playerAnimations';

import BackgroundImage from '../assets/img/backgroundLevel3.png';
import { Checkpoint } from '../classes/Checkpoint';
import { Background } from '../classes/Background';
import { LevelName } from "./index";
import { Level } from "../classes/Level";
import { CollisionSystem } from "../classes/CollisionSystem";
import { Collisions } from "../data/collisions";

export class Level3 extends Level {
  nextLevel = LevelName.Level1;

  reset = () => {
    this.resetElements();
    CollisionSystem.init(Collisions[LevelName.Level3]);

    this.background = new Background({
      sourceURI: BackgroundImage
    });

    this.player = new Player({
      position: { x: 12 * 64, y: 200 },
      size: { x: 25, y: 25 },
      animations: PlayerAnimations,
      animationName: PlayerAnimationTitle.IdleLeft,
    });

    this.door = new Checkpoint({
      position: { x: 176, y: 335 },
      onLevelPassed: this.onComplete,
    });
  };
}
