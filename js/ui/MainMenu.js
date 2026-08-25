// =========================================
// NOVA ARENA
// MainMenu.js
// Menú principal
// =========================================

export class MainMenu {

    constructor(onPlay = null) {

        this.menu =
            document.getElementById("menu");

        this.playButton =
            document.getElementById("playButton");

        this.onPlay = onPlay;

        this.bindEvents();
    }


    bindEvents() {

        if (!this.playButton) {
            return;
        }

        this.clickHandler = () => {

            this.hide();

            if (typeof this.onPlay === "function") {
                this.onPlay();
            }
        };

        this.playButton.addEventListener(
            "click",
            this.clickHandler
        );
    }


    show() {

        if (!this.menu) {
            return;
        }

        this.menu.style.display = "flex";
    }


    hide() {

        if (!this.menu) {
            return;
        }

        this.menu.style.display = "none";
    }


    isVisible() {

        if (!this.menu) {
            return false;
        }

        return this.menu.style.display !== "none";
    }


    destroy() {

        if (
            this.playButton &&
            this.clickHandler
        ) {

            this.playButton.removeEventListener(
                "click",
                this.clickHandler
            );
        }

        this.menu = null;
        this.playButton = null;
        this.onPlay = null;
    }
}
