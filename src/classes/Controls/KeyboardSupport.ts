export class KeyboardSupport {
  static isLeftPressed = false;
  static isRightPressed = false;
  static isJumpPressed = false;

  static init = () => {
    window.addEventListener('keydown', (event) => {
      if (event.key === ' ') {
        this.isJumpPressed = true;
        return;
      }

      if (event.key === 'a') {
        this.isLeftPressed = true;
        return;
      }

      if (event.key === 'd') {
        this.isRightPressed = true;
        return;
      }
    });

    window.addEventListener('keyup', (event) => {
      if (event.key === ' ') {
        this.isJumpPressed = false;
        return;
      }

      if (event.key === 'a') {
        this.isLeftPressed = false;
      }

      if (event.key === 'd') {
        this.isRightPressed = false;
      }
    });
  };
}
