export class GamepadSupport {
  private static gamepadIndex: number = null;
  private static deadzone = .15;
  static isLeftPressed = false;
  static isRightPressed = false;
  static isJumpPressed = false;

  private static gamepadHandler = (event: GamepadEvent, connecting: boolean) => {
    const gamepad = event.gamepad;
    if (connecting === true) {
      console.log(gamepad.mapping);
    }
  
    if (connecting) {
      this.gamepadIndex = gamepad.index;
    } else {
      this.gamepadIndex = null;
    }
  };

  static init = () => {
    console.log(navigator.getGamepads());
    window.addEventListener("gamepadconnected", (e) => { this.gamepadHandler(e, true); }, false);
    window.addEventListener("gamepaddisconnected", (e) => { this.gamepadHandler(e, false); }, false);
  };

  static update = () => {
    if (this.gamepadIndex === null) return;

    const gamepad = navigator.getGamepads()[this.gamepadIndex];
    const xAxis = gamepad.axes[0];
    const dPadLeft = gamepad.buttons[14].value;
    const dPadRight = gamepad.buttons[15].value;
    const aButton = gamepad.buttons[0].value;
    const lbButton = gamepad.buttons[4].value;
    
    this.isLeftPressed = xAxis < -this.deadzone || !!dPadLeft;
    this.isRightPressed = xAxis > this.deadzone || !!dPadRight;
    this.isJumpPressed = !!aButton || !!lbButton;
  };
}
