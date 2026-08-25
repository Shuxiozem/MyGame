// =========================================
// NOVA ARENA
// LootSystem.js
// Sistema de objetos recogibles
// =========================================

export class LootSystem {

    constructor() {

        this.items = [];

        this.nextId = 1;
    }


    createLoot(type, data = {}) {

        const item = {

            id: this.nextId++,

            type: type || "item",

            name:
                data.name ||
                "Unknown Item",

            amount:
                Number(data.amount) || 1,

            position:
                data.position || null,

            collected: false
        };

        this.items.push(item);

        return item;
    }


    collect(id) {

        const item =
            this.items.find(
                loot =>
                    loot.id === id &&
                    !loot.collected
            );

        if (!item) {
            return null;
        }

        item.collected = true;

        return item;
    }


    getAvailableLoot() {

        return this.items.filter(
            item => !item.collected
        );
    }


    getAllLoot() {

        return [...this.items];
    }


    removeCollected() {

        this.items =
            this.items.filter(
                item => !item.collected
            );
    }


    clear() {

        this.items = [];
    }
}
