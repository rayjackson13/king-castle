import { Screen } from "./settings";
import { getObjectFitSize } from "./utils/getObjectFitSize";

export type CanvasInfo = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
};

/**
 * Scales the canvas to fit the screen without any blurriness.
 */
const fitScreen = ({ canvas, context }: CanvasInfo) => {
  const {
    width: containerWidth,
    height: containerHeight,
  } = document.body.getBoundingClientRect();
  if (containerWidth >= Screen.Width && containerHeight >= Screen.Height) {
    return;
  }

  const fitSize = getObjectFitSize({
    size: { x: Screen.Width, y: Screen.Height },
    containerSize: { x: containerWidth, y: containerHeight }
  });
  canvas.width = fitSize.x;
  canvas.height = fitSize.y;
  const ratio = Math.min(
    containerWidth / Screen.Width,
    containerHeight / Screen.Height
  );
  context.scale(ratio, ratio);
};

export const createCanvas = () => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  document.body.appendChild(canvas);

  canvas.width = Screen.Width;
  canvas.height = Screen.Height;
  const canvasInfo =  { canvas, context };
  fitScreen(canvasInfo);
  return canvasInfo;
};
