import { MorseAudio } from "./MorseAudio";

describe("MorseAudio", () => {
    it("should be defined", () => {
        expect(MorseAudio).toBeDefined();
    });
    it("should connect to a target", () => {
        const ac = new AudioContext();
        const target = ac.createGain();
        const morseAudio = new MorseAudio(ac);
        morseAudio.connect(target);
        expect(morseAudio._gain.connect).toHaveBeenCalledWith(target);
    });
    it("should play a character", () => {
        const ac = new AudioContext();
        const morseAudio = new MorseAudio(ac);
        const t = 0;
        const c = ".";
        const t2 = morseAudio.playChar(t, c);
        expect(t2).toBeGreaterThan(t);
    });
    it("should play a string", () => {
        const ac = new AudioContext();
        const morseAudio = new MorseAudio(ac);
        const t = 0;
        const w = ".";
        const t2 = morseAudio.playString(t, w);
        expect(t2).toBeGreaterThan(t);
    });
});
