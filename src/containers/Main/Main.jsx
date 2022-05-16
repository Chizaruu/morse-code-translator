import { useState, useEffect } from "react";
import styles from "./Main.module.scss";
import { Translator } from "./js/Translator";
import { MorseAudio } from "./js/MorseAudio";

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
        <main className={styles.main}>
            <label htmlFor="input"> Input </label>
            <textarea value={input} id="input" onChange={handleInput} />
            <label htmlFor="output"> Output </label>
            <textarea id="output" readOnly value={output} />
            <div>
                <button onClick={handleDirection}>Change to {direction}</button>
                <button onClick={handlePlay}>Play</button>
            </div>
        </main>
    );
}
