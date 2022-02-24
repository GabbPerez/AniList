//API Path : https://api.jikan.moe/v3
const animeListEl = document.querySelector(".card__container");
const cardContainerEl = document.querySelector('.card__container');


main = async(event) => {
   if (event.keyCode===13){
    // cardContainerEl.classList += ' cards__loading';
    var elem = document.querySelector('input').value;
    const anime = await fetch(`https://api.jikan.moe/v3/search/anime?q=${elem}&limit=9`)
    const animeData = await anime.json();
    console.log(animeData);
    const animeSearch = animeData.results.filter((anime) => ((anime.type === "TV") && (anime.title.toLowerCase().includes(elem))) || anime.type === "TV");
    // setTimeout(function() {cardContainerEl.classList.remove('cards__loading');}, 2000);
    cardContainerEl.innerHTML = animeSearch.map(() => skeletonLoadingState).join("");
    setTimeout(function() {animeListEl.innerHTML = animeSearch.map((anime) => animeHTML(anime)).join("")}, 2000);

    // animeListEl.classList += ' cards__loading';
    // if (!cards) {
    //   cards = await searchAnime();
    // }
    // animeListEl.classList.remove('cards__loading');

    // setTimeout(animeListEl.innerHTML = animeSearch.map((anime) => animeHTML(anime)).join(""), 4000);
    // const other = animeSearch.map(anime => anime.mal_id);
    // console.log(other);
    // const otherAnimeData = await fetch(`https://api.jikan.moe/v3/anime/16498/episodes`);
    // const data = await otherAnimeData.json();
    // const moreAnimeData = animeData.results;
    // console.log(moreAnimeData);
  }
}

main();

animeHTML = (an) => {
  return `<div class="card">
  <img class="card-img" src="${an.image_url}" alt="">
  <div class="card__top--text">
      <h2 class="card--title">${an.title}</h2>
      <h3 class="card--subtitle">Episode Count: ${an.episodes}</h3>
      <h3 class="card--airing-season">MAL Score: ${an.score}</h3>
  </div>
  <button class="read-more">
    <a class="read-more__button" href=${an.url} target="_blank">
        <div class="read-more__text">Read More</div>
        <i class="fas fa-arrow-right"></i>
    </a>
  </button>
</div>`;
}

skeletonLoadingState =
`<div class="card card__skeleton">
    <div class="card__img--skeleton"></div>
    <div class="card--title--skeleton"></div>
    <div class="card--subtitle--skeleton"></div>
    <div class="card--score--skeleton"></div>
  </div>`;



