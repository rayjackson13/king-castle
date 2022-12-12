import { isFullScreenAvailable } from "./isFullScreenAvailable";

export const toggleFullScreen = (canvas: HTMLCanvasElement, isOpen: boolean) => {
  try {
    if (!isFullScreenAvailable(canvas)) return;

    setTimeout(() => {
      if (!isOpen) {
        canvas.requestFullscreen();
        return;
      }
      
      document.exitFullscreen();
    }, 100);
  } catch (e) {
    // Ignore for now.
  }
};
