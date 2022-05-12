import { useState, useEffect } from "react";
import { Translator } from "./js/Translator";

function App() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [reverse, setReverse] = useState(false);
    const [translatorInstance] = useState(new Translator());

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const handleReverse = () => {
        setReverse(!reverse);
    };

    useEffect(() => {
        setOutput(translatorInstance.translate(input, reverse));
    }, [input, reverse, translatorInstance]);

    return (
        <div>
            <header>
                <h1>Morse Code Translator</h1>
            </header>
            <main>
                <input type="text" id="input" onChange={handleInput} />
                <input type="checkbox" id="reverse" onChange={handleReverse} />
                <label htmlFor="reverse">Reverse</label>
                <button id="play">Play Audio</button>
                <div id="output">{output}</div>
            </main>
        </div>
    );
}
export default App;
