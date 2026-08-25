// =========================================
// NOVA ARENA
// WeaponManager.js
// Gestión de armas del jugador
// =========================================

export class WeaponManager {

    constructor() {

        this.weapons = [];

        this.currentIndex = -1;
    }


    addWeapon(weapon) {

        if (!weapon) {
            return;
        }

        this.weapons.push(weapon);

        // Si es la primera arma,
        // la equipamos automáticamente.
        if (this.currentIndex === -1) {
            this.currentIndex = 0;
        }
    }


    removeWeapon(index) {

        if (
            index < 0 ||
            index >= this.weapons.length
        ) {
            return null;
        }

        const removed =
            this.weapons.splice(
                index,
                1
            )[0];

        if (this.weapons.length === 0) {

            this.currentIndex = -1;

        } else if (
            this.currentIndex >=
            this.weapons.length
        ) {

            this.currentIndex =
                this.weapons.length - 1;
        }

        return removed;
    }


    equip(index) {

        if (
            index < 0 ||
            index >= this.weapons.length
        ) {
            return false;
        }

        this.currentIndex = index;

        return true;
    }


    nextWeapon() {

        if (this.weapons.length === 0) {
            return null;
        }

        this.currentIndex =
            (
                this.currentIndex + 1
            ) % this.weapons.length;

        return this.getCurrentWeapon();
    }


    previousWeapon() {

        if (this.weapons.length === 0) {
            return null;
        }

        this.currentIndex--;

        if (this.currentIndex < 0) {
            this.currentIndex =
                this.weapons.length - 1;
        }

        return this.getCurrentWeapon();
    }


    getCurrentWeapon() {

        if (
            this.currentIndex < 0 ||
            this.currentIndex >=
            this.weapons.length
        ) {
            return null;
        }

        return this.weapons[
            this.currentIndex
        ];
    }


    getWeapons() {

        return [...this.weapons];
    }


    getCurrentIndex() {

        return this.currentIndex;
    }


    fireCurrentWeapon() {

        const weapon =
            this.getCurrentWeapon();

        if (!weapon) {
            return false;
        }

        return weapon.fire();
    }


    reloadCurrentWeapon() {

        const weapon =
            this.getCurrentWeapon();

        if (!weapon) {
            return;
        }

        weapon.reload();
    }


    getCurrentAmmo() {

        const weapon =
            this.getCurrentWeapon();

        if (!weapon) {
            return 0;
        }

        return weapon.getAmmo();
    }
}
