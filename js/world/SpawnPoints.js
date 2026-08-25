// =========================================
// NOVA ARENA
// SpawnPoints.js
// Puntos de aparición del mapa
// =========================================

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export class SpawnPoints {

    constructor() {

        this.playerSpawns = [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(10, 0, 10),
            new THREE.Vector3(-10, 0, 10)
        ];

        this.enemySpawns = [
            new THREE.Vector3(25, 0, 25),
            new THREE.Vector3(-25, 0, 20),
            new THREE.Vector3(25, 0, -25),
            new THREE.Vector3(-25, 0, -25),
            new THREE.Vector3(30, 0, 0)
        ];
    }


    getPlayerSpawn(index = 0) {

        if (this.playerSpawns.length === 0) {
            return new THREE.Vector3();
        }

        const position =
            this.playerSpawns[
                index % this.playerSpawns.length
            ];

        return position.clone();
    }


    getRandomPlayerSpawn() {

        const index =
            Math.floor(
                Math.random() *
                this.playerSpawns.length
            );

        return this.getPlayerSpawn(index);
    }


    getEnemySpawn(index = 0) {

        if (this.enemySpawns.length === 0) {
            return new THREE.Vector3();
        }

        const position =
            this.enemySpawns[
                index % this.enemySpawns.length
            ];

        return position.clone();
    }


    getRandomEnemySpawn() {

        const index =
            Math.floor(
                Math.random() *
                this.enemySpawns.length
            );

        return this.getEnemySpawn(index);
    }


    getAllPlayerSpawns() {

        return this.playerSpawns.map(
            position => position.clone()
        );
    }


    getAllEnemySpawns() {

        return this.enemySpawns.map(
            position => position.clone()
        );
    }
}
