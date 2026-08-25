// =========================================
// NOVA ARENA
// MatchSystem.js
// Estado general de la partida
// =========================================

export class MatchSystem {

    constructor() {

        this.state = "waiting";

        this.elapsedTime = 0;

        this.players = 0;

        this.maxPlayers = 20;
    }


    start() {

        this.state = "playing";

        this.elapsedTime = 0;
    }


    update(deltaTime) {

        if (this.state !== "playing") {
            return;
        }

        this.elapsedTime += deltaTime;
    }


    pause() {

        if (this.state === "playing") {
            this.state = "paused";
        }
    }


    resume() {

        if (this.state === "paused") {
            this.state = "playing";
        }
    }


    end() {

        this.state = "finished";
    }


    reset() {

        this.state = "waiting";

        this.elapsedTime = 0;

        this.players = 0;
    }


    setPlayerCount(count) {

        this.players = Math.max(
            0,
            Math.min(
                this.maxPlayers,
                Number(count) || 0
            )
        );
    }


    getState() {

        return this.state;
    }


    getElapsedTime() {

        return this.elapsedTime;
    }


    getPlayerCount() {

        return this.players;
    }


    isPlaying() {

        return this.state === "playing";
    }
}
