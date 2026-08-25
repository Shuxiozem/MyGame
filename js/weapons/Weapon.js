// =========================================
// NOVA ARENA
// Weapon.js
// Clase base para las armas
// =========================================

export class Weapon {

    constructor(options = {}) {

        this.name =
            options.name || "Weapon";

        this.damage =
            Number(options.damage) || 10;

        this.magazineSize =
            Number(options.magazineSize) || 30;

        this.ammo =
            this.magazineSize;

        this.fireRate =
            Number(options.fireRate) || 600;

        this.reloadTime =
            Number(options.reloadTime) || 1200;

        this.lastShot = 0;

        this.reloading = false;
    }


    canFire() {

        if (this.reloading) {
            return false;
        }

        if (this.ammo <= 0) {
            return false;
        }

        const now =
            performance.now();

        return (
            now - this.lastShot >=
            this.fireRate
        );
    }


    fire() {

        if (!this.canFire()) {
            return false;
        }

        this.ammo--;

        this.lastShot =
            performance.now();

        return true;
    }


    reload() {

        if (this.reloading) {
            return;
        }

        if (
            this.ammo >=
            this.magazineSize
        ) {
            return;
        }

        this.reloading = true;

        setTimeout(
            () => {

                this.ammo =
                    this.magazineSize;

                this.reloading = false;

            },
            this.reloadTime
        );
    }


    getAmmo() {

        return this.ammo;
    }


    getMagazineSize() {

        return this.magazineSize;
    }


    isReloading() {

        return this.reloading;
    }


    getDamage() {

        return this.damage;
    }


    getName() {

        return this.name;
    }
}
