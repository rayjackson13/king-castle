import { Sprite, SpriteParams } from "./Sprite";

type BackgroundParams = Omit<SpriteParams, 'position'>

export class Background extends Sprite {
  constructor({ ...params }: BackgroundParams) {
    super({
      position: { x: 0, y: 0 },
      ...params
    });
  }
}
