import Utterance  from "./Utterance.js";
// import { ApiManager } from "./apiManager.js";


//Speech synthesis (text-to-speech)

const textAreaElement = document.querySelector("#textAreaSpeech");
const speakButton = document.querySelector("#speakButton");

let utterance;
let textContent;

//language: "Ko-KR", speed: 0.8, volume: ""

const makeNewUtterance = (phrase) => {
    utterance = new Utterance(phrase, "Ko-KR", 0.8, "");
};

textAreaElement.addEventListener("change", event => {
    textContent = event.target.value;
    console.log("text content", textContent, event.target.value);
});

speakButton.addEventListener("click", event => {
    console.log("utterance", utterance);
    textContent = textAreaElement.value;
    makeNewUtterance(textContent);
    utterance.speak();
});

//Speech Recognition (speech-to-text)

let grammar = "#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;"
let recognition = new webkitSpeechRecognition();
let speechRecognitionList = new webkitSpeechGrammarList();


speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "Ko-KR";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const listenButton = document.querySelector("#listenButton");
const bg = document.querySelector("html");

listenButton.addEventListener("click", event => {
    console.log("Ready to receive a color command.", event);
    recognition.start();
});

recognition.onresult = function(event) {
    console.log("event", event.results[0][0].transcript);
    let color = event.results[0][0].transcript;
    textAreaElement.value = color;
    textAreaElement.innerHTML = color;
};

recognition.onerror = () => {
    console.log("oops something went wrong");
};