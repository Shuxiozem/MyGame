// =========================================
// NOVA ARENA
// HUD.js
// Interfaz durante la partida
// =========================================

export class HUD {

    constructor() {

        this.health = 100;
        this.maxHealth = 100;

        this.ammo = 0;
        this.weaponName = "Nova Rifle";

        this.create();
    }


    create() {

        this.hud =
            document.getElementById("hud");

        if (!this.hud) {
            return;
        }

        this.healthElement =
            document.getElementById(
                "health"
            );

        this.ammoElement =
            document.getElementById(
                "ammo"
            );

        this.weaponElement =
            document.getElementById(
                "weapon"
            );

        this.update();
    }


    update() {

        if (this.healthElement) {

            this.healthElement.textContent =
                Math.round(
                    this.health
                );
        }


        if (this.ammoElement) {

            this.ammoElement.textContent =
                this.ammo;
        }


        if (this.weaponElement) {

            this.weaponElement.textContent =
                this.weaponName;
        }
    }


    setHealth(current, max = 100) {

        this.health =
            Math.max(
                0,
                Number(current) || 0
            );

        this.maxHealth =
            Math.max(
                1,
                Number(max) || 100
            );

        this.update();
    }


    setAmmo(ammo) {

        this.ammo =
            Math.max(
                0,
                Number(ammo) || 0
            );

        this.update();
    }


    setWeapon(name) {

        this.weaponName =
            name || "Unknown";

        this.update();
    }


    show() {

        if (this.hud) {
            this.hud.style.display =
                "block";
        }
    }


    hide() {

        if (this.hud) {
            this.hud.style.display =
                "none";
        }
    }
}
