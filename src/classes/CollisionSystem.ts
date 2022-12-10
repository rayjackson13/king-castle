import { TileSize } from "../settings";
import { CollisionBlock } from "./CollisionBlock";

export type LevelCollisions = {
  data: number[];
  width: number;
  height: number;
};

export class CollisionSystem {
  static collisions: CollisionBlock[] = [];

  static init = ({ data, width, height }: LevelCollisions) => {
    this.collisions = [];
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (data[i * width + j] === 0) continue;
        this.collisions.push(new CollisionBlock({ x: j * TileSize, y: i * TileSize }));
      }
    }
  };

  static drawDebug = (context: CanvasRenderingContext2D) => {
    this.collisions.forEach(block => {
      block.draw(context);
    });
  };
}
