import { Vector2 } from "../classes/Vector2";

const getTargetSize = (
  originalRatio: number, 
  containerRatio: number,
  containerSize: Vector2,
): Vector2 => {
  const test = originalRatio > containerRatio;

  if (test) {
    return {
      x: containerSize.x,
      y: containerSize.x / originalRatio,
    };
  }

  return {
    x: containerSize.y * originalRatio,
    y: containerSize.y
  };
};

type Params = {
  containerSize: Vector2;
  size: Vector2;
}

export const getObjectFitSize = ({ size, containerSize }: Params): Vector2 => {
  const originalRatio = size.x / size.y;
  const containerRatio = containerSize.x / containerSize.y;
  const targetSize = getTargetSize(originalRatio, containerRatio, containerSize);

  return {
    x: targetSize.x,
    y: targetSize.y,
  };
};
