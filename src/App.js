import logo from "./logo.svg";
import "./App.css";
import PokemonCard from "./components/pokemonCard";
import Navbar from "./components/Navbar";
import PokemonDex from "./components/pokemonDex";
import { Pokemon } from "./context";
import { useState } from "react";
function App() {
  let [selectPokemon, setSelectPokemon] = useState(null);
  const hanleSelectPokemon = (pokemon) => {
    setSelectPokemon(pokemon);
  };
  return (
    <Pokemon.Provider value={{ selectPokemon, hanleSelectPokemon }}>
      <div className="App">
        <Navbar></Navbar>
        <div className="grid grid-cols-4 ">
          <PokemonCard></PokemonCard>
          <PokemonDex></PokemonDex>
        </div>
      </div>
    </Pokemon.Provider>
  );
}

export default App;
