// =========================================
// NOVA ARENA
// Audio.js
// Sistema básico de audio
// =========================================

export class AudioManager {

    constructor() {

        this.context = null;

        this.masterGain = null;

        this.enabled = true;

        this.volume = 0.8;
    }


    initialize() {

        if (this.context) {
            return;
        }

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContext) {
            console.warn(
                "Audio Web no disponible."
            );

            this.enabled = false;

            return;
        }

        this.context =
            new AudioContext();

        this.masterGain =
            this.context.createGain();

        this.masterGain.gain.value =
            this.volume;

        this.masterGain.connect(
            this.context.destination
        );
    }


    resume() {

        if (!this.context) {
            this.initialize();
        }

        if (
            this.context &&
            this.context.state === "suspended"
        ) {
            this.context.resume();
        }
    }


    setVolume(value) {

        this.volume =
            Math.max(
                0,
                Math.min(
                    1,
                    value
                )
            );

        if (this.masterGain) {

            this.masterGain.gain.value =
                this.volume;
        }
    }


    playTone(
        frequency = 440,
        duration = 0.1,
        type = "sine"
    ) {

        if (!this.enabled) {
            return;
        }

        this.resume();

        if (!this.context) {
            return;
        }

        const oscillator =
            this.context.createOscillator();

        const gain =
            this.context.createGain();

        oscillator.type = type;

        oscillator.frequency.value =
            frequency;

        gain.gain.setValueAtTime(
            0.0001,
            this.context.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.15,
            this.context.currentTime + 0.01
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            this.context.currentTime + duration
        );

        oscillator.connect(gain);

        gain.connect(
            this.masterGain
        );

        oscillator.start();

        oscillator.stop(
            this.context.currentTime +
            duration
        );
    }


    playShot() {

        this.playTone(
            110,
            0.08,
            "square"
        );
    }


    playReload() {

        this.playTone(
            330,
            0.12,
            "sine"
        );
    }


    playHit() {

        this.playTone(
            180,
            0.08,
            "triangle"
        );
    }


    destroy() {

        if (this.context) {

            this.context.close();

            this.context = null;
        }

        this.masterGain = null;
    }
}
