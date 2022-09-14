const input = document.querySelector('.input')
const movies = document.querySelector('.movies');
const btnNext = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.btn-prev');
const btnTheme = document.querySelector('.btn-theme');
const body = document.querySelector('body');

let initialTheme = localStorage.getItem("theme");
let themeAplication = "light";

let paginationMovie = 0
let listMovies = []
let minimum = 0;
let maximum = 15;

function createMovies(list) {
  movies.innerHTML = '';
  for (let index = paginationMovie; index < 5; index++) {

    const movie = document.createElement('div');
    const movieInfo = document.createElement('div');
    const movieTitle = document.createElement('span');
    const movieRating = document.createElement('span');
    const movieRatingRate = document.createElement('span');
    const movieRatingStars = document.createElement('img');

    movie.classList.add('movie');
    movieInfo.classList.add('movie__info');
    movieTitle.classList.add('movie__title');
    movieRating.classList.add('movie__rating');
    movieRatingRate.classList.add('movie__rating-rate');

    movie.id = list[index].id;
    movie.style.backgroundImage = `url(${list[index].poster_path})`;
    movieTitle.textContent = list[index].title;
    movieRatingRate.textContent = list[index].vote_average;
    movieRatingStars.src = "./assets/estrela.svg";

    movieRating.append(movieRatingStars, movieRatingRate);
    movieInfo.append(movieTitle, movieRating);
    movie.append(movieInfo);
    movies.append(movie);

    movie.addEventListener('click', () => {
      modalMovie(movie.id);
    })
  }
}

function sectionMovies() {
  fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false').then(function (resposta) {
    const promiseBody = resposta.json();

    promiseBody.then(function (body) {
      listMovies = body;
      createMovies(listMovies.results);
    });

  });
}

function sectionMoviePagination() {
  const selectMovies = document.querySelectorAll('.movie');
  count = 0;

  for (let i = paginationMovie; i < paginationMovie + 5; i++) {

    const selectTitle = selectMovies[count].querySelector('.movie__title');
    const movieRatingRate = selectMovies[count].querySelector('.movie__rating-rate');

    selectTitle.textContent = listMovies.results[i].title;
    selectMovies[count].id = listMovies.results[i].id;
    selectMovies[count].style.backgroundImage = `url(${listMovies.results[i].poster_path})`;
    movieRatingRate.textContent = listMovies.results[i].vote_average;

    count === 4 ? count = 0 : count++;
  }
};


btnPrev.addEventListener('click', function () {
  paginationMovie === 0 ? paginationMovie = maximum : paginationMovie -= 5;
  sectionMoviePagination()
})

btnNext.addEventListener('click', function () {
  paginationMovie === maximum ? paginationMovie = minimum : paginationMovie += 5;
  sectionMoviePagination()
})

input.addEventListener('keydown', (event) => {

  if (event.key === 'Enter' && input.value !== '') {
    fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false**&query=${input.value}`).then(function (resp) {
      const promiseBody = resp.json();

      promiseBody.then(function (body) {
        createMovies(body.results);
      })
      input.value = '';
    })
  } else {
    return;
  }
})

function lightTheme() {
  themeAplication = "light";

  btnTheme.src = "./assets/dark-mode.svg";
  btnPrev.src = "./assets/seta-esquerda-preta.svg";
  btnNext.src = "./assets/seta-direita-preta.svg";

  body.style.setProperty("--background-color", "#FFF");
  body.style.setProperty("--color", "#000");
  body.style.setProperty("--input-background-color", "#979797");
  body.style.setProperty("--highlight-background", "#FFF");
  body.style.setProperty("--highlight-color", "rgba(0, 0, 0, 0.7)");
  body.style.setProperty("--highlight-description", "#000");
  body.style.setProperty("--shadow-color", "0px 4px 8px rgba(0, 0, 0, 0.15)");
}

function darkTheme() {
  themeAplication = "dark";

  btnTheme.src = "./assets/light-mode.svg";
  btnPrev.src = "./assets/seta-esquerda-branca.svg";
  btnNext.src = "./assets/seta-direita-branca.svg";

  body.style.setProperty("--background-color", "#242424");
  body.style.setProperty("--color", "#FFF");
  body.style.setProperty("--input-background-color", "#FFF");
  body.style.setProperty("--shadow-color", "0px 4px 8px rgba(255, 255, 255, 0.15)");
  body.style.setProperty("--highlight-background", "#454545");
  body.style.setProperty("--highlight-color", "rgba(255, 255, 255, 0.7)");
  body.style.setProperty("--highlight-description", "#FFF");
}

btnTheme.addEventListener("click", () => {
  if (themeAplication === "light") {
    darkTheme();
  } else {
    lightTheme();
  }

  localStorage.setItem("theme", themeAplication);
})

if (initialTheme === "light") {
  lightTheme();
} else {
  darkTheme();
}
sectionMovies();

