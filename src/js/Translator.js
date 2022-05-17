import { morseCode } from "./morseCode";

export class Translator {
    translate = (input, isEnglish) => {
        input = input.toLowerCase();
        if (this.isValidMorse(input) && input !== "") {
            return isEnglish
                ? this.englishToMorse(input)
                : this.morseToEnglish(input);
        } else if (input.length > 0) {
            return "Invalid input (unrecognized character)";
        } else {
            return "";
        }
    };

    englishToMorse = (input) =>
        input
            .split("")
            .reduce(
                (word, letter) => (word += (morseCode[letter] || "") + " "),
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
