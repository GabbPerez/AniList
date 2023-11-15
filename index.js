const API_URL = 'https://api.jikan.moe/v4';

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const searchButton = document.querySelector('.search-enter');
    const cardContainerEl = document.querySelector(".card__container");
    const animeListEl = document.querySelector(".card__container");

    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            main(event);
        }
    });

    searchButton.addEventListener('click', function (event) {
        main({key: 'Enter'}); // Simulate an Enter keypress event
    });

// Define the main function here
    async function main(event) {
        if (event.key === 'Enter') {
            cardContainerEl.classList.add('cards_loading');
            const searchValue = searchInput.value;
            try {
                // Properly handle the API call with a try-catch block
                // const response = await fetch(`https://api.jikan.moe/v3/search/anime?q=${encodeURIComponent(searchValue)}&limit=9`);
                const response = await fetch(`${API_URL}/anime?q=${searchValue}&limit=9`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const animeData = await response.json();
                const animeSearch = animeData.data.filter(anime => anime.type === "TV" && (
                    anime.title.toLowerCase().includes(searchValue.toLowerCase()) || anime.title_english.toLowerCase().includes(searchValue.toLowerCase())
                ));
                // const animeSearch = animeData.filter(anime => anime.type === "TV" && anime.title.toLowerCase().includes(searchValue.toLowerCase()));
                console.log(animeSearch)
                // Using setTimeout to simulate a loading delay if necessary
                setTimeout(() => {
                    cardContainerEl.classList.remove('cards_loading');
                    animeListEl.innerHTML = animeSearch.map(anime => animeHTML(anime)).join('');
                }, 2000);

            } catch (error) {
                console.error('Fetching anime data failed:', error);
                // Handle the error state appropriately here
                cardContainerEl.classList.remove('cards_loading');
                animeListEl.innerHTML = '<p>Error loading anime data. Please try again later.</p>';
            }
        }
    }

// Define the animeHTML function here
    function animeHTML(an) {
        return `<div class="card">
  <img class="card-img" src="${an.images.jpg.image_url}" alt="">
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
});