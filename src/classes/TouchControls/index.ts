import { CanvasInfo } from './../../createCanvas';
import { TouchButton } from './TouchButton';
import ButtonSheet from '../../assets/img/buttons.png';
import { Vector2 } from '../Vector2';
import { Screen } from '../../settings';

type Button = {
  position: Vector2;
  offset: Vector2;
}

const buttonSize = { x: 64, y: 64 };
const controls: Button[] = [
  {
    position: { x: 64 * 2, y: Screen.Height - buttonSize.y - 64 / 2 },
    offset: { x: 0, y: 0 },
  },
  {
    position: { x: 64 * 3.5, y: Screen.Height - buttonSize.y - 64 / 2 },
    offset: { x: 0, y: 64 },
  },
  {
    position: { x: Screen.Width - 64 * 3, y: Screen.Height - buttonSize.y - 64 / 2 },
    offset: { x: 0, y: 64 * 2 },
  },
];

export class TouchControls {
  static buttons: TouchButton[];
  private static scale: number;

  static init({ canvas }: CanvasInfo) {
    this.buttons = [];
    controls.forEach(({ position, offset }) => {
      this.buttons.push(
        new TouchButton({
          position,
          offset,
          sourceURI: ButtonSheet,
          size: buttonSize,
        })
      );
    });

    this.scale = canvas.clientWidth / Screen.Width;
    canvas.addEventListener('mousedown', this.onMouseDown);
    canvas.addEventListener('mouseup', this.onMouseUp);
  }

  static onMouseDown = ({ offsetX, offsetY }: MouseEvent) => {
    const position = {
      x: offsetX / this.scale,
      y: offsetY / this.scale
    };

    this.buttons.forEach(button => {
      button.onMouseDown(position);
    });
  };

  static onMouseUp = ({ offsetX, offsetY }: MouseEvent) => {
    this.buttons.forEach(button => {
      button.onMouseUp();
    });
  };

  static draw(context: CanvasRenderingContext2D) {
    this.buttons.forEach(button => {
      button.draw(context);
    });
  }
}
