import { Button, buttonDefaults } from "./button";

export class KeyboardSupport {
  static keys: { [x: string]: Button } = {
    left: { ...buttonDefaults },
    right: { ...buttonDefaults },
    jump: { ...buttonDefaults },
    down: { ...buttonDefaults },
    up: { ...buttonDefaults },
    enter: { ...buttonDefaults },
    menu: { ...buttonDefaults },
  };

  static init = () => {
    window.addEventListener('keydown', (event) => {
      if (event.key === ' ') {
        this.keys.jump.hold = true;
        return;
      }

      if (event.key === 'a') {
        this.keys.left.hold = true;
        return;
      }

      if (event.key === 'd') {
        this.keys.right.hold = true;
        return;
      }

      if (event.key === 'w') {
        this.keys.up.hold = true;
        return;
      }

      if (event.key === 's') {
        this.keys.down.hold = true;
        return;
      }

      if (event.key === 'Enter') {
        this.keys.enter.hold = true;
        return;
      }

      if (event.key === 'Escape') {
        this.keys.menu.hold = true;
        return;
      }

      if (event.key === 'Tab') {
        this.keys.menu.hold = true;
        return;
      }
    });

    window.addEventListener('keyup', (event) => {
      if (event.key === ' ') {
        this.keys.jump.hold = false;
        return;
      }

      if (event.key === 'a') {
        this.keys.left.hold = false;
        return;
      }

      if (event.key === 'd') {
        this.keys.right.hold = false;
        return;
      }

      if (event.key === 'w') {
        this.keys.up.hold = false;
        return;
      }

      if (event.key === 's') {
        this.keys.down.hold = false;
        return;
      }

      if (event.key === 'Enter') {
        this.keys.enter.hold = false;
        return;
      }

      if (event.key === 'Escape') {
        this.keys.menu.hold = false;
        return;
      }

      if (event.key === 'Tab') {
        this.keys.menu.hold = false;
        return;
      }
    });
  };

  static update() {
    Object.values(this.keys).forEach(key => {
      if (!key.hold) {
        key.press = false;
        key.lock = false;
        return;
      };

      if (key.lock) {
        key.press = false;
        return;
      }

      key.press = true;
      key.lock = true;
    });
  }
}
