export const translatePhrase = (language, phrase) => {
    // with the parameter values passed to this function such as the language and phrase that store the data to send to the proxy server,
    // create a query which contains those values
    const query = `&language=${language}&phrase=${phrase}`;
    // fetch to the port where the proxy is being hosted (on terminal type: node server.js -p 3000 -w)
    // but you also need to add the passcode and it has to match with the passcode in the proxy here which is: /api/translate
    // after the passcode a "?" is added which tells the proxy that whatever comes after is a query which the proxy can access the values of
    return fetch(`http://localhost:3000/api/translate?${query}`)
    .then((response) => response.json())
    .then((data) => {
        console.log('translation data', data[0].translations[0].text);
        return data[0].translations[0].text
    });
}

export const transliteratePhrase = (language, phrase, transliterationCode) => {
    const query = `&language=${language}&phrase=${phrase}&transliterationCode=${transliterationCode}`;
    return fetch(`http://localhost:3000/api/transliterate?${query}`)
    .then((response) => response.json())
    .then((data) => {
        console.log('transliteration data', data[0].text);
        return data[0].text
    });
}

//Endpoints for fetch calls with the proxy server work with using postman to ensure external api is working

// export const detectPhraseLanguage = (phrase) => {
//     const query = `&phrase=${phrase}`;
//     return fetch(`http://localhost:3000/api/detect?${query}`)
//     .then((response) => response.json())
//     .then((data) => {
//         console.log('detection data', data[0].language);
//         return data
//     });
// }