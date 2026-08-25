// =========================================
// NOVA ARENA
// Enemy.js
// Enemigo básico
// =========================================

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export class Enemy {

    constructor(scene, options = {}) {

        this.scene = scene;

        this.position = new THREE.Vector3(
            options.x || 0,
            0,
            options.z || 0
        );

        this.maxHealth =
            Number(options.health) || 100;

        this.health = this.maxHealth;

        this.speed =
            Number(options.speed) || 2;

        this.alive = true;

        this.createModel();

        this.spawn();
    }


    createModel() {

        this.object =
            new THREE.Group();


        const bodyGeometry =
            new THREE.BoxGeometry(
                0.9,
                1.8,
                0.9
            );

        const bodyMaterial =
            new THREE.MeshStandardMaterial({
                color: 0xc83b52,
                roughness: 0.85
            });

        const body =
            new THREE.Mesh(
                bodyGeometry,
                bodyMaterial
            );

        body.position.y = 0.9;

        this.object.add(body);


        const headGeometry =
            new THREE.SphereGeometry(
                0.38,
                12,
                10
            );

        const headMaterial =
            new THREE.MeshStandardMaterial({
                color: 0xff9b82,
                roughness: 0.7
            });

        const head =
            new THREE.Mesh(
                headGeometry,
                headMaterial
            );

        head.position.y = 2.0;

        this.object.add(head);


        this.object.userData.type =
            "enemy";

        this.object.userData.enemy =
            this;
    }


    spawn() {

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


    update(deltaTime, target = null) {

        if (
            !this.alive ||
            !target
        ) {
            return;
        }

        const direction =
            new THREE.Vector3()
                .subVectors(
                    target,
                    this.position
                );

        direction.y = 0;

        const distance =
            direction.length();

        if (distance > 1.5) {

            direction.normalize();

            this.position.add(
                direction.multiplyScalar(
                    this.speed *
                    deltaTime
                )
            );

            this.object.position.copy(
                this.position
            );
        }
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


    die() {

        this.alive = false;

        this.object.visible = false;
    }


    isAlive() {

        return this.alive;
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
                    child.material.dispose();
                }
            }
        );
    }
}
