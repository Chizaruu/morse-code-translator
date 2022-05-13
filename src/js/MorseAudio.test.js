import { MorseAudio } from "./MorseAudio";
import { AudioContext, registrar } from "standardized-audio-context-mock";

describe("MorseAudio", () => {
    let audioCtx;
    let morseAudio;

    afterEach(() => registrar.reset());

    beforeEach(() => {
        audioCtx = new AudioContext();
        morseAudio = new MorseAudio(audioCtx);
    });

    it("should be defined", () => {
        expect(MorseAudio).toBeDefined();
    });

    it("should connect to a target", () => {
        const target = audioCtx.createGain();
        const spy = jest.spyOn(morseAudio, "connect");
        morseAudio.connect(target);
        expect(spy).toHaveBeenCalledWith(target);
    });
    it("should play a character", () => {
        const t = 0;
        const c = ".";
        const spy = jest.spyOn(morseAudio, "playChar");
        morseAudio.playChar(t, c);
        expect(spy).toHaveBeenCalled();
    });
    it("should play a string", () => {
        const t = 0;
        const w = ".";
        const spy = jest.spyOn(morseAudio, "playString");
        morseAudio.playString(t, w);
        expect(spy).toHaveBeenCalled();
    });
});
