import { Screen } from "./settings";
// import { getObjectFitSize } from "./utils/getObjectFitSize";

export type CanvasInfo = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
};

/**
 * Scales the canvas to fit the screen without any blurriness.
 */
// const fitScreen = ({ canvas, context }: CanvasInfo) => {
//   const fitSize = getObjectFitSize({
//     size: { x: Screen.Width, y: Screen.Height },
//     containerSize: { x: document.body.clientWidth, y: document.body.clientHeight }
//   });
//   const dpr = window.devicePixelRatio || 1;
//   canvas.width = fitSize.x * dpr;
//   canvas.height = fitSize.y * dpr;
//   const ratio = Math.min(
//     document.body.clientWidth / Screen.Width,
//     document.body.clientHeight / Screen.Height
//   );
//   context.scale(ratio, ratio);
// };

export const createCanvas = () => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  document.body.appendChild(canvas);

  canvas.width = Screen.Width;
  canvas.height = Screen.Height;
  const canvasInfo =  { canvas, context };
  // fitScreen(canvasInfo);
  return canvasInfo;
};
