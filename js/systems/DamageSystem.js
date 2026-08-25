// =========================================
// NOVA ARENA
// DamageSystem.js
// Sistema básico de daño
// =========================================

export class DamageSystem {

    constructor() {

        this.events = [];
    }


    applyDamage(target, amount, source = null) {

        if (!target) {
            return false;
        }

        const damage =
            Math.max(
                0,
                Number(amount) || 0
            );

        if (damage <= 0) {
            return false;
        }

        if (
            typeof target.takeDamage ===
            "function"
        ) {

            target.takeDamage(damage);

            this.events.push({
                source,
                target,
                damage,
                time: Date.now()
            });

            return true;
        }

        return false;
    }


    getRecentEvents() {

        return [...this.events];
    }


    clearEvents() {

        this.events = [];
    }
}
