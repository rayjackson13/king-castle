import { AnimationList } from "../classes/AnimatedSprite";
import doorOpen from '../assets/img/doorOpen.png';

export const enum DoorAnimationTitle {
  OpenDoor = 'doorOpen',
}

export const DoorAnimations: AnimationList = {
  [DoorAnimationTitle.OpenDoor]: {
    frameCount: 5,
    frameBuffer: 10,
    loop: false,
    sourceURI: doorOpen,
  },
};
