import { Sprite, SpriteParams } from "../Sprite";
import { Vector2 } from "../Vector2";

type TouchButtonParams = SpriteParams & {
  offset: Vector2;
  size: Vector2;
}

export class TouchButton extends Sprite {
  offset: Vector2;
  fixedSize: Vector2;
  isPressed = false;

  constructor({ offset, size, ...rest }: TouchButtonParams) {
    super(rest);
    this.offset = offset;
    this.fixedSize = size;
  }

  onMouseDown = (position: Vector2) => {
    if (
      position.x > this.position.x
      && position.x < this.position.x + this.fixedSize.x
      && position.y > this.position.y
      && position.y < this.position.y + this.fixedSize.y
    ) {
      this.isPressed = true;
    }
  };

  onMouseUp = () => {
    this.isPressed = false;
  };

  draw(context: CanvasRenderingContext2D) {
    if (!this.isLoaded) {
      return;
    }
    
    const { x, y } = this.position;
    const cropbox = {
      position: {
        x: this.offset.x,
        y: this.offset.y,
      },
      width: this.fixedSize.x,
      height: this.fixedSize.y,
    };
    context.drawImage(
      this.image,
      cropbox.position.x, cropbox.position.y, cropbox.width, cropbox.height,
      x, this.isPressed ? y + 4 : y, this.fixedSize.x, this.fixedSize.y
    );
  }
}
