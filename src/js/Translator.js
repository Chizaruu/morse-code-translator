import { morseCode } from "./morseCode";

export class Translator {
    constructor() {
        this.morseCode = morseCode;
    }

    translate = (input, reverse) =>
        !reverse ? this.englishToMorse(input) : this.morseToEnglish(input);

    englishToMorse = (input) =>
        input
            .split("")
            .reduce(
                (word, letter) =>
                    (word +=
                        (this.morseCode[letter.toLowerCase()] || "") + " "),
                ""
            )
            .trim();

    morseToEnglish = (input) =>
        input
            .split(" ")
            .reduce(
                (word, morse) =>
                    (word += Object.keys(this.morseCode).find(
                        (letter) => this.morseCode[letter] === morse
                    )),
                ""
            );
}
