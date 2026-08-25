// =========================================
// NOVA ARENA
// main.js
// Punto de entrada del juego
// =========================================

import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import { InputManager }
    from "./core/Input.js";

import { AudioManager }
    from "./core/Audio.js";

import { Player }
    from "./player/Player.js";

import { PlayerController }
    from "./player/Controller.js";

import { WeaponManager }
    from "./weapons/WeaponManager.js";

import { Rifle }
    from "./weapons/Rifle.js";

import { Pistol }
    from "./weapons/Pistol.js";

import { EnemyManager }
    from "./enemies/EnemyManager.js";

import { GameMap }
    from "./world/Map.js";

import { Environment }
    from "./world/Environment.js";

import { Buildings }
    from "./world/Buildings.js";

import { SpawnPoints }
    from "./world/SpawnPoints.js";

import { HUD }
    from "./ui/HUD.js";

import { MainMenu }
    from "./ui/MainMenu.js";

import { MatchScreen }
    from "./ui/MatchScreen.js";

import { Inventory }
    from "./ui/Inventory.js";

import { InventorySystem }
    from "./systems/InventorySystem.js";

import { DamageSystem }
    from "./systems/DamageSystem.js";

import { LootSystem }
    from "./systems/LootSystem.js";

import { MatchSystem }
    from "./systems/MatchSystem.js";


// =========================================
// VARIABLES
// =========================================

let renderer;
let scene;
let camera;

let input;
let audio;

let player;
let controller;

let weapons;
let enemies;

let gameMap;
let environment;
let buildings;
let spawnPoints;

let hud;
let menu;
let matchScreen;

let inventory;
let inventorySystem;

let damageSystem;
let lootSystem;
let matchSystem;

let running = false;

let lastTime = 0;


// =========================================
// INICIO
// =========================================

function init() {

    const canvas =
        document.getElementById(
            "gameCanvas"
        );

    if (!canvas) {
        console.error(
            "No se encontró gameCanvas."
        );

        return;
    }


    // ESCENA

    scene =
        new THREE.Scene();

    scene.background =
        new THREE.Color(
            0x10151c
        );


    // CÁMARA

    camera =
        new THREE.PerspectiveCamera(
            70,
            window.innerWidth /
            window.innerHeight,
            0.1,
            500
        );

    camera.position.set(
        0,
        8,
        10
    );


    // RENDERER

    renderer =
        new THREE.WebGLRenderer({
            canvas,
            antialias: true
        });

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    // LUCES

    const ambient =
        new THREE.AmbientLight(
            0xffffff,
            1.5
        );

    scene.add(ambient);


    const sun =
        new THREE.DirectionalLight(
            0xffffff,
            2
        );

    sun.position.set(
        20,
        30,
        10
    );

    scene.add(sun);


    // SISTEMAS

    input =
        new InputManager(canvas);

    audio =
        new AudioManager();

    gameMap =
        new GameMap(scene);

    environment =
        new Environment(scene);

    buildings =
        new Buildings(scene);

    spawnPoints =
        new SpawnPoints();


    // JUGADOR

    const spawn =
        spawnPoints
            .getPlayerSpawn();

    player =
        new Player(scene);

    player.spawn(
        spawn.x,
        spawn.z
    );


    controller =
        new PlayerController(
            player,
            input
        );


    // ARMAS

    weapons =
        new WeaponManager();

    weapons.addWeapon(
        new Rifle()
    );

    weapons.addWeapon(
        new Pistol()
    );


    // ENEMIGOS

    enemies =
        new EnemyManager(scene);


    for (let i = 0; i < 5; i++) {

        const enemySpawn =
            spawnPoints
                .getEnemySpawn(i);

        enemies.spawn({

            x: enemySpawn.x,

            z: enemySpawn.z,

            health: 100,

            speed: 1.5

        });
    }


    // UI

    hud =
        new HUD();

    menu =
        new MainMenu(
            startGame
        );

    matchScreen =
        new MatchScreen();


    // INVENTARIO

    inventory =
        new Inventory();

    inventorySystem =
        new InventorySystem(
            inventory
        );


    // SISTEMAS DE COMBATE

    damageSystem =
        new DamageSystem();

    lootSystem =
        new LootSystem();

    matchSystem =
        new MatchSystem();


    matchSystem.setPlayerCount(
        1
    );


    // RESIZE

    window.addEventListener(
        "resize",
        resize
    );


    menu.show();

    animate();
}


// =========================================
// COMENZAR PARTIDA
// =========================================

function startGame() {

    if (running) {
        return;
    }

    running = true;

    matchSystem.start();

    matchScreen.show();

    matchScreen.setStatus(
        "Partida iniciada"
    );

    audio.initialize();

    audio.resume();

    hud.show();

    lastTime =
        performance.now();
}


// =========================================
// ACTUALIZAR
// =========================================

function update(deltaTime) {

    if (!running) {
        return;
    }


    input.update();


    // JUGADOR

    controller.update(
        deltaTime
    );


    // ENEMIGOS

    enemies.update(
        deltaTime,
        player.getPosition()
    );


    // PARTIDA

    matchSystem.update(
        deltaTime
    );


    matchScreen.setPlayers(
        enemies.getAliveCount() + 1
    );

    matchScreen.setTimer(
        matchSystem.getElapsedTime()
    );


    // HUD

    hud.setHealth(
        player.getHealth(),
        player.maxHealth
    );

    hud.setAmmo(
        weapons.getCurrentAmmo()
    );

    hud.setWeapon(
        weapons
            .getCurrentWeapon()
            ?.getName() ||
        "Sin arma"
    );
}


// =========================================
// RENDER
// =========================================

function render() {

    if (!renderer || !scene || !camera) {
        return;
    }

    const position =
        player.getPosition();

    camera.position.x =
        position.x;

    camera.position.z =
        position.z + 10;

    camera.position.y =
        position.y + 7;

    camera.lookAt(
        position.x,
        position.y + 1,
        position.z
    );


    renderer.render(
        scene,
        camera
    );
}


// =========================================
// LOOP
// =========================================

function animate(time) {

    requestAnimationFrame(
        animate
    );

    if (!lastTime) {
        lastTime = time;
    }

    const deltaTime =
        Math.min(
            (time - lastTime) / 1000,
            0.05
        );

    lastTime = time;

    update(deltaTime);

    render();
}


// =========================================
// RESIZE
// =========================================

function resize() {

    if (!camera || !renderer) {
        return;
    }

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
}


// =========================================
// ARRANCAR
// =========================================

init();
