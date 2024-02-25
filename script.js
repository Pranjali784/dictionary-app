const input = document.querySelector('input'); // select all the elements you are going to use
const btn = document.querySelector('button');
const dictionary = document.querySelector('.dictionary-app');

// https://api.dictionaryapi.dev/api/v2/entries/en/<word>

async function dictionaryFn(word) {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`) // await is used along with async function so that it does not just stay in the pending stage
        .then(response => response.json())   // convert this to JSON format

    return res[0];
}

btn.addEventListener('click', fetchAndCreateCard);

async function fetchAndCreateCard() {
    const data = await dictionaryFn(input.value);
    console.log(data);

    let partOfSpeechArray = [];

    for (let i = 0; i < data.meanings.length; i++) {
        partOfSpeechArray.push(data.meanings[i].partOfSpeech);
    }

    dictionary.innerHTML = `
    <div class="card">
        <div class="property">
            <span>Word:</span>
            <span>${data.word}</span>
        </div>

        <div class="property">
            <span>Phonetics:</span>
            <span>${data.phonetic}</span>
        </div>

        <div class="property">
            <span>Audio</span>
            <span>
                <audio controls src="${data.phonetics[0].audio}"></audio>
            </span>
        </div>

        <div class="property">
            <span>Definition</span>
            <span>
                ${data.meanings[0].definitions[0].definition}
            </span>
        </div>

        <div class="property">
            <span>Example</span>
            <span>${data.meanings[0].definitions[0].example}</span>
        </div>

        <div class="property">
            <span>Parts of Speech</span>
            <span>${partOfSpeechArray.join(', ')}</span>
        </div>
    </div>
    `;
}
