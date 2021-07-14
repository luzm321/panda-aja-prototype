//Class-based React component vs functional based component:
//Classes are a template for creating objects. They encapsulate data with code to work on that data. 
//The body of a class is the part that is in curly brackets {}. This is where you define class members, such as methods or constructor.
//The constructor method is a special method for creating and initializing an object created with a class. There can only be one special method with the name "constructor" in a class.
//A constructor is a function that creates an instance of a class which is typically called an “object”. In JavaScript, a constructor gets
// called when you declare an object using the new keyword. The purpose of a constructor is to create an object and set values if there are any 
//object properties present.
export default class Utterance {
    constructor (phrase, language, speed, volume) {
        this.utterance = phrase;
        this.language = language;
        this.speechSpeed = speed;
        this.speechVolume = volume;
    };

    speak() {
        //The SpeechSynthesisUtterance interface of the Web Speech API represents a speech request. It contains the content the speech service should read and information about how to read it (e.g. language, pitch and volume.)
        //SpeechSynthesisUtterance() Returns a new SpeechSynthesisUtterance object instance.
        let speech = new SpeechSynthesisUtterance(this.utterance); //passing the phrase parameter/utterance object which is the text's input value
        // and storing value to speech variable
        speech.lang = this.language; //Gets and sets the language of the utterance.
        speech.rate = this.speechSpeed; //Gets and sets the speed at which the utterance will be spoken at.
        console.log("It's speaking", speech);
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech); //start the utterance speaking; First of all, we capture references to all the DOM elements involved 
        //in the UI, but more interestingly, we capture a reference to Window.speechSynthesis. This is API's entry point — it returns an instance 
        //of SpeechSynthesis, the controller interface for web speech synthesis.
    }
}; 

// "kk-KOR"
// "Ko-KR" code for korean language
// "en-US" code for english language