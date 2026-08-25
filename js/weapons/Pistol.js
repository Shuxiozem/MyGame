// =========================================
// NOVA ARENA
// Pistol.js
// Pistola de práctica
// =========================================

import { Weapon } from "./Weapon.js";

export class Pistol extends Weapon {

    constructor() {

        super({

            name: "Nova Pistol",

            damage: 24,

            magazineSize: 12,

            fireRate: 320,

            reloadTime: 900

        });

        this.range = 70;

        this.accuracy = 0.95;
    }


    getRange() {

        return this.range;
    }


    getAccuracy() {

        return this.accuracy;
    }


    fire() {

        const fired =
            super.fire();

        if (!fired) {
            return null;
        }

        return {

            weapon: this.name,

            damage: this.damage,

            range: this.range,

            accuracy: this.accuracy,

            ammo: this.ammo

        };
    }
}
