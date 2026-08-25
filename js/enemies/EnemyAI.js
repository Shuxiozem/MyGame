// =========================================
// NOVA ARENA
// EnemyAI.js
// Comportamiento básico de enemigos
// =========================================

export class EnemyAI {

    constructor(enemy) {

        this.enemy = enemy;

        this.target = null;

        this.enabled = true;

        this.detectionRange = 35;

        this.attackRange = 2;

        this.state = "idle";
    }


    setTarget(target) {

        this.target = target;
    }


    update(deltaTime) {

        if (
            !this.enabled ||
            !this.enemy ||
            !this.enemy.isAlive()
        ) {
            return;
        }

        if (!this.target) {

            this.state = "idle";

            return;
        }

        const enemyPosition =
            this.enemy.getPosition();

        const targetPosition =
            this.target.clone();

        const dx =
            targetPosition.x -
            enemyPosition.x;

        const dz =
            targetPosition.z -
            enemyPosition.z;

        const distance =
            Math.sqrt(
                dx * dx +
                dz * dz
            );


        if (
            distance >
            this.detectionRange
        ) {

            this.state = "idle";

            return;
        }


        if (
            distance >
            this.attackRange
        ) {

            this.state = "chase";

            this.enemy.update(
                deltaTime,
                targetPosition
            );

        } else {

            this.state = "attack";
        }
    }


    getState() {

        return this.state;
    }


    setEnabled(value) {

        this.enabled = !!value;
    }


    destroy() {

        this.enemy = null;

        this.target = null;
    }
}
