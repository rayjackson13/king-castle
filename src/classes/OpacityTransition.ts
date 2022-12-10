import { Screen } from "../settings";

export const enum TransitionMode {
  FadeIn = 'fadeIn',
  FadeOut = 'fadeOut',
}

export class OpacityTransition {
  private isTransitioning = false;
  private opacity = 0;
  private mode: TransitionMode;

  public fadeIn() {
    this.opacity = 100;
    this.isTransitioning = true;
    this.mode = TransitionMode.FadeIn;
  }

  public fadeOut() {
    this.opacity = 0;
    this.isTransitioning = true;
    this.mode = TransitionMode.FadeOut;
  }

  public update(deltaTime: number) {
    this.updateVisibility(deltaTime);
  }

  draw(context: CanvasRenderingContext2D) {
    if (!this.isTransitioning) return;
    context.fillStyle = `rgba(0, 0, 0, ${this.opacity / 100})`;
    context.fillRect(0, 0, Screen.Width, Screen.Height);
  }
  
  updateVisibility = (deltaTime: number) => {
    if (!this.isTransitioning || !this.mode) return;

    const isFadeOut = this.mode === TransitionMode.FadeOut;

    if (isFadeOut && this.opacity >= 100) {
      this.opacity = 100;
      return;
    }

    if (!isFadeOut && this.opacity <= 0) {
      this.opacity = 0;
      return;
    }

    const fps = 1000 / deltaTime;
    const modifier = isFadeOut ? 1 : -1;
    this.opacity += 100 / fps * modifier;
    return;
  };
};
