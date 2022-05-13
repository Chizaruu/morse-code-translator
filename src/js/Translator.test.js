import { Translator } from "./Translator";

describe("Translator", () => {
    it("should be defined", () => {
        expect(Translator).toBeDefined();
    });
    it("should be a class", () => {
        expect(typeof Translator).toBe("function");
    });
    it("should have a translate method", () => {
        const translator = new Translator();
        expect(translator.translate).toBeDefined();
    });
    it("should show invalid input if the input is not valid", () => {
        const translator = new Translator();
        expect(translator.translate("invalid`")).toBe(
            "Invalid input (unrecognized character)"
        );
        expect(translator.translate("timT@ms$``")).toBe(
            "Invalid input (unrecognized character)"
        );
        expect(translator.translate(">hi~")).toBe(
            "Invalid input (unrecognized character)"
        );
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
