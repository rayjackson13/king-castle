import { Sprite } from '../classes/Sprite';
import { CanvasInfo } from '../createCanvas';
import { ILevel, LevelParams } from '../interfaces/ILevel';
import { Screen } from '../settings';
import BackgroundImage from '../assets/img/title.png';
import { LevelName } from './index';
import { Controls } from '../classes/Controls';

export class Credits implements ILevel {
  name = LevelName.Credits;
  loadLevel: LevelParams['loadLevel'];
  canvasInfo: CanvasInfo;
  background: Sprite;

  constructor({ loadLevel, canvasInfo }: LevelParams) {
    this.loadLevel = loadLevel;
    this.canvasInfo = canvasInfo;
  }

  resetElements = (): void => {};

  reset = () => {
    this.background = new Sprite({ 
      position: { x: 0, y: 0 }, 
      sourceURI: BackgroundImage,
    });
  };

  onComplete = () => {};

  update = () => {
    if (Controls.buttons.jump.press) {
      this.loadLevel(LevelName.Title);
    }
  };

  drawBackground = (ctx: CanvasRenderingContext2D) => {
    this.background.draw(ctx);
    ctx.fillStyle = 'rgba(0, 0, 0, .85)';
    ctx.fillRect(0, 0, Screen.Width, Screen.Height);
  };

  drawTitle = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '24px "Press Start 2P"';
    ctx.fillText('KING IN THE CASTLE', Screen.Width / 2, Screen.Height / 5);
  };

  drawDescription = (ctx: CanvasRenderingContext2D) => {
    const textArray = [
      'An interactive proof of concept made by Ray 7ackson.',
      'Features used: HTML5 Canvas & Typescript. Nothing extra.',
      '',
      'Huge thanks to Chris Courses at youtube.com/@ChrisCourses',
      'for the inspiration and the knowledge. This is my take',
      'on one of their projects, a Multi-room platformer game.',
      'It was designed to be a solid base for my future projects.',
      '',
      'The code is open-source and available for everyone',
      'at https://github.com/rayjackson13/king-castle/',
      '',
      '(press Space | A Button to go back)',
    ];
    ctx.fillStyle = '#c4c4c4';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '14px "Press Start 2P"';
    
    textArray.forEach((line, index) => {
      ctx.fillText(line, Screen.Width / 2, Screen.Height / 5 + 64 + 24 * index);
    });
  };

  draw = (ctx: CanvasRenderingContext2D) => {
    this.drawBackground(ctx);
    this.drawTitle(ctx);
    this.drawDescription(ctx);
  };

  drawDebug = () => {};
}
