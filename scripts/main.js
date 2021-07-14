// import Utterance  from "./Utterance.js";
import { speak } from "./Speak.js";
import { translatePhrase, transliteratePhrase } from "./apiManager.js";
// import { ApiManager } from "./apiManager.js";


//Speech synthesis (text-to-speech): The SpeechSynthesis interface of the Web Speech API is the controller interface for the speech service; this can be used to retrieve information about the synthesis voices available on the device, start and pause speech, and other commands besides.

const textAreaElement = document.querySelector("#textAreaSpeech");
const translatedAreaElement = document.querySelector("#translatedAreaSpeech");
const speakButton = document.querySelector("#speakButton");
const listenButton = document.querySelector("#listenButton");
const listenToAnswerButton = document.querySelector("#listenToAnswerButton");
const selectLanguageDropdown = document.querySelector("#selectLanguageDropdown");
const bg = document.querySelector("html");



let textContent;
let language = "ko";
let languageCode = "ko-KR"
let languageCodesArray = ["en-US", "ko-KR", "es-MX", "ja-JP"]

//language: "Ko-KR", speed: 0.8, volume: ""


textAreaElement.addEventListener("change", event => {
    // textContent = event.target.value;
    translatePhrase(language, textAreaElement.value).then((translation) => {
        transliteratePhrase(language, translation).then((transliteration) => {
            translatedAreaElement.value = `${translation} Pronunciation: ${transliteration}`
        });
    });
    console.log("text content", textContent, event.target.value);
});

speakButton.addEventListener("click", event => {
    console.log("value", translatedAreaElement.value.split(" Pronunciation")[0])
    textContent = translatedAreaElement.value.split(" Pronunciation")[0];
    speak(textContent, language); //speak() method adds an utterance to the utterance queue; it will be spoken when any other utterances queued before it have been spoken.
});

// vvv class way vvv

// let utterance;

// const makeNewUtterance = (phrase) => {
//     //instantiating a new Utterance class with the constructors as parameters
//     utterance = new Utterance(phrase, "Ko-KR", 0.8, "");
// };

// speakButton.addEventListener("click", event => {
//     console.log("utterance", utterance);
//     textContent = textAreaElement.value;
//     makeNewUtterance(textContent);
//     utterance.speak(); //speak() method adds an utterance to the utterance queue; it will be spoken when any other utterances queued before it have been spoken.
// });

// ^^^ class way ^^^

//Speech Recognition (speech-to-text): The SpeechRecognition interface of the Web Speech API is the controller interface for the recognition service; this also handles the SpeechRecognitionEvent sent from the recognition service.
//Speech recognition involves receiving speech through a device's microphone, which is then checked by a speech recognition service against a list of grammar (basically, the vocabulary you want to have recognized in a particular app.) When a word or phrase is successfully recognized, it is returned as a result (or list of results) as a text string, and further actions can be initiated as a result.
//The grammar format used is JSpeech Grammar Format(JSGF)
//The lines are separated by semi-colons, just like in JavaScript. The first line — #JSGF V1.0; — states the format and version used. This always needs to be included first.
//The second line indicates a type of term that we want to recognize. public declares that it is a public rule, the string in angle brackets defines the recognized name for this term (color), and the list of items that follow the equals sign are the alternative values that will be recognized and accepted as appropriate values for the term. Note how each is separated by a pipe character.
let grammar = "#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;"
let recognition = new webkitSpeechRecognition(); //The next thing to do is define a speech recogntion instance to control the recognition for our application. This is done using the SpeechRecognition() constructor.
let speechRecognitionList = new webkitSpeechGrammarList(); //We also create a new speech grammar list to contain our grammar, using the SpeechGrammarList() constructor.
let recognition2 = new webkitSpeechRecognition();

speechRecognitionList.addFromString(grammar, 1); //We add our grammar to the list using the SpeechGrammarList.addFromString() method. This accepts as parameters the string we want to add, plus optionally a weight value that specifies the importance of this grammar in relation of other grammars available in the list (can be from 0 to 1 inclusive.) The added grammar is available in the list as a SpeechGrammar object instance.
recognition.grammars = speechRecognitionList; //Returns and sets a collection of SpeechGrammar objects that represent the grammars that will be understood by the current SpeechRecognition
recognition.continuous = false; //Controls whether continuous results are returned for each recognition, or only a single result. Defaults to single (false.)
recognition.lang = languageCode; //Returns and sets the language of the current SpeechRecognition. If not specified, this defaults to the HTML lang attribute value, or the user agent's language setting if that isn't set either.
recognition.interimResults = false; //Controls whether interim results should be returned (true) or not (false.) Interim results are results that are not yet final (e.g. the SpeechRecognitionResult.isFinal property is false.)
recognition.maxAlternatives = 1; //Sets the maximum number of SpeechRecognitionAlternatives provided per result. The default value is 1.


listenButton.addEventListener("click", event => {
    console.log("Ready to receive a color command.", event);
    //start() method is fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with 
    //the current SpeechRecognition.
    recognition2.start();
});

listenToAnswerButton.addEventListener("click", event => {
    console.log("Ready to receive a color command.", event);
    //start() method is fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with 
    //the current SpeechRecognition.
    recognition.start();
});

recognition.onresult = function(event) {
    //On result property of recognition is fired when the speech recognition service returns a result — a word or phrase has been positively 
    //recognized and this has been communicated back to the app
    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
    let answerGiven = event.results[0][0].transcript;
    console.log('anser given', answerGiven.toString().length, recognition.lang, 'value', translatedAreaElement.value.split(" Pronunciation")[0]);
    if (answerGiven.includes(translatedAreaElement.value.split(" Pronunciation")[0])) {
        alert(`well done! ${answerGiven}`);     
    } else {
        alert(`try again ${answerGiven}`);
        speak("try again, you said", "en")
        speak(`${answerGiven}`, language);
    }
    // console.log("event", event.results[0][0].transcript);
    // let color = event.results[0][0].transcript;
    // textAreaElement.value = color;
    // textAreaElement.innerHTML = color;
};

recognition2.onresult = function(event) {
    let answerGiven = event.results[0][0].transcript;
    textAreaElement.value = answerGiven;
    translatePhrase(language, textAreaElement.value).then((translation) => {
        transliteratePhrase(language, translation).then((transliteration) => {
            translatedAreaElement.value = `${translation} Pronunciation: ${transliteration}`
        });
    });
};

recognition.onerror = () => {
    console.log("oops something went wrong");
    //onerror property is fired when a speech recognition error occurs.
};

selectLanguageDropdown.addEventListener("change", event => {
    language = event.target.value;
    languageCode = languageCodesArray.filter((languageCode) => {
        if (languageCode.includes(language)) {
            console.log('language code', languageCode);
            return languageCode;
        } 
    });
    recognition.lang = languageCode;
    translatePhrase(language, textAreaElement.value).then((translation) => {
        transliteratePhrase(language, translation).then((transliteration) => {
            translatedAreaElement.value = `${translation} Pronunciation: ${transliteration}`
        });
    });
});


//Below are examples to incorporate within code for error handling:
//Handling errors and unrecognized speech
//The last two handlers are there to handle cases where speech was recognized that wasn't in the defined grammar, or an error occurred. SpeechRecognition.onnomatch seems to be supposed to handle the first case mentioned, although note that at the moment it doesn't seem to fire correctly; it just returns whatever was recognized anyway:

// recognition.onnomatch = function(event) {
//   diagnostic.textContent = 'I didnt recognize that color.';
// }
// Copy to Clipboard
// SpeechRecognition.onerror handles cases where there is an actual error with the recognition successfully — the SpeechRecognitionError.error property contains the actual error returned:

// recognition.onerror = function(event) {
//   diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
// }

// transliteration reference
// transliteratePhrase("ko", "안녕하세요").then((transliteration) => {
//     console.log('transliteration', transliteration);
// })

