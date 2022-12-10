
import { Vector2 } from "./Vector2";

import { Screen } from "../settings";
import { Controls } from "./Contols";
import { CollisionSystem } from "./CollisionSystem";
import { AnimatedSprite, AnimatedSpriteParams } from "./AnimatedSprite";
import { PlayerAnimationTitle } from "../data/playerAnimations";
import { CollisionBlock } from "./CollisionBlock";

type PlayerParams = AnimatedSpriteParams & {
  size: Vector2;
};

export type Hitbox = {
  position: Vector2;
  size: Vector2;
}

export class Player extends AnimatedSprite {
  gravity = 1;
  velocity: Vector2 = { x: 0, y: 0 };
  hitbox: Hitbox;
  lastDirection: number;
  jumpReady = true;
  isControllable = true;
  private isTransitioning = false;
  private transitionEndPos: Vector2;
  private speed = 0.5;

  constructor ({ position, size, animations, animationName }: PlayerParams) {
    super({ position, animations, animationName });
    this.position = position;
    this.size = size;
  }

  handleGravity = () => {
    if (this.position.y + this.size.y + this.velocity.y < Screen.Height) {
      this.velocity.y += this.gravity;
      return;
    }

    this.velocity.y = 0;
  };

  setIdleAnimation = () => {
    if (this.lastDirection < 0) {
      this.switchSprite(PlayerAnimationTitle.IdleLeft);
      return;
    }

    this.switchSprite(PlayerAnimationTitle.IdleRight);
  };

  handleControls = (deltaTime: number) => {
    if (!this.isControllable) {
      this.velocity.x = 0;
      return;
    }

    const { jump, left, right } = Controls.keys;
    this.velocity.x = 0;
    if (jump.pressed) {
      if (this.velocity.y === 0 && this.jumpReady) {
        this.velocity.y = -0.8 * deltaTime;
        this.jumpReady = false;
      }
    }

    if (!jump.pressed && this.velocity.y === 0 && !this.jumpReady) {
      this.jumpReady = true;
    }

    if (left.pressed) {
      this.velocity.x = -this.speed * deltaTime;
      this.lastDirection = -1;
      this.switchSprite(PlayerAnimationTitle.RunLeft);
      return;
    }

    if (right.pressed) {
      this.velocity.x = this.speed * deltaTime;
      this.lastDirection = 1;
      this.switchSprite(PlayerAnimationTitle.RunRight);
      return;
    }

    if (this.lastDirection !== undefined) {
      this.setIdleAnimation();
    }
  };

  hasCollision = (block: CollisionBlock) => {
    return this.hitbox.position.x <= block.position.x + block.size.x
    && this.hitbox.position.x + this.hitbox.size.x >= block.position.x
    && this.hitbox.position.y + this.hitbox.size.y >= block.position.y
    && this.hitbox.position.y <= block.position.y + block.size.y;
  };

  checkHorizontalCollisions = () => {
    const { collisions } = CollisionSystem;
    for (let i = 0; i < collisions.length; i++) {
      const block = collisions[i];

      if (this.hasCollision(block)) {
        if (this.velocity.x < 0) {
          const offset = this.hitbox.position.x - this.position.x;
          this.position.x = block.position.x + block.size.x - offset + 0.01;
          break;
        }

        if (this.velocity.x > 0) {
          const offset = this.hitbox.position.x - this.position.x + this.hitbox.size.x;
          this.position.x = block.position.x - offset - 0.01;
          break;
        }
      }
    }
  };

  checkVerticalCollisions = () => {
    const { collisions } = CollisionSystem;
    for (let i = 0; i < collisions.length; i++) {
      const block = collisions[i];

      if (this.hasCollision(block)) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.position.y - this.position.y;
          this.position.y = block.position.y + block.size.y - offset + 0.01;
          break;
        }

        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.position.y - this.position.y + this.hitbox.size.y;
          this.position.y = block.position.y - offset - 0.01;
          break;
        }
      }
    }
  };

  updateHitbox = () => {
    this.hitbox = {
      position: {
        x: this.position.x + 58,
        y: this.position.y + 34,
      },
      size: { x: 50, y: 54 },
    };
  };

  switchSprite = (name: PlayerAnimationTitle) => {
    const animation = this.animations[name];
    if (this.image === animation.image) {
      return;
    }

    this.image = animation.image;
    this.frameCount = animation.frameCount;
    this.frameBuffer = animation.frameBuffer;
    this.currentFrame = 0;
  };

  enterDoorTransition = (door: Hitbox) => {
    const doorCenterX = door.position.x + door.size.x / 2;
    this.setIdleAnimation();

    this.transitionEndPos = {
      x: doorCenterX,
      y: this.position.y,
    };

    setTimeout(() => {
      this.isTransitioning = true;
    }, 1000);
  };
  
  handleTransition = (deltaTime: number) => {
    if (!this.isTransitioning) return;
    const hitboxCenterX = this.hitbox.position.x + this.hitbox.size.x / 2;
    const xDiff = this.transitionEndPos.x - hitboxCenterX;
    this.switchSprite(xDiff >= 0 ? PlayerAnimationTitle.RunRight: PlayerAnimationTitle.RunLeft);

    if (Math.abs(xDiff) > .5) {
      this.position.x += xDiff / deltaTime;
      return;
    }
    
    this.setIdleAnimation();
    this.isTransitioning = false;
  };

  update = (deltaTime: number) => {
    this.position.x += this.velocity.x;
    this.updateHitbox();
    this.checkHorizontalCollisions();

    this.position.y += this.velocity.y;
    this.handleGravity();
    this.updateHitbox();

    this.checkVerticalCollisions();

    this.handleControls(deltaTime);

    this.handleTransition(deltaTime);
  };

  drawDebug = (context: CanvasRenderingContext2D) => {
    context.fillStyle = 'rgba(0, 255, 0, .5)';
    context.fillRect(
      this.hitbox.position.x,
      this.hitbox.position.y,
      this.hitbox.size.x,
      this.hitbox.size.y
    );
  };
}
