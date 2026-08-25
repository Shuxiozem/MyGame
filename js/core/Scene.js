// =========================================
// NOVA ARENA
// Scene.js
// Escena y renderizado 3D
// =========================================

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export class SceneManager {

    constructor(canvas) {

        this.canvas = canvas;

        this.scene = new THREE.Scene();

        this.scene.background =
            new THREE.Color(0x090d1a);

        this.scene.fog =
            new THREE.Fog(
                0x090d1a,
                30,
                120
            );

        this.renderer =
            new THREE.WebGLRenderer({
                canvas: this.canvas,
                antialias: true,
                powerPreference: "high-performance"
            });

        this.renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio || 1,
                2
            )
        );

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        this.renderer.outputColorSpace =
            THREE.SRGBColorSpace;

        this.createLights();

        this.createGround();

        this.createTestObjects();
    }


    createLights() {

        const hemisphere =
            new THREE.HemisphereLight(
                0xb9c7ff,
                0x182030,
                2
            );

        this.scene.add(
            hemisphere
        );


        const sun =
            new THREE.DirectionalLight(
                0xffffff,
                2
            );

        sun.position.set(
            20,
            40,
            10
        );

        this.scene.add(
            sun
        );
    }


    createGround() {

        const geometry =
            new THREE.PlaneGeometry(
                140,
                140
            );

        const material =
            new THREE.MeshStandardMaterial({
                color: 0x263329,
                roughness: 1
            });

        const ground =
            new THREE.Mesh(
                geometry,
                material
            );

        ground.rotation.x =
            -Math.PI / 2;

        ground.position.y = 0;

        this.scene.add(
            ground
        );


        const grid =
            new THREE.GridHelper(
                140,
                70,
                0x42514b,
                0x34413c
            );

        grid.position.y =
            0.01;

        this.scene.add(
            grid
        );
    }


    createTestObjects() {

        for (
            let i = 0;
            i < 18;
            i++
        ) {

            const x =
                (Math.random() - 0.5) * 80;

            const z =
                (Math.random() - 0.5) * 80;


            const width =
                2 + Math.random() * 4;

            const height =
                2 + Math.random() * 4;

            const depth =
                2 + Math.random() * 4;


            const geometry =
                new THREE.BoxGeometry(
                    width,
                    height,
                    depth
                );


            const material =
                new THREE.MeshStandardMaterial({
                    color: 0x4d5962,
                    roughness: 0.9
                });


            const object =
                new THREE.Mesh(
                    geometry,
                    material
                );


            object.position.set(
                x,
                height / 2,
                z
            );


            this.scene.add(
                object
            );
        }
    }


    update(deltaTime) {

        // Aquí conectaremos posteriormente:
        // - mapa
        // - personajes
        // - enemigos
        // - objetos
        // - efectos
    }


    render(camera) {

        if (!camera) {
            return;
        }

        this.renderer.render(
            this.scene,
            camera
        );
    }


    resize(width, height) {

        this.renderer.setSize(
            width,
            height,
            false
        );
    }


    getScene() {

        return this.scene;
    }


    destroy() {

        this.renderer.dispose();

        this.scene.traverse(
            object => {

                if (object.geometry) {
                    object.geometry.dispose();
                }

                if (object.material) {

                    if (
                        Array.isArray(
                            object.material
                        )
                    ) {

                        object.material.forEach(
                            material =>
                                material.dispose()
                        );

                    } else {

                        object.material.dispose();
                    }
                }
            }
        );
    }
}
