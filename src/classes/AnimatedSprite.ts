import { Sprite, SpriteParams } from "./Sprite";
import { Vector2 } from "./Vector2";

export type AnimatedSpriteParams = Omit<SpriteParams, 'sourceURI'> & {
  autoplay?: boolean;
  animations: AnimationList;
  animationName: string;
}

export type AnimationParams = {
  frameCount: number;
  frameBuffer: number;
  loop: boolean;
  sourceURI: string;
  image?: HTMLImageElement;
}

export type AnimationList = { [x: string]: AnimationParams }

export class AnimatedSprite extends Sprite {
  frameCount: number;
  size: Vector2 = { x: 0, y: 0 };
  image: HTMLImageElement = null;
  isLoaded = false;
  currentFrame = 0;
  elapsedFrames = 0;
  frameBuffer = 2;
  animations: AnimationList;
  loop: boolean;
  autoplay: boolean;

  constructor({ position, animations, animationName, autoplay = true }: AnimatedSpriteParams) {
    super({ position, sourceURI: animations[animationName].sourceURI });
    this.animations = animations;
    this.autoplay = autoplay;
    this.setAnimationDetails(animationName);

    for (const key in this.animations) {
      const image = this.createImage(animations[key].sourceURI);
      this.animations[key].image = image;
    }
    this.image = this.animations[animationName].image;
  }

  setAnimationDetails = (initialAnimation: string) => {
    const animation = this.animations[initialAnimation];
    if (!animation) {
      return;
    }

    this.frameCount = animation.frameCount;
    this.frameBuffer = animation.frameBuffer;
    this.loop = animation.loop;
  };

  onImageLoaded = () => {
    this.isLoaded = true;
    this.size.x = this.image.width / this.frameCount;
    this.size.y = this.image.height;
  };

  draw(context: CanvasRenderingContext2D) {
    if (!this.isLoaded) {
      return;
    }
    
    const { x, y } = this.position;
    const cropbox = {
      position: {
        x: this.size.x * this.currentFrame,
        y: 0,
      },
      width: this.size.x,
      height: this.size.y,
    };
    context.drawImage(
      this.image,
      cropbox.position.x, cropbox.position.y, cropbox.width, cropbox.height,
      x, y, this.size.x, this.size.y
    );


    this.updateFrames();
  }

  play = () => {
    this.autoplay = true;
  };

  updateFrames() {
    if (!this.autoplay) return;

    this.elapsedFrames++;

    if (this.elapsedFrames % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameCount - 1) this.currentFrame++;
      else if (this.loop) this.currentFrame = 0;
    }
  }
}
