export class Vector2 {
  x: number;
  y: number;

  static add = (v1: Vector2, v2: Vector2) => ({
    x: v1.x + v2.x,
    y: v1.y + v2.y,
  });

  static multiplyByNumber = (v: Vector2, n: number) => ({
    x: v.x * n,
    y: v.y * n,
  });
}
