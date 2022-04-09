import { useEffect, useState } from "react";

const pageLimit = 20;

export function Pokemons({setSelectedPokemon}) {
    const [pokemons , setPokemons] = useState([]);
    const [page, setPage] =useState(0);
    useEffect(() => {
        const fetchPokemons = async () => {
            const rawPokemonsResponse = await fetch(
                `https://pokeapi.co/api/v2/pokemon?limit=${pageLimit}&offset=${
                    pageLimit * page
                }`
            );

            const pokemonsResponse = await rawPokemonsResponse.json();

            setPokemons(pokemonsResponse.results);
        }

        fetchPokemons()
    }, [page]);
    

    return (
        <div>
            <h1>Pokemons</h1>

            <Search setSelectedPokemon={setSelectedPokemon} />
            <div>
                {pokemons.map((pokemon) => (
                 <PokemonListItem key = {pokemon.name} pokemon ={pokemon} setSelectedPokemon = {setSelectedPokemon} />
                ))}
            </div>
            <div><button disabled={page=== 0} onClick={() => setPage(page - 1)}>Previous</button>
                        {page}
            <button onClick={() => setPage(page + 1)}>Next</button>
            
            
            </div>
        </div>
    );
}

const PokemonListItem = ({ pokemon, setSelectedPokemon}) => {
    return (
        <div>
            <p>{pokemon.name}{""}
            <button onClick={() => setSelectedPokemon(pokemon.name)}>View</button>
            </p>
        </div>
    )
}
const Search = ({setSelectedPokemon}) => {
    const submit = (e) => {
        e.preventDefault();

        setSelectedPokemon(e.target.search.value)
    }
    return <form onSubmit={submit}>
        <label>
            Search:
            <input type="text" name="search"/>

        </label>

        <button type = "submit">Search</button>
    </form>
}