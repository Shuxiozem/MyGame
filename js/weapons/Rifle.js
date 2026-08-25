// =========================================
// NOVA ARENA
// Rifle.js
// Rifle de práctica
// =========================================

import { Weapon } from "./Weapon.js";

export class Rifle extends Weapon {

    constructor() {

        super({

            name: "Nova Rifle",

            damage: 18,

            magazineSize: 30,

            fireRate: 140,

            reloadTime: 1100

        });

        this.range = 120;

        this.accuracy = 0.92;
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
