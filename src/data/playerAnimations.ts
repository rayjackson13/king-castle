import { AnimationList } from "../classes/AnimatedSprite";
import idleRight from '../assets/img/king/idle.png';
import idleLeft from '../assets/img/king/idleLeft.png';
import runRight from '../assets/img/king/runRight.png';
import runLeft from '../assets/img/king/runLeft.png';

export const enum PlayerAnimationTitle {
  IdleRight = 'idleRight',
  IdleLeft = 'idleLeft',
  RunRight = 'runRight',
  RunLeft = 'runLeft',
}

export const PlayerAnimations: AnimationList = {
  [PlayerAnimationTitle.IdleRight]: {
    frameCount: 11,
    frameBuffer: 6,
    loop: true,
    sourceURI: idleRight,
  },
  [PlayerAnimationTitle.IdleLeft]: {
    frameCount: 11,
    frameBuffer: 6,
    loop: true,
    sourceURI: idleLeft,
  },
  [PlayerAnimationTitle.RunRight]: {
    frameCount: 8,
    frameBuffer: 6,
    loop: true,
    sourceURI: runRight,
  },
  [PlayerAnimationTitle.RunLeft]: {
    frameCount: 8,
    frameBuffer: 6,
    loop: true,
    sourceURI: runLeft,
  },
};
