// =========================================
// NOVA ARENA
// Environment.js
// Elementos del entorno
// =========================================

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export class Environment {

    constructor(scene) {

        this.scene = scene;

        this.objects = [];

        this.createTrees();
        this.createRocks();
    }


    createTrees() {

        const positions = [
            [-18, -15],
            [12, -20],
            [28, 8],
            [-30, 18],
            [8, 25],
            [-25, 30]
        ];

        for (
            const [x, z] of positions
        ) {

            this.createTree(x, z);
        }
    }


    createTree(x, z) {

        const tree =
            new THREE.Group();


        const trunkGeometry =
            new THREE.CylinderGeometry(
                0.25,
                0.35,
                2.2,
                8
            );

        const trunkMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x62422d
            });

        const trunk =
            new THREE.Mesh(
                trunkGeometry,
                trunkMaterial
            );

        trunk.position.y = 1.1;

        tree.add(trunk);


        const leavesGeometry =
            new THREE.ConeGeometry(
                1.5,
                3.2,
                8
            );

        const leavesMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x315d3b
            });

        const leaves =
            new THREE.Mesh(
                leavesGeometry,
                leavesMaterial
            );

        leaves.position.y = 3.5;

        tree.add(leaves);


        tree.position.set(
            x,
            0,
            z
        );

        this.scene.add(tree);

        this.objects.push(tree);
    }


    createRocks() {

        const positions = [
            [-10, 12],
            [20, 15],
            [-20, -5],
            [30, -25],
            [3, -30]
        ];

        for (
            const [x, z] of positions
        ) {

            const geometry =
                new THREE.DodecahedronGeometry(
                    1.2,
                    0
                );

            const material =
                new THREE.MeshStandardMaterial({
                    color: 0x59615e,
                    roughness: 1
                });

            const rock =
                new THREE.Mesh(
                    geometry,
                    material
                );

            rock.position.set(
                x,
                0.8,
                z
            );

            rock.scale.y =
                0.7;

            this.scene.add(rock);

            this.objects.push(rock);
        }
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

            object.traverse(
                child => {

                    if (child.geometry) {
                        child.geometry.dispose();
                    }

                    if (child.material) {
                        child.material.dispose();
                    }
                }
            );
        }

        this.objects = [];
    }
}
