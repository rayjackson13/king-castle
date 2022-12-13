import './styles.css';

import { CanvasInfo, createCanvas } from "./createCanvas";
import { ILevel } from './interfaces/ILevel';
import { LevelName, Levels } from './levels';
import { Screen } from './settings';
import AppSettings from './app.json';
import { Title } from './levels/Title';
import { Controls } from './classes/Controls';
import { Credits } from './levels/Credits';

export class Game {
  private static canvasInfo: CanvasInfo;
  private static level: ILevel;
  private static lastRender = 0;

  /**
   * Initial game logic setup
   */
  static setup = () => {
    this.canvasInfo = createCanvas();
    Controls.init();
    const { context } = this.canvasInfo;
    context.imageSmoothingEnabled = false;
    this.level = new Credits({
      loadLevel: this.loadNextLevel,
      canvasInfo: this.canvasInfo,
    });
    this.level.reset();
    window.requestAnimationFrame(Game.loop);
  };

  static loadNextLevel = (name: LevelName) => {
    this.level = new Levels[name]({
      loadLevel: this.loadNextLevel,
      canvasInfo: this.canvasInfo,
    });
    this.level.reset();
  };

  /**
   * Updates game logic
   */
  private static update = (deltaTime: number) => {
    Controls.update();
    this.level.update(deltaTime);

    if (Controls.buttons.menu.press && this.level.name !== LevelName.Title) {
      this.loadNextLevel(LevelName.Title);
    }
  };

  /**
   * Draws frame based on updated logic.
   */
  private static draw = (deltaTime: number) => {
    const { context } = this.canvasInfo;
    this.level.draw(context);

    context.fillStyle = 'white';
    const fps = Math.round(1000 / deltaTime);
    context.font = '16px "Press Start 2P"';
    context.textBaseline = 'top';
    context.textAlign = 'left';
    context.fillText(`${fps} FPS`, 5, 5);

    context.textAlign = 'right';
    context.fillText(`v${AppSettings.version}`, Screen.Width - 5, 5);
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
    this.draw(deltaTime);
    // this.drawDebug();

    this.lastRender = timestamp;

    window.requestAnimationFrame(this.loop);
  };
}
