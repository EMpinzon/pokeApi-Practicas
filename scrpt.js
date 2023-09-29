const pokemonContainer = document.querySelector(".pokemon-container");
const spinner = document.querySelector('#spinner');
const previous = document.querySelector("#previous")
const next = document.querySelector("#next")

let offset = 200;
let limit = 20;

previous.addEventListener('click', ()=>{
    if (offset != 1 ){
        offset -=21;
        removechildNodes(pokemonContainer);
        fetchPokemons(offset,limit);
    }
   
    
})
next.addEventListener('click', ()=>{
    offset +=21;    
    removechildNodes(pokemonContainer);
    fetchPokemons(offset,limit);
    
})

async function fetchPokemon(id){
    info = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)).json();
    createPokemon(info);
    spinner.style.display = 'none'; 


}

function fetchPokemons(offset, limit){
    spinner.style.display = 'block'; 
    for (let i = offset; i <= offset+limit ; i += 1 ){
        fetchPokemon(i);
    }
}

function createPokemon(pokemon){
    const flipcard =  document.createElement('div');
    flipcard.classList.add("flip-card");
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    flipcard.appendChild(cardContainer);
    const card = document.createElement('div');
    card.classList.add('pokemon-block');
    const spriteConteiner = document.createElement('div');
    spriteConteiner.classList.add('img-container');
    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default;
    spriteConteiner.appendChild(sprite);
    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(3,0)}`;
    const name = document.createElement("p");
    name.classList.add('name');
    name.textContent = pokemon.name;

    card.appendChild(spriteConteiner);
    card.appendChild(number);
    card.appendChild(name);
    

    const cardBack = document.createElement('div');
    cardBack.classList.add('pokemon-block-back');
    cardBack.appendChild(progressBars(pokemon.stats))

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(flipcard);
}


function progressBars (stats){
    const statsContainer = document.createElement('div');
    statsContainer.classList.add("stats-container");
    for (let i = 0;i<3 ; i++){

        const stat = stats[i];
        const statPercent = stat.base_stat / 3 + "%";
        const statContainer = document.createElement('div');
        statContainer.classList.add("stat-container");
        const statName =  document.createElement('p');
        statName.textContent = stat.stat.name;
        const progress = document.createElement("div");
        progress.classList.add("progress");
        const progressBar = document.createElement('div');
        progressBar.classList.add("progress-bar");
        
        
        progressBar.style.width = statPercent;
        progressBar.textContent = stat.base_stat;

        progress.appendChild(progressBar);
        statContainer.appendChild(statName);
        statContainer.appendChild(progress);
        statsContainer.appendChild(statContainer);

    }
    return statsContainer;

}

function removechildNodes(parent){ 
    (Array.from(parent.children)).forEach(node => {
        node.remove();
    });
}

fetchPokemons(offset, limit);