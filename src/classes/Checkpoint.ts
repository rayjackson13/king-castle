import { AnimatedSprite, AnimatedSpriteParams } from "./AnimatedSprite";
import { Hitbox } from "./Player";

type CheckpointParams = AnimatedSpriteParams & {
  onLevelPassed: () => unknown;
}

export class Checkpoint extends AnimatedSprite {
  onLevelPassed: () => unknown;

  constructor({ onLevelPassed, ...other }: CheckpointParams) {
    super(other);
    this.onLevelPassed = onLevelPassed;
  }

  hasCollision = (player: Hitbox) => {
    return player.position.x <= this.position.x + this.size.x
    && player.position.x + player.size.x >= this.position.x
    && player.position.y + player.size.y >= this.position.y
    && player.position.y <= this.position.y + this.size.y;
  };

  update = (player: Hitbox) => {
    // check collisions with player;
    if (this.hasCollision(player)) {
      this.play();
      this.onLevelPassed();
    }
  };
}
