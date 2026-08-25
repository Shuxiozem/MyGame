// =========================================
// NOVA ARENA
// Player.js
// Personaje principal
// =========================================

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export class Player {

    constructor(scene) {

        this.scene = scene;

        this.position =
            new THREE.Vector3(0, 0, 0);

        this.rotation = 0;

        this.speed = 7;

        this.health = 100;

        this.maxHealth = 100;

        this.alive = true;

        this.createModel();

        this.spawn();
    }


    createModel() {

        this.object =
            new THREE.Group();


        // Cuerpo

        const bodyGeometry =
            new THREE.CapsuleGeometry(
                0.55,
                1.2,
                5,
                10
            );

        const bodyMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x7045e8,
                roughness: 0.8
            });

        const body =
            new THREE.Mesh(
                bodyGeometry,
                bodyMaterial
            );

        body.position.y = 1.1;

        this.object.add(body);


        // Cabeza / visor

        const headGeometry =
            new THREE.SphereGeometry(
                0.42,
                16,
                12
            );

        const headMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x8ee8ff,
                metalness: 0.15,
                roughness: 0.25
            });

        const head =
            new THREE.Mesh(
                headGeometry,
                headMaterial
            );

        head.scale.set(
            1,
            0.65,
            0.8
        );

        head.position.set(
            0,
            1.85,
            0.35
        );

        this.object.add(head);


        // Marcador visual del jugador

        this.object.userData.type =
            "player";
    }


    spawn(x = 0, z = 0) {

        this.position.set(
            x,
            0,
            z
        );

        this.object.position.copy(
            this.position
        );

        this.object.visible = true;

        this.health =
            this.maxHealth;

        this.alive = true;


        if (
            this.scene &&
            !this.object.parent
        ) {

            this.scene.add(
                this.object
            );
        }
    }


    update(deltaTime, movement = null) {

        if (!this.alive) {
            return;
        }

        if (movement) {

            let x =
                Number(movement.x) || 0;

            let z =
                Number(movement.y) || 0;

            const length =
                Math.hypot(x, z);

            if (length > 1) {

                x /= length;
                z /= length;
            }

            this.position.x +=
                x *
                this.speed *
                deltaTime;

            this.position.z +=
                z *
                this.speed *
                deltaTime;
        }


        this.object.position.copy(
            this.position
        );

        this.object.rotation.y =
            this.rotation;
    }


    rotate(angle) {

        this.rotation = angle;

        this.object.rotation.y =
            angle;
    }


    takeDamage(amount) {

        if (!this.alive) {
            return;
        }

        const damage =
            Math.max(
                0,
                Number(amount) || 0
            );

        this.health =
            Math.max(
                0,
                this.health - damage
            );

        if (this.health <= 0) {
            this.die();
        }
    }


    heal(amount) {

        if (!this.alive) {
            return;
        }

        const value =
            Math.max(
                0,
                Number(amount) || 0
            );

        this.health =
            Math.min(
                this.maxHealth,
                this.health + value
            );
    }


    die() {

        this.alive = false;

        this.object.visible = false;
    }


    getHealth() {

        return this.health;
    }


    getPosition() {

        return this.position.clone();
    }


    getObject() {

        return this.object;
    }


    destroy() {

        if (
            this.object &&
            this.object.parent
        ) {

            this.object.parent.remove(
                this.object
            );
        }

        this.object.traverse(
            child => {

                if (child.geometry) {
                    child.geometry.dispose();
                }

                if (child.material) {

                    if (
                        Array.isArray(
                            child.material
                        )
                    ) {

                        child.material.forEach(
                            material =>
                                material.dispose()
                        );

                    } else {

                        child.material.dispose();
                    }
                }
            }
        );
    }
}
