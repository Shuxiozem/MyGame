// =========================================
// NOVA ARENA
// Input.js
// Controles de teclado y táctiles
// =========================================

export class InputManager {

    constructor(canvas) {

        this.canvas = canvas;

        this.keys = {};

        this.touch = {
            x: 0,
            y: 0,
            active: false
        };

        this.fire = false;
        this.reload = false;

        this.bindKeyboard();
        this.bindTouch();
    }


    bindKeyboard() {

        this.keyDownHandler = (event) => {

            const key =
                event.key.toLowerCase();

            this.keys[key] = true;

            if (key === "r") {
                this.reload = true;
            }

            if (
                key === " " ||
                key === "enter"
            ) {
                this.fire = true;
            }
        };


        this.keyUpHandler = (event) => {

            const key =
                event.key.toLowerCase();

            this.keys[key] = false;

            if (
                key === " " ||
                key === "enter"
            ) {
                this.fire = false;
            }
        };


        window.addEventListener(
            "keydown",
            this.keyDownHandler
        );

        window.addEventListener(
            "keyup",
            this.keyUpHandler
        );
    }


    bindTouch() {

        this.touchStartHandler =
            (event) => {

                const touch =
                    event.touches[0];

                if (!touch) {
                    return;
                }

                this.touch.active = true;

                this.touch.x =
                    touch.clientX;

                this.touch.y =
                    touch.clientY;
            };


        this.touchMoveHandler =
            (event) => {

                if (!this.touch.active) {
                    return;
                }

                const touch =
                    event.touches[0];

                if (!touch) {
                    return;
                }

                this.touch.x =
                    touch.clientX;

                this.touch.y =
                    touch.clientY;
            };


        this.touchEndHandler =
            () => {

                this.touch.active = false;

                this.touch.x = 0;
                this.touch.y = 0;
            };


        this.canvas.addEventListener(
            "touchstart",
            this.touchStartHandler,
            { passive: true }
        );

        this.canvas.addEventListener(
            "touchmove",
            this.touchMoveHandler,
            { passive: true }
        );

        this.canvas.addEventListener(
            "touchend",
            this.touchEndHandler,
            { passive: true }
        );
    }


    update() {

        // Reservado para el sistema
        // de controles móviles.
    }


    isKeyDown(key) {

        return !!this.keys[
            key.toLowerCase()
        ];
    }


    getMovement() {

        let x = 0;
        let y = 0;

        if (this.isKeyDown("a")) {
            x -= 1;
        }

        if (this.isKeyDown("d")) {
            x += 1;
        }

        if (this.isKeyDown("w")) {
            y -= 1;
        }

        if (this.isKeyDown("s")) {
            y += 1;
        }

        return {
            x,
            y
        };
    }


    isFiring() {

        return this.fire;
    }


    consumeReload() {

        if (!this.reload) {
            return false;
        }

        this.reload = false;

        return true;
    }


    getTouchPosition() {

        return {
            x: this.touch.x,
            y: this.touch.y,
            active: this.touch.active
        };
    }


    destroy() {

        window.removeEventListener(
            "keydown",
            this.keyDownHandler
        );

        window.removeEventListener(
            "keyup",
            this.keyUpHandler
        );

        this.canvas.removeEventListener(
            "touchstart",
            this.touchStartHandler
        );

        this.canvas.removeEventListener(
            "touchmove",
            this.touchMoveHandler
        );

        this.canvas.removeEventListener(
            "touchend",
            this.touchEndHandler
        );
    }
}
