import { Player } from "../classes/Player";
import { PlayerAnimations, PlayerAnimationTitle } from '../data/playerAnimations';

import BackgroundImage from '../assets/img/backgroundLevel1.png';
import { Checkpoint } from '../classes/Checkpoint';
import { Background } from '../classes/Background';
import { Level } from "../classes/Level";
import { LevelName } from ".";
import { CollisionSystem } from "../classes/CollisionSystem";
import { Collisions } from "../data/collisions";

export class Level1 extends Level {
  nextLevel = LevelName.Level2;

  reset = () => {
    this.resetElements();
    CollisionSystem.init(Collisions[LevelName.Level1]);

    this.background = new Background({
      sourceURI: BackgroundImage
    });

    this.player = new Player({
      position: { x: 200, y: 250 },
      size: { x: 25, y: 25 },
      animations: PlayerAnimations,
      animationName: PlayerAnimationTitle.IdleRight,
    });

    this.door = new Checkpoint({
      position: { x: 12 * 64, y: 270 },
      onLevelPassed: this.onComplete,
    });
  };
}
