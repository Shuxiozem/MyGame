// =========================================
// NOVA ARENA
// Controller.js
// Control de movimiento del jugador
// =========================================

export class PlayerController {

    constructor(player, input) {

        this.player = player;
        this.input = input;

        this.moveSpeed = 1;

        this.enabled = true;
    }


    update(deltaTime) {

        if (!this.enabled) {
            return;
        }

        const movement =
            this.input.getMovement();

        this.player.update(
            deltaTime,
            {
                x: movement.x * this.moveSpeed,
                y: movement.y * this.moveSpeed
            }
        );
    }


    setEnabled(value) {

        this.enabled = !!value;
    }


    isEnabled() {

        return this.enabled;
    }


    destroy() {

        this.player = null;
        this.input = null;
    }
}
