document.getElementById('fetchButton').addEventListener('click', fetchPokemon);

async function fetchPokemon() {
    const pokemonId = document.getElementById('pokemonId').value;
    const container = document.getElementById('pokemonContainer');
    container.innerHTML = '';

    if (!pokemonId) {
        container.innerHTML = '<p class="error">Por favor, ingrese un número.</p>';
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }

        const data = await response.json();
        renderPokemon(data);
    } catch (error) {
        container.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

function renderPokemon(data) {
    const container = document.getElementById('pokemonContainer');
    
    const name = data.name;
    const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
    const height = data.height / 10; 
    const weight = data.weight / 10; 
    const image = data.sprites.front_default;

    const card = `
        <div class="card">
            <h2>${name}</h2>
            <img src="${image}" alt="${name}">
            <p>Tipo: ${types}</p>
            <p>Altura: ${height} metros</p>
            <p>Peso: ${weight} kilogramos</p>
        </div>
    `;
    container.innerHTML = card;
}
