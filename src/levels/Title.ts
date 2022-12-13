import { Sprite } from '../classes/Sprite';
import { CanvasInfo } from '../createCanvas';
import { ILevel, LevelParams } from '../interfaces/ILevel';
import { Screen } from '../settings';
import BackgroundImage from '../assets/img/title.png';
import { LevelName } from '.';
import { Vector2 } from '../classes/Vector2';
import { Controls } from '../classes/Controls';
import { toggleFullScreen } from '../utils/toggleFullScreen';
import { isFullScreenAvailable } from '../utils/isFullScreenAvailable';

type Option = {
  title: string;
  onPress: () => void;
}

export class Title implements ILevel {
  name = LevelName.Title;
  loadLevel: LevelParams['loadLevel'];
  canvasInfo: CanvasInfo;
  background: Sprite;
  frameBuffer = 10;
  elapsedFrames = 0;
  pointerOffset = 0;
  maxPointerOffset = 8;
  isFullscreen = false;
  titleOptions: Option[] = [];
  selectedIndex = 0;

  constructor({ loadLevel, canvasInfo }: LevelParams) {
    this.loadLevel = loadLevel;
    this.canvasInfo = canvasInfo;
  }

  setOptions = () => {
    this.titleOptions = [
      {
        title: 'New Game',
        onPress: () => this.loadLevel(LevelName.Level1),
      },
      isFullScreenAvailable(this.canvasInfo.canvas) && { 
        title: `Full Screen: ${this.isFullscreen ? 'On' : 'Off'}`,
        onPress: () => {
          toggleFullScreen(this.canvasInfo.canvas, this.isFullscreen),
          this.isFullscreen = !this.isFullscreen;
        }
      },
      { 
        title: `Controller: ${Controls.isControllerConnected ? '' : 'Not '}Connected`,
        onPress: () => {
          if (Controls.isControllerConnected) return;

          alert('Connect the controller and press any button...');
        },
      },
      {
        title: 'Credits',
        onPress: () => {
          this.loadLevel(LevelName.Credits);
        },
      }
    ];
  };

  resetElements = (): void => {};

  reset = () => {
    this.setOptions();
    this.background = new Sprite({ 
      position: { x: 0, y: 0 }, 
      sourceURI: BackgroundImage,
    });
  };

  onComplete = () => {};

  updateFrames = (deltaTime: number) => {
    this.elapsedFrames++;

    const fps = 1000 / deltaTime;
    const fb = Math.round(this.frameBuffer * (fps / 60));
    if (this.elapsedFrames % fb === 0) {
      this.pointerOffset = (this.pointerOffset + 1) % this.maxPointerOffset;
    }
  };

  update = (deltaTime: number) => {
    this.setOptions();
    this.updateFrames(deltaTime);

    const { length: optionsLength } = this.titleOptions;
    const { up, down, enter } = Controls.buttons;
    
    if (down.press) {
      this.selectedIndex = (++this.selectedIndex) % optionsLength;
    }

    if (up.press) {
      this.selectedIndex = (--this.selectedIndex + optionsLength) % optionsLength;
    }

    if (enter.press) {
      this.titleOptions[this.selectedIndex].onPress();
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
    ctx.fillText('KING IN THE CASTLE', Screen.Width / 2, Screen.Height / 3);
  };

  drawOptions = (ctx: CanvasRenderingContext2D) => {
    this.titleOptions.forEach((item, index) => {
      const isSelected = this.selectedIndex === index;
      ctx.fillStyle = isSelected ? 'orange' : 'white';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.font = '16px "Press Start 2P"';
      const yOffset = 40 * index;
      const pos: Vector2 = {
        x: 64 * 1.5,
        y: 64 * 5 + yOffset
      };

      if (isSelected) {
        const pointerOffset = Math.abs(this.pointerOffset - 4);
        ctx.fillText('>', 64 + pointerOffset * 2, pos.y);
      }

      ctx.fillText(item.title, pos.x, pos.y);
    });
  };

  draw = (ctx: CanvasRenderingContext2D) => {
    this.drawBackground(ctx);
    this.drawTitle(ctx);
    this.drawOptions(ctx);
  };

  drawDebug = () => {};
}
