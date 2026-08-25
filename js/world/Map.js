// =========================================
// NOVA ARENA
// Map.js
// Sistema básico de mapa
// =========================================

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export class GameMap {

    constructor(scene) {

        this.scene = scene;

        this.objects = [];

        this.size = 120;

        this.createGround();
        this.createBoundary();
    }


    createGround() {

        const geometry =
            new THREE.PlaneGeometry(
                this.size,
                this.size
            );

        const material =
            new THREE.MeshStandardMaterial({
                color: 0x28352d,
                roughness: 1
            });

        this.ground =
            new THREE.Mesh(
                geometry,
                material
            );

        this.ground.rotation.x =
            -Math.PI / 2;

        this.ground.position.y = 0;

        this.scene.add(
            this.ground
        );

        this.objects.push(
            this.ground
        );
    }


    createBoundary() {

        const half =
            this.size / 2;

        const wallHeight = 4;

        const material =
            new THREE.MeshStandardMaterial({
                color: 0x18201c,
                transparent: true,
                opacity: 0.7
            });

        const positions = [
            [0, wallHeight / 2, -half],
            [0, wallHeight / 2, half],
            [-half, wallHeight / 2, 0],
            [half, wallHeight / 2, 0]
        ];

        for (const [x, y, z] of positions) {

            const geometry =
                new THREE.BoxGeometry(
                    this.size,
                    wallHeight,
                    1
                );

            const wall =
                new THREE.Mesh(
                    geometry,
                    material
                );

            wall.position.set(
                x,
                y,
                z
            );

            if (
                Math.abs(x) === half
            ) {
                wall.scale.x =
                    1 / this.size;
                wall.scale.z =
                    this.size;
            }

            this.scene.add(
                wall
            );

            this.objects.push(
                wall
            );
        }
    }


    getSize() {

        return this.size;
    }


    isInside(x, z) {

        const half =
            this.size / 2;

        return (
            x > -half &&
            x < half &&
            z > -half &&
            z < half
        );
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
