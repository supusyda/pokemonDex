import React, { useEffect, useState, useContext } from "react";
import SinglePokemonCard from "./singlePokemonCard";
import axios from "axios";
import _ from "lodash";
import { Pokemon } from "../context";

export default function PokemonDex() {
  let [pokemon, setPokemon] = useState([]);
  let { selectPokemon } = useContext(Pokemon);

  useEffect(() => {
    let getdata = async () => {
      let pokemonRes = await (
        await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`)
      ).data;
      // console.log(pokemonRes.results);
      setPokemon(pokemonRes.results);
    };

    getdata();
  }, []);

  return (
    <div class="container mx-auto px-4 col-span-3 h-screen ">
      <div className="flex flex-wrap justify-between h-screen overflow-y-scroll">
        {pokemon &&
          pokemon.length > 0 &&
          pokemon.map((item) => {
            return <SinglePokemonCard pokemon={item}></SinglePokemonCard>;
          })}
      </div>
    </div>
  );
}
