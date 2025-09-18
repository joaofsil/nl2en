
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
    let res = fetch(worker_url, {
            method: "POST",
            body: JSON.stringify({
                title: title,
                author: author,
                song: song
            })
        }
    );
    let response = res.json();
    let translation = response.translation;

    document.getElementById("translated-text").innerHTML = translation;
}