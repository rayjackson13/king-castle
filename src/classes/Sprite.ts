import { Vector2 } from "./Vector2";

export type SpriteParams = {
  position: Vector2;
  sourceURI: string;
};

export class Sprite {
  position: Vector2;
  size: Vector2 = { x: 0, y: 0 };
  image: HTMLImageElement = null;
  isLoaded = false;

  constructor({ position, sourceURI }: SpriteParams) {
    this.position = position;
    this.image = this.createImage(sourceURI);
  }

  onImageLoaded = () => {
    this.isLoaded = true;
    this.size.x = this.image.width;
    this.size.y = this.image.height;
  };

  createImage = (uri: string) => {
    const image = new Image();
    image.src = uri;
    image.onload = this.onImageLoaded;
    return image;
  };

  draw(context: CanvasRenderingContext2D) {
    if (!this.isLoaded) {
      return;
    }
    
    const { x, y } = this.position;
    context.drawImage(this.image, x, y);
  }
}
