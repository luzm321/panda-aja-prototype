export const translatePhrase = (language, phrase) => {
    const query = `&language=${language}&phrase=${phrase}`;
    return fetch(`http://localhost:3000/api/translate?${query}`)
    .then((response) => response.json())
    .then((data) => {
        console.log('data', data[0].translations[0].text);
        return data[0].translations[0].text
    });
}

export const transliteratePhrase = (language, phrase) => {
    const query = `&language=${language}&phrase=${phrase}`;
    return fetch(`http://localhost:3000/api/transliterate?${query}`)
    .then((response) => response.json())
    .then((data) => {
        console.log('data', data[0].text);
        return data[0].text
    });
}