import { morseCode } from "./morseCode";

export class Translator {
    translate = (input, reverse) => {
        if (this.isValidMorse(input)) {
            return !reverse
                ? this.englishToMorse(input)
                : this.morseToEnglish(input);
        } else if (input.length > 0) {
            return "Invalid input (unrecognized character)";
        }
    };

    englishToMorse = (input) =>
        input
            .split("")
            .reduce(
                (word, letter) =>
                    (word += (morseCode[letter.toLowerCase()] || "") + " "),
                ""
            )
            .trim();

    morseToEnglish = (input) =>
        input
            .split(" ")
            .reduce(
                (word, morse) =>
                    (word += Object.keys(morseCode).find(
                        (letter) => morseCode[letter] === morse
                    )),
                ""
            );

    isValidMorse = (input) => {
        const morse = input.split("");

        for (let i in morse) {
            if (!morseCode[morse[i]]) {
                return false;
            }
        }
        return true;
    };
}
