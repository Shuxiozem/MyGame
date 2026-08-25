// =========================================
// NOVA ARENA
// MatchScreen.js
// Estado visual de la partida
// =========================================

export class MatchScreen {

    constructor() {

        this.visible = false;

        this.container =
            document.getElementById("matchScreen");

        this.statusElement =
            document.getElementById("matchStatus");

        this.playersElement =
            document.getElementById("playerCount");

        this.timerElement =
            document.getElementById("matchTimer");
    }


    show() {

        this.visible = true;

        if (this.container) {
            this.container.style.display = "block";
        }
    }


    hide() {

        this.visible = false;

        if (this.container) {
            this.container.style.display = "none";
        }
    }


    setStatus(text) {

        if (this.statusElement) {
            this.statusElement.textContent =
                text || "";
        }
    }


    setPlayers(count) {

        if (this.playersElement) {
            this.playersElement.textContent =
                String(Math.max(0, count || 0));
        }
    }


    setTimer(seconds) {

        const value =
            Math.max(
                0,
                Math.floor(Number(seconds) || 0)
            );

        const minutes =
            Math.floor(value / 60);

        const remaining =
            value % 60;

        const formatted =
            `${String(minutes).padStart(2, "0")}:` +
            `${String(remaining).padStart(2, "0")}`;

        if (this.timerElement) {
            this.timerElement.textContent =
                formatted;
        }
    }


    isVisible() {

        return this.visible;
    }
}
