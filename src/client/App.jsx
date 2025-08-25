import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {

  const [pokemen, setPokemen] = useState([]);
  const [pokeImages, setPokeImages] = useState([]);



  useEffect(() => {
    const getPokemen = async () => {
      try {
        const pokemen = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
        );
        setPokemen(pokemen);
        console.log("pokemen: ", pokemen);
      } catch (error) {
        console.error(error);
      }
    };
    getPokemen();
  }, []);

  useEffect(() => {
    const getPictures = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
        );
        const pokemonList = response.data.results;
        console.log("pokemonList: ", pokemonList);

        const detailedPromises = pokemonList.map((pokemon) =>
          axios.get(pokemon.url)
        );

        const detailedResponses = await Promise.all(detailedPromises);
        console.log("detailedresponses: ", detailedResponses);

        const pokePics = detailedResponses.map((res) => ({
          image: res.data.sprites.front_default,
          name: res.data.name,
        }));
        setPokeImages(pokePics);
        console.log("pokepics:", pokePics);
      } catch (error) {
        console.error(error);
      }
    };
    getPictures();
  }, []);

  return (
    <div className="App">
      <h3>PokeAPI practice</h3>
    
      <ul>
        {pokemen?.data?.results.map((pokemon) => (
          <li key={pokemon.name}>
            {pokemon.name}
            {pokeImages.map((poke) =>
              poke.name == pokemon.name ? (
                <img key={poke.name} src={poke.image} alt={poke.name} />
              ) : null
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
