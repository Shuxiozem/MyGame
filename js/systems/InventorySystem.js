// =========================================
// NOVA ARENA
// InventorySystem.js
// Gestión del inventario
// =========================================

export class InventorySystem {

    constructor(inventory) {

        this.inventory = inventory;
    }


    addItem(item) {

        if (!this.inventory) {
            return false;
        }

        return this.inventory.addItem(item);
    }


    removeItem(index) {

        if (!this.inventory) {
            return null;
        }

        return this.inventory.removeItem(index);
    }


    useItem(index) {

        if (!this.inventory) {
            return null;
        }

        const item =
            this.inventory.getItem(index);

        if (!item) {
            return null;
        }

        const removed =
            this.inventory.removeItem(index);

        return removed;
    }


    hasItem(name) {

        if (!this.inventory) {
            return false;
        }

        return this.inventory.hasItem(name);
    }


    getItems() {

        if (!this.inventory) {
            return [];
        }

        return this.inventory.getItems();
    }


    clear() {

        if (this.inventory) {
            this.inventory.clear();
        }
    }
}
