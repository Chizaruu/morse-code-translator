import { useState, useEffect } from "react";
import styles from "./Main.module.scss";
import { Translator } from "./../../js/Translator";
import { MorseAudio } from "./../../js/MorseAudio";

export function Main() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [direction, SetDirection] = useState("Morse");

    function handleInput(e) {
        setInput(e.target.value);
    }

    function handleDirection() {
        SetDirection(direction === "Morse" ? "English" : "Morse");

        const newInput = output;
        const newOutput = input;

        setInput(newInput);
        setOutput(newOutput);
    }

    function handlePlay() {
        const audioCtx = new AudioContext();
        const morseAudio = new MorseAudio(audioCtx);
        morseAudio.connect(audioCtx.destination);
        morseAudio.playString(0, direction === "Morse" ? input : output);
    }

    useEffect(() => {
        setOutput(
            new Translator().translate(
                input,
                direction !== "Morse" ? true : false
            )
        );
    }, [input, direction]);

    return (
        <main className={styles}>
            <div>
                <div className={styles.textarea_container}>
                    <label htmlFor="input">
                        Input ({direction !== "English" ? "English" : "Morse"})
                    </label>
                    <textarea value={input} id="input" onChange={handleInput} />
                </div>
                <div className={styles.buttons_container}>
                    <h3>Currently Translating to {direction}</h3>
                    <button onClick={handleDirection}>Switch Mode</button>
                    <button onClick={handlePlay}>Play</button>
                </div>
                <div className={styles.textarea_container}>
                    <label htmlFor="output"> Output ({direction}) </label>
                    <textarea id="output" readOnly value={output} />
                </div>
            </div>
        </main>
    );
}
