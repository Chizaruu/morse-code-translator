import { Translator } from "./Translator";

describe("Translator", () => {
    it("should be defined", () => {
        expect(Translator).toBeDefined();
    });
    it("should translate a word", () => {
        const translator = new Translator();
        const input = "hello";
        const output = translator.translate(input, false);
        expect(output).toBe(".... . .-.. .-.. ---");
    });
    it("should translate a word in reverse", () => {
        const translator = new Translator();
        const input = ".... . .-.. .-.. ---";
        const output = translator.translate(input, true);
        expect(output).toBe("hello");
    });
    it("should translate a sentence", () => {
        const translator = new Translator();
        const input = "hello world";
        const output = translator.translate(input, false);
        expect(output).toBe(".... . .-.. .-.. --- / .-- --- .-. .-.. -..");
    });
    it("should translate a sentence in reverse", () => {
        const translator = new Translator();
        const input = ".... . .-.. .-.. --- / .-- --- .-. .-.. -..";
        const output = translator.translate(input, true);
        expect(output).toBe("hello world");
    });
});
