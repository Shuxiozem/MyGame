// =========================================
// NOVA ARENA
// Camera.js
// Cámara en tercera persona
// =========================================

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export class CameraManager {

    constructor(canvas) {

        this.canvas = canvas;

        this.camera =
            new THREE.PerspectiveCamera(
                65,
                window.innerWidth / window.innerHeight,
                0.1,
                200
            );

        // Posición inicial
        this.camera.position.set(
            0,
            4.5,
            7
        );

        this.target =
            new THREE.Vector3(
                0,
                1.2,
                0
            );

        this.position =
            new THREE.Vector3(
                0,
                4.5,
                7
            );

        this.followSpeed = 0.12;

        this.lookHeight = 1.2;

        this.distance = 7;

        this.height = 4.5;

        this.updateCamera();
    }


    update(deltaTime) {

        // Por ahora seguimos el punto central
        // de la escena.

        const desired =
            new THREE.Vector3(
                this.target.x,
                this.target.y + this.height - 1.2,
                this.target.z + this.distance
            );

        this.position.lerp(
            desired,
            Math.min(
                1,
                this.followSpeed *
                deltaTime *
                60
            )
        );

        this.camera.position.copy(
            this.position
        );

        this.updateCamera();
    }


    updateCamera() {

        this.camera.lookAt(
            this.target.x,
            this.target.y,
            this.target.z
        );
    }


    lookAt(x, y, z) {

        this.target.set(
            x,
            y,
            z
        );

        this.updateCamera();
    }


    setPosition(x, y, z) {

        this.position.set(
            x,
            y,
            z
        );

        this.camera.position.copy(
            this.position
        );

        this.updateCamera();
    }


    setDistance(distance) {

        this.distance =
            Math.max(
                2,
                Math.min(
                    20,
                    distance
                )
            );
    }


    setHeight(height) {

        this.height =
            Math.max(
                1,
                Math.min(
                    15,
                    height
                )
            );
    }


    resize(width, height) {

        if (height === 0) {
            return;
        }

        this.camera.aspect =
            width / height;

        this.camera.updateProjectionMatrix();
    }


    getCamera() {

        return this.camera;
    }


    destroy() {

        // La cámara no necesita
        // liberar recursos de GPU.
        this.camera = null;
    }
}
