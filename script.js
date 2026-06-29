// =============================================
// Pokédex - 6 Day Roadmap
// =============================================
//
// DAY 1 (today) - Basic setup
// [x] HTML skeleton with all required data-id attributes
// [x] CSS grid + card layout + type colors
// [x] Fetch first 20 Pokémon and render simple cards
// [x] Hover effect on cards
//
// DAY 2 - Load More + Loading State + Caching
// [ ] Wire up load-more-button to fetch next 20
// [ ] Add loading spinner / user feedback while fetching
// [ ] Disable load-more button during the request
// [ ] Cache pokemon details so we never refetch
//
// DAY 3 - Dialog / Detail Overlay
// [ ] Open dialog on card click with full stats
// [ ] Show hp, attack, defense, sp.atk, sp.def, speed
// [ ] Lock background scroll while dialog is open
// [ ] Close on backdrop click + close button
// [ ] Prev / next navigation between Pokémon
//
// DAY 4 - Search
// [ ] Enable search button only at 3+ characters
// [ ] Filter rendered cards by name
// [ ] Show "no match found" message (data-id="not-found")
//
// DAY 5 - Polish + Responsive
// [ ] Refine hover / focus animations
// [ ] Mobile layout (responsive down to 320px)
// [ ] Improve typography and spacing
//
// DAY 6 - Final Touches
// [ ] Bug fixes + edge cases
// [ ] Code review (function length, naming, formatting)
// [ ] Final cleanup + favicon polish
// =============================================


const POKEMON_PER_PAGE = 20;
let currentOffset = 0;
let pokemonCache = [];

const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};


// app entry point - runs on body onload
function init() {
    setEventListeners();
    loadPokemon();
}


// central place to attach all click / input listeners
function setEventListeners() {
    // TODO Day 2: hook up load-more-button click
    // TODO Day 3: hook up card clicks to open dialog
    // TODO Day 4: hook up search-input and search-button
}


// fetches the next batch of pokemon and triggers a re-render
async function loadPokemon() {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_PER_PAGE}&offset=${currentOffset}`;
    const response = await fetch(url);
    const data = await response.json();
    const details = await fetchAllDetails(data.results);
    pokemonCache.push(...details);
    currentOffset += POKEMON_PER_PAGE;
    renderPokemon();
}


// takes the basic list and fetches the full detail object for every pokemon
async function fetchAllDetails(results) {
    const promises = results.map(p => fetch(p.url).then(r => r.json()));
    return Promise.all(promises);
}


// renders every cached pokemon into the content grid
function renderPokemon() {
    const content = document.querySelector('[data-id="content"]');
    content.innerHTML = pokemonCache.map(p => getCardHtml(p)).join('');
}


// returns the html string for a single pokemon card
function getCardHtml(pokemon) {
    const primaryType = pokemon.types[0].type.name;
    const bgColor = typeColors[primaryType] || '#777';
    const typesHtml = pokemon.types.map(t => getTypeBadgeHtml(t.type.name)).join('');
    return `
        <button class="pokemonCard" data-id="card" data-pokemon-id="${pokemon.id}"
                style="background-color: ${bgColor};">
            <span class="pokemonNumber">#${String(pokemon.id).padStart(3, '0')}</span>
            <h2 class="pokemonName">${pokemon.name.toUpperCase()}</h2>
            <div class="pokemonTypes">${typesHtml}</div>
            <img data-id="card-image" src="${pokemon.sprites.front_default}"
                 alt="${pokemon.name}" class="pokemonImage" />
        </button>
    `;
}


// returns the html string for a single type badge
function getTypeBadgeHtml(typeName) {
    return `<span class="typeBadge">${typeName}</span>`;
}
