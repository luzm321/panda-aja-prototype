import { speak } from "./Speak.js";
import { translatePhrase, transliteratePhrase } from "./apiManager.js";


//Speech synthesis (text-to-speech): The SpeechSynthesis interface of the Web Speech API is the controller interface for the speech service; 
//this can be used to retrieve information about the synthesis voices available on the device, start and pause speech, and other commands.

const textAreaElement = document.querySelector("#textAreaSpeech");
const translatedAreaElement = document.querySelector("#translatedAreaSpeech");
const speakButton = document.querySelector("#speakButton");
const listenButton = document.querySelector("#listenButton");
const listenToAnswerButton = document.querySelector("#listenToAnswerButton");
const selectLanguageDropdown = document.querySelector("#selectLanguageDropdown");
const bg = document.querySelector("html");



let textContent;
// these are the default codes the app starts out with.
let languageCode = "ko";
let languageCountryCode = "ko-KR"
let languageTransliterationCode = "Kore"
// this is an array of some of the languageCountryCodes for the speech recognition from the web speech api
let languageCountryCodesArray = ["en-US", "ko-KR", "es-MX", "ja-JP"]

//language: "Ko-KR", speed: 0.8, volume: ""


// the purpose of this event listener is to track the change done to the first text area where the user will put the English phrase he/she wants 
//in the app to translate.
textAreaElement.addEventListener("change", event => {
    // it grabs the value of the text area and sends it to the translatePhrase() call, along with the languageCode that was set with the dropdown
    translatePhrase(languageCode, textAreaElement.value).then((translation) => {
        // after the value has been translated it returns and if the transliteration code is not Latn then it proceeds to transliterate
        if (languageTransliterationCode !== 'Latn') {
            // it transliterates the value once it has been translated using the languageCode and transliterationCode that was set by changing the
            // dropdown (the method for that is down in the selectLanguageDropdown.addEventListener()).
            transliteratePhrase(languageCode, translation, languageTransliterationCode).then((transliteration) => {
                // if the transliteration code isn't Latn (Korean and Japanese) then display both translation and transliteration
                translatedAreaElement.value = `${translation} Pronunciation: ${transliteration}`
            });
            } else {
                // if the transliteration code was Latn (Spanish or English) only display the translation
                translatedAreaElement.value = `${translation}`
            }
    });
    console.log("text content", textContent, event.target.value);
});

speakButton.addEventListener("click", event => {
    console.log("value", translatedAreaElement.value.split(" Pronunciation")[0])
    textContent = translatedAreaElement.value.split(" Pronunciation")[0];
    speak(textContent, languageCode); //speak() method adds an utterance to the utterance queue; it will be spoken when any other utterances queued before it have been spoken.
});


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
recognition.lang = languageCountryCode; //Returns and sets the language of the current SpeechRecognition. If not specified, this defaults to the HTML lang attribute value, or the user agent's language setting if that isn't set either.
recognition.interimResults = false; //Controls whether interim results should be returned (true) or not (false.) Interim results are results that are not yet final (e.g. the SpeechRecognitionResult.isFinal property is false.)
recognition.maxAlternatives = 1; //Sets the maximum number of SpeechRecognitionAlternatives provided per result. The default value is 1.


listenButton.addEventListener("click", event => {
    console.log("Ready to receive a color command.", event);
    //start() method is fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with 
    //the current SpeechRecognition.
    recognition2.start();
});

// this event listener is attached to the "Click to test yourself button"
listenToAnswerButton.addEventListener("click", event => {
    console.log("Ready to receive a color command.", event);
    //start() method is fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with 
    //the current SpeechRecognition.
    recognition.start();
});


// this function is attached to the test yourself button
recognition.onresult = (event) => {
    //On result property/method of recognition class is fired when the speech recognition service returns a result — a word or phrase has been 
    //positively recognized and this has been communicated back to the app
    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
    let answerGiven = event.results[0][0].transcript;
    console.log('answer given', answerGiven, recognition.lang, 'value', translatedAreaElement.value.split(" Pronunciation")[0]);
    if (answerGiven.includes(translatedAreaElement.value.split(" Pronunciation")[0])) {
        alert(`well done! ${answerGiven}`);     
    } else {
        alert(`try again ${answerGiven}`);
        speak("try again, you said", "en")
        speak(`${answerGiven}`, languageCode);
    }
};

// the purpose of this function is to perform an action once finished listening to the user
recognition2.onresult = (event) => {
    console.log('on result', event);
    // to access the speech that the user uttered you have to access the event's results, its an array within an array, and then you select the
    // transcript property
    let answerGiven = event.results[0][0].transcript;
    // we will put that which the user said inside the first text area
    textAreaElement.value = answerGiven;
    // then we want to translate it using the language code which is ko as default unless the user changes the drop down to a different language
    translatePhrase(languageCode, textAreaElement.value).then((translation) => {
        // if the transliteration code that we got along with the language code from the drop down is Latn then do not transliterate
        if (languageTransliterationCode !== 'Latn') {
            // if the language isnt spanish or english it proceeds to transliterate using the language code, the translation of what the user spoke
            // and the transliteration code
            transliteratePhrase(languageCode, translation, languageTransliterationCode).then((transliteration) => {
                // then it displays it in the second text area
                translatedAreaElement.value = `${translation} Pronunciation: ${transliteration}`
            });
        } else {
            // if the transliteration code was Latn, so if the language was spanish or english then it just translates it and displays it.
                translatedAreaElement.value = `${translation}`
        }
    });
};

recognition.onerror = () => {
    console.log("oops something went wrong");
    //onerror property is fired when a speech recognition error occurs.
};

// function below adds an event listener of change to the select language dropdown
// this function is doing the following things:
// 1) Gets the 2 digit language code and the 4 digit language transliteration code ex: 'ko' and 'Kore'
// 2) It filters through the language country codes to find the one that includes the 2 digit language code ex: 'ko-KR' includes 'ko'
// 3) It set the language for the speech recognition on the second text area so that it can properly display the language.
// 4) It calls the translatePhrase method to translate the phrase in the first text area where the user either spoke or typed in English.
// 5) It calls the transliteratePhrase method to transliterate the phrase once it has been translated.
// 6) It has a condition, if the transliteration is latin ex: Latn then it doesn't transliterate.
// 7) It displays in the second text area the translation and depending on the condition the transliteration as well.
selectLanguageDropdown.addEventListener("change", event => {
    languageTransliterationCode = event.target.value.split("--")[1]
    languageCode = event.target.value.split("--")[0];
    console.log('event target', languageCode, languageTransliterationCode);
    languageCountryCode = languageCountryCodesArray.filter((languageFiltered) => {
        if (languageFiltered.includes(languageCode)) {
            console.log('language filtered', languageFiltered);
            return languageFiltered;
        } 
    });
    recognition.lang = languageCode;
    recognition2.lang = languageCode;
    // this call translates the phrase which is the value in the textAreaElement using the language code passed through the dropdown value
    translatePhrase(languageCode, textAreaElement.value).then((translation) => {
        // if the transliteration code passed through the dropdown value is latin then it wont transliterate as this causes it to error on the api
        // the api cannot use latin to transliterate a latin based language such as spanish or english
        if (languageTransliterationCode !== 'Latn') {
            // this call transliterates the phrase after it has been translated using the transliteration code and the language code
        transliteratePhrase(languageCode, translation, languageTransliterationCode).then((transliteration) => {
            // after translation and transliteration then it outputs to the second text area.
            translatedAreaElement.value = `${translation} Pronunciation: ${transliteration}`
        });
        } else {
            // if the language had a transliteration code of Latn it will only display the translated language as transliteration is impossible.
            translatedAreaElement.value = `${translation}`
        }
    });
});


//Below are examples to incorporate within code for error handling:
//Handling errors and unrecognized speech
//The last two handlers are there to handle cases where speech was recognized that wasn't in the defined grammar, or an error occurred. SpeechRecognition.onnomatch seems to be supposed to handle the first case mentioned, although note that at the moment it doesn't seem to fire correctly; it just returns whatever was recognized anyway:

// recognition.onnomatch = function(event) {
//   diagnostic.textContent = 'I didn't recognize that color.';
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

