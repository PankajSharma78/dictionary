let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let notFound = document.querySelector('.not_found');
let defBox = document.querySelector('.def');
let audioBox = document.querySelector('.audio');
let loading = document.querySelector('.loading');
let apiKey = 'c1961c1f-df28-4872-bdf9-6aa88244bc0b';

searchBtn.addEventListener('click' , function(e){

    e.preventDefault();

    //clear data
    audioBox.innerHTML = '';
    notFound.innerText = '';
    defBox.innerText = '';


    //get input data
    let word = input.value;




    //call API get data
    if(word == ''){
        alert("Please enter a word!!!");

        return;
    }

    getData(word);

});


async function getData(word){

    loading.style.display = 'block';

    //api call / ajax call
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    const data = await response.json();


    //if data is not found empty result
    if(!data.length){
        loading.style.display = 'none';
        notFound.innerText = 'No Result Found !';
        return
    }

    //if result is suggestions
    if(typeof data[0] ==='string'){
        loading.style.display = 'none';
        let heading = document.createElement('h3');
        heading.innerText = 'Did You Mean ?';
        notFound.appendChild(heading);
        data.forEach(element => {
            let suggestion = document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText = element;
            notFound.appendChild(suggestion);

        })
        return;
    }

    //result found
    loading.style.display = 'none';
    let defination = data[0].shortdef[0];
    defBox.innerText = defination;


    //SOUND
    const soundName = data[0].hwi.prs[0].sound.audio;

    if(soundName){
        renderSound(soundName);
    }
    console.log(data);
}

function renderSound(soundName){
     
    let subfolder = soundName.charAt(0);

    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;

    let aud = document.createElement('audio');
    aud.src = soundSrc;

    aud.controls = true;

    audioBox.appendChild(aud);

}