// =========================================
// NOVA ARENA
// Main Entry Point
// =========================================

import { Game } from "./core/Game.js";

const game = new Game();

const menu = document.getElementById("menu");
const playButton = document.getElementById("playButton");

if (playButton) {
    playButton.addEventListener("click", () => {
        if (menu) {
            menu.style.display = "none";
        }

        game.start();
    });
}

// Evita zoom accidental en algunos dispositivos móviles.
document.addEventListener(
    "gesturestart",
    event => event.preventDefault(),
    { passive: false }
);

document.addEventListener(
    "gesturechange",
    event => event.preventDefault(),
    { passive: false }
);

document.addEventListener(
    "gestureend",
    event => event.preventDefault(),
    { passive: false }
);

console.log("Nova Arena iniciado.");
