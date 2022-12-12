export const isFullScreenAvailable = (canvas: HTMLCanvasElement) => {
  return !!canvas.requestFullscreen;
}; 
