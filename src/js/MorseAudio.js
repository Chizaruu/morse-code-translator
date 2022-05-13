import { morseCode } from "./morseCode";

export class MorseAudio {
    constructor(ac = new AudioContext(), rate = 20) {
        this._oscillator = ac.createOscillator();
        this._gain = ac.createGain();

        this._gain.gain.value = 0;
        this._oscillator.frequency.value = 300;

        this._oscillator.connect(this._gain);

        this._dot = 1.2 / rate;

        this._oscillator.start(0);

        this._gain.connect(ac.destination);
    }

    connect(target) {
        return this._gain.connect(target);
    }
    playChar(t, c) {
        for (var i = 0; i < c.length; i++) {
            switch (c[i]) {
                case ".":
                    this._gain.gain.setValueAtTime(1.0, t);
                    t += this._dot;
                    this._gain.gain.setValueAtTime(0.0, t);
                    break;
                case "-":
                    this._gain.gain.setValueAtTime(1.0, t);
                    t += 3 * this._dot;
                    this._gain.gain.setValueAtTime(0.0, t);
                    break;
                default:
                    break;
            }
            t += this._dot;
        }
        return t;
    }

    playString(t, w) {
        for (var i = 0; i < w.length; i++) {
            t = this.playChar(t, morseCode[w[i].toLowerCase()]);
            t += this._dot;

            if (w[i] !== " ") t += this._dot;

            t += this._dot;

            if (i < w.length - 1) t += this._dot;

            t += this._dot;
        }
        return t;
    }
}
