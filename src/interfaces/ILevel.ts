import type { LevelName } from "../levels";

export type LevelParams = {
  loadLevel: (name: LevelName) => void;
}

export interface ILevel {
  reset(): void;
  resetElements(): void;
  update(deltaTime: number): void;
  draw(context: CanvasRenderingContext2D): void;
  drawDebug(context: CanvasRenderingContext2D): void;
  onComplete(): void;
}
