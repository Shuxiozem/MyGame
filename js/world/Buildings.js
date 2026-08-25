// =========================================
// NOVA ARENA
// Buildings.js
// Estructuras básicas del mapa
// =========================================

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export class Buildings {

    constructor(scene) {

        this.scene = scene;

        this.objects = [];

        this.createBuildings();
    }


    createBuildings() {

        this.createBuilding(-15, -8, 8, 5, 7);
        this.createBuilding(15, 5, 7, 4, 6);
        this.createBuilding(-5, 22, 6, 4, 5);
        this.createBuilding(25, -20, 9, 5, 8);
    }


    createBuilding(
        x,
        z,
        width,
        depth,
        height
    ) {

        const geometry =
            new THREE.BoxGeometry(
                width,
                height,
                depth
            );

        const material =
            new THREE.MeshStandardMaterial({
                color: 0x53616b,
                roughness: 0.9
            });

        const building =
            new THREE.Mesh(
                geometry,
                material
            );

        building.position.set(
            x,
            height / 2,
            z
        );

        building.userData.type =
            "building";

        this.scene.add(building);

        this.objects.push(building);
    }


    getBuildings() {

        return [...this.objects];
    }


    destroy() {

        for (
            const object of this.objects
        ) {

            if (object.parent) {
                object.parent.remove(
                    object
                );
            }

            if (object.geometry) {
                object.geometry.dispose();
            }

            if (object.material) {
                object.material.dispose();
            }
        }

        this.objects = [];
    }
}
