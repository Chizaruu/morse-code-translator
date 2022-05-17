import { useState, useEffect } from "react";
import styles from "./Main.module.scss";
import { Translator } from "./../../js/Translator";
import { MorseAudio } from "./../../js/MorseAudio";

export function Main() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [isEnglish, setState] = useState(true);

    function handleInput(e) {
        setInput(e.target.value);
    }

    function handlePlay() {
        if (input.length > 0) {
            const audioCtx = new AudioContext();
            const morseAudio = new MorseAudio(audioCtx);
            morseAudio.connect(audioCtx.destination);
            morseAudio.playString(0, isEnglish ? output : input);
        }
    }
    useEffect(() => {
        if (input.length > 0)
            if (input.match(/(^[a-zA-Z0-9])/)) setState(true);
            else setState(false);
        setOutput(new Translator().translate(input, isEnglish));
    }, [input, isEnglish]);

    return (
        <main className={styles}>
            <div>
                <div className={styles.textarea_container}>
                    <label htmlFor="input">
                        Input ({isEnglish ? "English" : "Morse"})
                    </label>
                    <textarea value={input} id="input" onChange={handleInput} />
                </div>
                <div className={styles.buttons_container}>
                    <h3>
                        {input !== ""
                            ? `Currently Translating to ${
                                  isEnglish ? "Morse" : "English"
                              }`
                            : "~ Input a string to translate ~"}
                    </h3>
                    <button onClick={handlePlay}>Play</button>
                </div>
                <div className={styles.textarea_container}>
                    <label htmlFor="output">
                        Output ({isEnglish ? "Morse" : "English"})
                    </label>
                    <textarea id="output" readOnly value={output} />
                </div>
            </div>
        </main>
    );
}
