export default class Utterance {
    constructor (phrase, language, speed, volume) {
        this.utterance = phrase;
        this.language = language;
        this.speechSpeed = speed;
        this.speechVolume = volume;
    };

    speak() {
        let speech = new SpeechSynthesisUtterance(this.utterance);
        speech.lang = this.language;
        speech.rate = this.speechSpeed;
        console.log("It's speaking", speech);
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);
    }
};

// "kk-KOR"