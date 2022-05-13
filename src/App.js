import { useState, useEffect } from "react";
import { Translator } from "./js/Translator";
import { MorseAudio } from "./js/MorseAudio";
import styles from "./App.module.scss";

function App() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [reverse, setReverse] = useState(false);

    function handleInput(e) {
        setInput(e.target.value);
    }

    function handleReverse() {
        setReverse(!reverse);
    }

    function handlePlay() {
        const audioCtx = new AudioContext();
        const morseAudio = new MorseAudio(audioCtx);
        morseAudio.connect(audioCtx.destination);
        morseAudio.playString(0, reverse ? output : input);
    }

    useEffect(() => {
        setOutput(new Translator().translate(input, reverse));
    }, [input, reverse]);

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
                    <button onClick={handleReverse}>Reverse</button>
                    <button onClick={handlePlay}>Play</button>
                </div>
            </main>
            <footer>
                <p>
                    Made with <span title="Latvia!~">❤️</span> by Abdul-Kadir
                    Coskun{" "}
                </p>
            </footer>
        </div>
    );
}
export default App;
