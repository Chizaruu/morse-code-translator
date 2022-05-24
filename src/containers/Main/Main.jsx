import { useState, useEffect } from "react";
import styles from "./Main.module.scss";
import { Translator } from "./../../js/Translator";
import { MorseAudio } from "./../../js/MorseAudio";

const synth = window.speechSynthesis;
const voices = synth.getVoices();

export function Main() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [isEnglish, setState] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleInput = (e) => setInput(e.target.value);

    function handlePlay() {
        if ((isPlaying && isEnglish) || synth.speaking || input.length < 0)
            return;
        setIsPlaying(true);
        if (isEnglish) {
            const morseAudio = new MorseAudio();
            morseAudio.playString(0, input);
        } else {
            const speakText = new SpeechSynthesisUtterance(output);
            speakText.voice = voices[0];
            speakText.rate = 1;
            speakText.pitch = 1;
            synth.speak(speakText);
        }
        setTimeout(
            () => {
                setIsPlaying(false);
            },
            isEnglish ? input.length * 1000 : output.length * 500
        );
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
