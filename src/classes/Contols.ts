export class Controls {
  static keys = {
    jump: {
      pressed: false,
    },
    left: {
      pressed: false,
    },
    right: {
      pressed: false,
    }
  };

  static init = () => {
    window.addEventListener('keydown', (event) => {
      if (event.key === ' ') {
        this.keys.jump.pressed = true;
        return;
      }

      if (event.key === 'a') {
        this.keys.left.pressed = true;
        return;
      }

      if (event.key === 'd') {
        this.keys.right.pressed = true;
        return;
      }
    });

    window.addEventListener('keyup', (event) => {
      if (event.key === ' ') {
        this.keys.jump.pressed = false;
        return;
      }

      if (event.key === 'a') {
        this.keys.left.pressed = false;
      }

      if (event.key === 'd') {
        this.keys.right.pressed = false;
      }
    });
  };
}
