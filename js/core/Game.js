// =========================================
// NOVA ARENA
// Game.js
// Control principal del juego
// =========================================

import { SceneManager } from "./Scene.js";
import { CameraManager } from "./Camera.js";
import { InputManager } from "./Input.js";
import { AudioManager } from "./Audio.js";

export class Game {

    constructor() {

        this.canvas = document.getElementById("game");

        if (!this.canvas) {
            throw new Error("No se encontró el canvas #game");
        }

        this.running = false;
        this.lastTime = 0;

        this.sceneManager = new SceneManager(this.canvas);
        this.cameraManager = new CameraManager(this.canvas);
        this.inputManager = new InputManager(this.canvas);
        this.audioManager = new AudioManager();

        this.resizeHandler = () => {
            this.resize();
        };

        window.addEventListener(
            "resize",
            this.resizeHandler
        );

        this.resize();

        console.log("Game creado.");
    }


    start() {

        if (this.running) {
            return;
        }

        this.running = true;

        this.lastTime = performance.now();

        console.log("Nova Arena iniciado.");

        requestAnimationFrame(
            this.loop.bind(this)
        );
    }


    stop() {

        this.running = false;

        console.log("Nova Arena detenido.");
    }


    loop(currentTime) {

        if (!this.running) {
            return;
        }

        const deltaTime =
            Math.min(
                (currentTime - this.lastTime) / 1000,
                0.05
            );

        this.lastTime = currentTime;

        this.update(deltaTime);

        this.render();

        requestAnimationFrame(
            this.loop.bind(this)
        );
    }


    update(deltaTime) {

        this.inputManager.update(deltaTime);

        this.sceneManager.update(
            deltaTime
        );

        this.cameraManager.update(
            deltaTime
        );
    }


    render() {

        this.sceneManager.render(
            this.cameraManager.camera
        );
    }


    resize() {

        const width =
            window.innerWidth;

        const height =
            window.innerHeight;

        this.cameraManager.resize(
            width,
            height
        );

        this.sceneManager.resize(
            width,
            height
        );
    }


    destroy() {

        this.stop();

        window.removeEventListener(
            "resize",
            this.resizeHandler
        );

        this.inputManager.destroy();

        this.audioManager.destroy();

        this.sceneManager.destroy();

        this.cameraManager.destroy();

        console.log(
            "Nova Arena destruido."
        );
    }
}
