// =========================================
// NOVA ARENA
// CameraController.js
// Cámara siguiendo al jugador
// =========================================

export class PlayerCameraController {

    constructor(player, camera) {

        this.player = player;
        this.camera = camera;

        this.enabled = true;

        this.followSmoothness = 0.12;
    }


    update(deltaTime) {

        if (!this.enabled) {
            return;
        }

        if (!this.player || !this.camera) {
            return;
        }

        const position =
            this.player.getPosition();

        this.camera.lookAt(
            position.x,
            position.y + 1.2,
            position.z
        );
    }


    setEnabled(value) {

        this.enabled = !!value;
    }


    destroy() {

        this.player = null;
        this.camera = null;
    }
}
