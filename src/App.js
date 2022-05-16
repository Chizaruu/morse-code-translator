import { useState, useEffect } from "react";
import { Translator } from "./js/Translator";
import { MorseAudio } from "./js/MorseAudio";
import styles from "./App.module.scss";

function App() {
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
        <div className={styles.App}>
            <header>
                <h1>Morse Code Translator</h1>
            </header>
            <main>
                <label htmlFor="input"> Input </label>
                <textarea value={input} id="input" onChange={handleInput} />
                <label htmlFor="output"> Output </label>
                <textarea id="output" readOnly value={output} />
                <div>
                    <button onClick={handleDirection}>
                        Change to {direction}
                    </button>
                    <button onClick={handlePlay}>Play</button>
                </div>
            </main>
            <footer>
                <p>
                    Made with <span title="Latvia!~">❤️</span> by Abdul-Kadir
                    Coskun
                </p>
            </footer>
        </div>
    );
}
export default App;
