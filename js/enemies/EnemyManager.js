// =========================================
// NOVA ARENA
// EnemyManager.js
// Administración de enemigos
// =========================================

import { Enemy } from "./Enemy.js";
import { EnemyAI } from "./EnemyAI.js";

export class EnemyManager {

    constructor(scene) {

        this.scene = scene;

        this.enemies = [];

        this.maxEnemies = 10;
    }


    spawn(options = {}) {

        if (
            this.enemies.length >=
            this.maxEnemies
        ) {
            return null;
        }

        const enemy =
            new Enemy(
                this.scene,
                options
            );

        const ai =
            new EnemyAI(enemy);

        const entry = {
            enemy,
            ai
        };

        this.enemies.push(entry);

        return entry;
    }


    update(deltaTime, target) {

        for (
            const entry of this.enemies
        ) {

            if (!entry.enemy.isAlive()) {
                continue;
            }

            if (target) {
                entry.ai.setTarget(target);
            }

            entry.ai.update(deltaTime);
        }

        this.removeDead();
    }


    removeDead() {

        this.enemies =
            this.enemies.filter(
                entry => {

                    if (
                        entry.enemy.isAlive()
                    ) {
                        return true;
                    }

                    entry.enemy.destroy();
                    entry.ai.destroy();

                    return false;
                }
            );
    }


    getEnemies() {

        return this.enemies.map(
            entry => entry.enemy
        );
    }


    getAliveCount() {

        return this.enemies.filter(
            entry =>
                entry.enemy.isAlive()
        ).length;
    }


    clear() {

        for (
            const entry of this.enemies
        ) {

            entry.enemy.destroy();
            entry.ai.destroy();
        }

        this.enemies = [];
    }


    destroy() {

        this.clear();

        this.scene = null;
    }
}
