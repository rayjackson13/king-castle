import './styles.css';

import { CanvasInfo, createCanvas } from "./createCanvas";
import { ILevel } from './interfaces/ILevel';
import { LevelName, Levels } from './levels';
import { Screen } from './settings';
import AppSettings from './app.json';
import { GamepadSupport } from './classes/Controls/GamepadSupport';

export class Game {
  private static canvasInfo: CanvasInfo;
  private static level: ILevel;
  private static lastRender = 0;

  /**
   * Initial game logic setup
   */
  static setup = () => {
    this.canvasInfo = createCanvas();
    this.createFullScreenButton();
    GamepadSupport.init();
    const { context } = this.canvasInfo;
    context.imageSmoothingEnabled = false;
    this.level = new Levels[LevelName.Level1]({
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
    GamepadSupport.update();
    this.level.update(deltaTime);
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

  static createFullScreenButton = () => {
    const { canvas } = this.canvasInfo;
    canvas.requestFullscreen = undefined;
    if (!canvas.requestFullscreen) return;

    const button = document.createElement('button');
    button.textContent = 'Open full screen';
    button.style.marginTop = '40px';
    button.onclick = this.openFullScreen;
    document.body.appendChild(button);
  };

  static openFullScreen = () => {
    const { canvas } = this.canvasInfo;
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
      return;
    }

    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    if (canvas.webkitRequestFullscreen) {
      // @ts-ignore
      canvas.webkitRequestFullscreen();
    }
  };
}
