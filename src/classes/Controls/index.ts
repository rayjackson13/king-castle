import { GamepadSupport } from "./GamepadSupport";
import { KeyboardSupport } from "./KeyboardSupport";

import { Button, buttonDefaults } from "./button";

export class Controls {
  static isControllerConnected = false;
  static buttons: { [x: string]: Button } = {
    left: { ...buttonDefaults },
    right: { ...buttonDefaults },
    up: { ...buttonDefaults },
    down: { ...buttonDefaults },
    jump: { ...buttonDefaults },
    enter: { ...buttonDefaults },
    menu: { ...buttonDefaults },
  };

  static init() {
    KeyboardSupport.init();
    GamepadSupport.init();
  }

  static update() {
    GamepadSupport.update();
    KeyboardSupport.update();

    this.isControllerConnected = GamepadSupport.isControllerConnected;

    const { keys } = KeyboardSupport;
    const { buttons } = GamepadSupport;

    Object.keys(this.buttons).forEach(name => {
      this.buttons[name].press = keys[name].press || buttons[name].press;
      this.buttons[name].hold = keys[name].hold || buttons[name].hold;
    });
  }
}
