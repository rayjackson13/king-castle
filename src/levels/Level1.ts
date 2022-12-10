import { CanvasInfo, createCanvas } from "../createCanvas";
import { Player } from "../classes/Player";
import { Controls } from '../classes/Contols';
import { Collisions } from '../data/collisions';
import { CollisionSystem } from '../classes/CollisionSystem';
import { PlayerAnimations, PlayerAnimationTitle } from '../data/playerAnimations';

import BackgroundImage from '../assets/img/backgroundLevel1.png';
import { DoorAnimations, DoorAnimationTitle } from '../data/doorAnimations';
import { Checkpoint } from '../classes/Checkpoint';
import { Background } from '../classes/Background';
import { OpacityTransition } from '../classes/OpacityTransition';
import { wait } from '../utils/wait';
import type { ILevel, LevelParams } from "../interfaces/ILevel";
import { LevelName } from "./index";

export class Level1 implements ILevel {
  canvasInfo: CanvasInfo;
  lastRender = 0;
  player: Player;
  background: Background;
  collisionSystem: CollisionSystem;
  door: Checkpoint;
  bgOpacityTransition: OpacityTransition;
  screenOpacityTransition: OpacityTransition;
  isLevelFinished = false;
  loadLevel: LevelParams['loadLevel'];

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
    this.loadLevel(LevelName.Level2);
  };

  /**
   * Initial game logic setup
   */
  setup = () => {
    this.canvasInfo = createCanvas();
    const { context } = this.canvasInfo;
    context.imageSmoothingEnabled = false;
    this.reset();
  };

  reset = () => {
    Controls.init();
    CollisionSystem.init(Collisions.Level1);

    this.background = new Background({
      sourceURI: BackgroundImage
    });

    this.player = new Player({
      position: { x: 200, y: 200 },
      size: { x: 25, y: 25 },
      animations: PlayerAnimations,
      animationName: PlayerAnimationTitle.IdleRight,
    });

    this.door = new Checkpoint({
      position: { x: 12 * 64, y: 270 },
      animations: DoorAnimations,
      animationName: DoorAnimationTitle.OpenDoor,
      autoplay: false,
      onLevelPassed: this.onComplete,
    });

    this.bgOpacityTransition = new OpacityTransition();
    this.screenOpacityTransition = new OpacityTransition();

    this.isLevelFinished = false;
    this.screenOpacityTransition.fadeIn();
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
