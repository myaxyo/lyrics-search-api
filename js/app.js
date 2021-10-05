const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');

const apiURL = 'https://api.lyrics.ovh';


form.addEventListener('submit', e => {
    e.preventDefault();
    let searchValue = search.value.trim();

    if (!searchValue) {
        alert('Hech nima qidirilmadi!')
    } else {
        beginSearch(searchValue)
    }

})

//create search function
async function beginSearch(searchValue) {
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`)
    const data = await searchResult.json();


    displayData(data);
}

// show search results

function displayData(data) {
    result.innerHTML = `
    <ul class='songs'>
        ${data.data
            .map(song => ` <li class='list-item list-unstyled'>
                        <div class='p-2'>
                            <strong>${song.artist.name}</strong> - ${song.title}
                        </div>
                        <span data-artist='${song.artist.name}' data-songtitle='${song.title}' class='btn btn-success btn-sm mb-2' >Ko'rish</span>
                    </li>
        
        `)
            .join('')
        }
    </ul>
    `;
}


//getting lyrics

result.addEventListener('click', e => {
    const clickedElement = e.target;

    //check btn
    const artist = clickedElement.getAttribute('data-artist')
    const songTitle = clickedElement.getAttribute('data-songtitle')

    getLyrics(artist, songTitle)

})

async function getLyrics(artist, songTitle) {
    const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);

    const data = await response.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>')

    result.innerHTML = `<h2 class='lyrics-title'><strong >${artist}</strong> - ${songTitle}</h2><p class='lyrics-text'>${lyrics}</p>`
}