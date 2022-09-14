const highlightVideo = document.querySelector(".highlight__video");
const hightlightTitle = document.querySelector(".highlight__title");
const highlightRating = document.querySelector(".highlight__rating");
const highlightGenres = document.querySelector(".highlight__genres");
const highlightLaunch = document.querySelector(".highlight__launch");
const highlightDescription = document.querySelector(".highlight__description");
const highlightVideoLink = document.querySelector(".highlight__video-link");

function sectionHighlight() {
    fetch("https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR")
        .then(promise => {
            promise.json().then(body => {
                highlightVideo.style.background = `linear-gradient(rgba(0, 0, 0, 0.6) 100%, rgba(0, 0, 0, 0.6) 100%), url("${body.backdrop_path}") center / cover`;
                hightlightTitle.textContent = body.title;
                highlightRating.textContent = body.vote_average.toFixed(1);
                highlightDescription.textContent = body.overview;

                highlightLaunch.textContent = (new Date(body.release_date)).toLocaleDateString("pt-BR", { year: "numeric", month: "long", day: "numeric" });

                for (let i = 0; i < body.genres.length; i++) {
                    if (i === body.genres.length - 1) {
                        highlightGenres.textContent += body.genres[i].name;
                    } else {
                        highlightGenres.textContent += body.genres[i].name + ", ";
                    }
                }
            })
        })

    fetch("https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR")
        .then(promise => {
            promise.json().then(body => {
                const highlight = body.results[1].key;
                highlightVideoLink.href = `https://www.youtube.com/watch?v=${highlight}`;
            })
        })
}

sectionHighlight()