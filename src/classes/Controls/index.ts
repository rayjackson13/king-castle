import { GamepadSupport } from "./GamepadSupport";
import { KeyboardSupport } from "./KeyboardSupport";

export class Controls {
  static isLeftPressed = false;
  static isRightPressed = false;
  static isJumpPressed = false;

  static init() {
    KeyboardSupport.init();
    GamepadSupport.init();
  }

  static update() {
    this.isJumpPressed = KeyboardSupport.isJumpPressed || GamepadSupport.isJumpPressed;
    this.isLeftPressed = KeyboardSupport.isLeftPressed || GamepadSupport.isLeftPressed;
    this.isRightPressed = KeyboardSupport.isRightPressed || GamepadSupport.isRightPressed;
  }
}
