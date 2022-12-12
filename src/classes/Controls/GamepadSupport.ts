import { Button, buttonDefaults } from "./button";

export class GamepadSupport {
  static buttons: { [x: string]: Button } = {
    left: { ...buttonDefaults },
    right: { ...buttonDefaults },
    jump: { ...buttonDefaults },
    down: { ...buttonDefaults },
    up: { ...buttonDefaults },
    enter: { ...buttonDefaults },
    menu: { ...buttonDefaults },
  };

  private static gamepadIndex: number = null;
  private static deadzone = .15;
  static isLeftPressed = false;
  static isRightPressed = false;
  static isJumpPressed = false;
  static isDownPressed = false;
  static isUpPressed = false;
  static isEnterPressed = false;

  static get isControllerConnected() {
    return this.gamepadIndex !== null;
  }

  private static gamepadHandler = (event: GamepadEvent, connecting: boolean) => {
    const gamepad = event.gamepad;
  
    if (connecting) {
      this.gamepadIndex = gamepad.index;
    } else {
      this.gamepadIndex = null;
    }
  };

  static init = () => {
    window.addEventListener("gamepadconnected", (e) => { this.gamepadHandler(e, true); }, false);
    window.addEventListener("gamepaddisconnected", (e) => { this.gamepadHandler(e, false); }, false);
  };

  static update = () => {
    if (this.gamepadIndex === null) return;

    const gamepad = navigator.getGamepads()[this.gamepadIndex];
    const [xAxis, yAxis] = gamepad.axes;
    const dPadUp = gamepad.buttons[12].value;
    const dPadDown = gamepad.buttons[13].value;
    const dPadLeft = gamepad.buttons[14].value;
    const dPadRight = gamepad.buttons[15].value;
    const aButton = gamepad.buttons[0].value;
    const lbButton = gamepad.buttons[4].value;
    const menuButton = gamepad.buttons[9].value;
    
    this.buttons.left.hold = xAxis < -this.deadzone || !!dPadLeft;
    this.buttons.right.hold = xAxis > this.deadzone || !!dPadRight;
    this.buttons.jump.hold = !!aButton || !!lbButton;
    this.buttons.up.hold = yAxis < -this.deadzone || !!dPadUp;
    this.buttons.down.hold = yAxis > this.deadzone || !!dPadDown;
    this.buttons.enter.hold = !!aButton;
    this.buttons.menu.hold = !!menuButton;

    Object.values(this.buttons).forEach(key => {
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
  };
}
