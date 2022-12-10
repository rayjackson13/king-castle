import { Player } from "../classes/Player";
import { CollisionSystem } from '../classes/CollisionSystem';

import { Checkpoint } from '../classes/Checkpoint';
import { Background } from '../classes/Background';
import { OpacityTransition } from '../classes/OpacityTransition';
import { wait } from '../utils/wait';
import type { ILevel, LevelParams } from "../interfaces/ILevel";
import { LevelName } from "../levels";
import { Controls } from "./Contols";

export class Level implements ILevel {
  player: Player;
  background: Background;
  collisionSystem: CollisionSystem;
  door: Checkpoint;
  bgOpacityTransition: OpacityTransition;
  screenOpacityTransition: OpacityTransition;
  isLevelFinished = false;
  loadLevel: LevelParams['loadLevel'];
  nextLevel: LevelName;

  constructor({ loadLevel }: LevelParams) {
    this.loadLevel = loadLevel;
  }

  onComplete = async () => {
    if (this.isLevelFinished) return;

    this.isLevelFinished = true;
    this.player.isControllable = false;
    this.bgOpacityTransition.fadeOut();
    this.player.enterDoorTransition(this.door);
    await wait(1500);
    this.screenOpacityTransition.fadeOut();
    await wait(1000);
    this.loadLevel(this.nextLevel);
  };

  resetElements = () => {
    Controls.init();

    this.bgOpacityTransition = new OpacityTransition();
    this.screenOpacityTransition = new OpacityTransition();

    this.isLevelFinished = false;
    this.screenOpacityTransition.fadeIn();
  };

  reset = () => {
    this.resetElements();
  };

  /**
   * Updates game logic
   */
  update = (deltaTime: number) => {
    this.bgOpacityTransition.update(deltaTime);
    this.player.update(deltaTime);
    this.door.update(this.player.hitbox);
    this.screenOpacityTransition.update(deltaTime);
  };

  /**
   * Draws frame based on updated logic.
   */
  draw = (context: CanvasRenderingContext2D) => {
    this.background.draw(context);
    this.bgOpacityTransition.draw(context);
    this.door.draw(context);
    this.player.draw(context);
    this.screenOpacityTransition.draw(context);
  };

  /**
   * Debug draw layer
   */
  drawDebug = (context: CanvasRenderingContext2D) => {
    this.player.drawDebug(context);
    CollisionSystem.drawDebug(context);
  };
}
