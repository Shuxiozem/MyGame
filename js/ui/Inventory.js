// =========================================
// NOVA ARENA
// Inventory.js
// Inventario del jugador
// =========================================

export class Inventory {

    constructor(maxSlots = 12) {

        this.maxSlots =
            Math.max(
                1,
                Number(maxSlots) || 12
            );

        this.items = [];
    }


    addItem(item) {

        if (!item) {
            return false;
        }

        if (
            this.items.length >=
            this.maxSlots
        ) {
            return false;
        }

        this.items.push(item);

        return true;
    }


    removeItem(index) {

        if (
            index < 0 ||
            index >= this.items.length
        ) {
            return null;
        }

        return this.items.splice(
            index,
            1
        )[0];
    }


    getItem(index) {

        if (
            index < 0 ||
            index >= this.items.length
        ) {
            return null;
        }

        return this.items[index];
    }


    getItems() {

        return [...this.items];
    }


    hasItem(name) {

        return this.items.some(
            item =>
                item.name === name
        );
    }


    clear() {

        this.items = [];
    }


    getCount() {

        return this.items.length;
    }


    getMaxSlots() {

        return this.maxSlots;
    }
}
