import { TileSize } from "../settings";
import { Vector2 } from "./Vector2";

export class CollisionBlock {
  position: Vector2;
  size: Vector2 = { x: TileSize, y: TileSize };

  constructor(position:Vector2) {
    this.position = position;
  }

  draw = (context: CanvasRenderingContext2D) => {
    const { x, y } = this.position;
    context.fillStyle = 'rgba(255, 0, 0, 0.5)';
    context.fillRect(x, y, this.size.x, this.size.y);
  };
}
