import { morseCode } from "./morseCode";

export class Translator {
    translate = (input, isEnglish) => {
        input = input.toLowerCase();
        if (this.isValidMorse(input) && input !== "") {
            let translation = isEnglish
                ? this.englishToMorse(input)
                : this.morseToEnglish(input);
            return (translation =
                translation.charAt(0).toUpperCase() + translation.slice(1));
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
