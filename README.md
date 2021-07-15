# panda-aja-prototype

This is a prototype app to test my Front-End Capstone Proposal idea (Panda-Aja!) of creating a Korean language learning application with React, JSON server database, and external web APIs (e.g., Web Speech API for speech recognition/stt and speech synthesis/tts features and Microsoft Translator Text for real-time text translation).

This app should be served in conjunction with the panda-aja-proxy-server (repository link for the proxy: https://github.com/luzm321/panda-aja-proxy-server). The proxy server should be hosted on the port: localhost 3000 (type in terminal: node server.js -p 3000 -w) in order for API fetch calls to work.

# How To Use The Application:

After serving the app, the browser will display two text areas. The left text area is where the user can type a word or sentence in English or when clicking on the listen button, the user can speak a word or phrase in English.
After typing/speaking a word/phrase in English, the user must click on the dropdown menu to choose the language the user wants it to be translated into.
Then on the right text area, the translation and transliteration of the non-Latin languages (Korean and Japanese) will be displayed.
The user can then click the Speak button to listen to the application speak the word/phrase in the translated language.
The user can also click the dropdown menu to change to a different language to translate from English (can alternate from Korean to Japanese to Spanish as these are the only other languages included in the prototype).
The user can click the test yourself button and speak to check if the user said/pronounced the translated word/phrase correctly. Depending on whether the correct answer is given or not, the browser will display an alert on the window to inform user if answer given is correct or incorrect.
