// =========================================
// NOVA ARENA
// Projectile.js
// Proyectil básico del juego
// =========================================

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export class Projectile {

    constructor(scene, options = {}) {

        this.scene = scene;

        this.speed =
            Number(options.speed) || 45;

        this.damage =
            Number(options.damage) || 10;

        this.lifeTime =
            Number(options.lifeTime) || 2;

        this.life = 0;

        this.active = true;

        this.position =
            options.position
                ? options.position.clone()
                : new THREE.Vector3();

        this.direction =
            options.direction
                ? options.direction.clone().normalize()
                : new THREE.Vector3(0, 0, -1);

        this.createObject();
    }


    createObject() {

        const geometry =
            new THREE.SphereGeometry(
                0.06,
                8,
                8
            );

        const material =
            new THREE.MeshBasicMaterial({
                color: 0xffffaa
            });

        this.object =
            new THREE.Mesh(
                geometry,
                material
            );

        this.object.position.copy(
            this.position
        );

        this.object.userData.type =
            "projectile";

        if (this.scene) {
            this.scene.add(
                this.object
            );
        }
    }


    update(deltaTime) {

        if (!this.active) {
            return;
        }

        this.life += deltaTime;

        this.position.add(
            this.direction.clone().multiplyScalar(
                this.speed * deltaTime
            )
        );

        this.object.position.copy(
            this.position
        );

        if (
            this.life >=
            this.lifeTime
        ) {
            this.destroy();
        }
    }


    getDamage() {

        return this.damage;
    }


    getPosition() {

        return this.position.clone();
    }


    isActive() {

        return this.active;
    }


    destroy() {

        if (!this.active) {
            return;
        }

        this.active = false;

        if (
            this.object &&
            this.object.parent
        ) {
            this.object.parent.remove(
                this.object
            );
        }

        if (this.object.geometry) {
            this.object.geometry.dispose();
        }

        if (this.object.material) {
            this.object.material.dispose();
        }
    }
}
