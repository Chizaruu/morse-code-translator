import { useState, useEffect } from "react";
import { Translator } from "./js/Translator";
import { MorseAudio } from "./js/MorseAudio";

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
        <div>
            <header>
                <h1>Morse Code Translator</h1>
            </header>
            <main>
                <label htmlFor="input"> Input </label>
                <input type="textarea" id="input" onChange={handleInput} />
                <label htmlFor="reverse">Reverse</label>
                <input type="checkbox" id="reverse" onChange={handleReverse} />
                <button id="play" onClick={handlePlay}>
                    Play
                </button>
                <div id="output">{output}</div>
            </main>
        </div>
    );
}
export default App;
