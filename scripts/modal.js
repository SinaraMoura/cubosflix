const titleModal = document.querySelector('.modal__title');
const imgModal = document.querySelector('.modal__img');
const descriptionModal = document.querySelector('.modal__description');
const averageModal = document.querySelector('.modal__average');
const genresModal = document.querySelector('.modal__genres');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');

function modalMovie(id) {

    fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${id}?language=pt-BR`).then(promise => {
        promise.json().then(body => {

            titleModal.textContent = body.title;
            imgModal.src = body.backdrop_path;
            descriptionModal.textContent = body.overview;
            averageModal.textContent = body.vote_average.toFixed(1);

            body.genres.forEach(function (genre) {
                const modalGenre = document.createElement('span');
                modalGenre.textContent = genre.name;
                modalGenre.classList.add('modal__genre');

                genresModal.append(modalGenre);

            });

        })
    })

    modal.classList.remove('hidden');
}

closeModal.addEventListener('click', function () {
    modal.classList.add('hidden');
});

