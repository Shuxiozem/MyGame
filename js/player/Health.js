// =========================================
// NOVA ARENA
// Health.js
// Sistema de vida del jugador
// =========================================

export class Health {

    constructor(maxHealth = 100) {

        this.maxHealth =
            Math.max(
                1,
                Number(maxHealth) || 100
            );

        this.currentHealth =
            this.maxHealth;

        this.alive = true;
    }


    damage(amount) {

        if (!this.alive) {
            return;
        }

        const value =
            Math.max(
                0,
                Number(amount) || 0
            );

        this.currentHealth =
            Math.max(
                0,
                this.currentHealth - value
            );

        if (
            this.currentHealth <= 0
        ) {

            this.currentHealth = 0;

            this.alive = false;
        }
    }


    heal(amount) {

        if (!this.alive) {
            return;
        }

        const value =
            Math.max(
                0,
                Number(amount) || 0
            );

        this.currentHealth =
            Math.min(
                this.maxHealth,
                this.currentHealth + value
            );
    }


    reset() {

        this.currentHealth =
            this.maxHealth;

        this.alive = true;
    }


    getHealth() {

        return this.currentHealth;
    }


    getMaxHealth() {

        return this.maxHealth;
    }


    getPercentage() {

        return (
            this.currentHealth /
            this.maxHealth
        );
    }


    isAlive() {

        return this.alive;
    }
}
