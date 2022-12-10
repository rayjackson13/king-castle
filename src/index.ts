import './styles.css';

import { CanvasInfo, createCanvas } from "./createCanvas";
import { ILevel } from './interfaces/ILevel';
import { LevelName, Levels } from './levels';

class Game {
  private static canvasInfo: CanvasInfo;
  private static level: ILevel;
  private static lastRender = 0;

  /**
   * Initial game logic setup
   */
  static setup = () => {
    this.canvasInfo = createCanvas();
    const { context } = this.canvasInfo;
    context.imageSmoothingEnabled = false;
    this.level = new Levels[LevelName.Level1]({
      loadLevel: this.loadNextLevel,
    });
    this.level.reset();
  };

  static loadNextLevel = (name: LevelName) => {
    this.level = new Levels[name]({
      loadLevel: this.loadNextLevel,
    });
    this.level.reset();
  };

  /**
   * Updates game logic
   */
  private static update = (deltaTime: number) => {
    this.level.update(deltaTime);
  };

  /**
   * Draws frame based on updated logic.
   */
  private static draw = () => {
    const { context } = this.canvasInfo;
    this.level.draw(context);
  };

  /**
   * Debug draw layer
   */
  private static drawDebug = () => {
    const { context } = this.canvasInfo;
    this.level.drawDebug(context);
  };

  /**
   * Main game cycle.
   */
  static loop = (timestamp: number) => {
    // The progress value, or time between renders is crucial for creating smooth animations.
    // By using it to adjust the x and y positions in our update function, we ensure that
    // the animations move at a consistent speed.
    const deltaTime = timestamp - this.lastRender;

    this.update(deltaTime);
    this.draw();
    // this.drawDebug();

    this.lastRender = timestamp;

    window.requestAnimationFrame(this.loop);
  };
}

Game.setup();
window.requestAnimationFrame(Game.loop);
