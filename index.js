
async function executeSearch() {
    const search_field = document.getElementById('search');
    let query = search_field.value;
    query = "het+is+een+nacht+by+Gus+meeuwis";
    alert('searching for ...' + query);
    const worker_url = "https://nl2enworker.joao-sil.workers.dev/";
    let res      = await fetch(worker_url + 'api/search?q=' + query);
    let response = await res.json();
    let song     = response.results;

    let song_div = document.getElementById('source-text');
    song_div.innerHTML = song;

}


async function translateSong() {
    const title  = document.getElementById("song-title").value;
    const author = document.getElementById("song-author").value;
    const song   = document.getElementById("source-text").value;

    const worker_url = "https://nl2enworker.joao-sil.workers.dev/api/translate";
    let res = await fetch(worker_url, {
            method: "POST",
            body: JSON.stringify({
                title: title,
                author: author,
                song: song
            })
        }
    );
    let response = await res.json();
    let translation = response.translation;

    if(response.status != 200) {
        let error = response.message;
        alert(error);
        return;
    }

    document.getElementById("translated-text").innerHTML = translation;
}


async function saveSong() {
    const title       = document.getElementById("song-title").value;
    const author      = document.getElementById("song-author").value;
    const song        = document.getElementById("source-text").value;
    const translation = document.getElementById("translated-text").value;

    const worker_url = "https://nl2enworker.joao-sil.workers.dev/api/save";
    let res = await fetch(worker_url, {
        method: "POST",
        body: JSON.stringify({
            title: title,
            author: author,
            song: song,
            translation: translation
        })
    }
    );
    let response = await res.json();
    let result = response.message;

    if (response.status != 200) {
        let error = response.message;
        alert(error);
        return;
    }

    console.log(response);
    alert("Operation Save ended with result: " + result);
}