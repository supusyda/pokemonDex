import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { Pokemon } from "../context";
export default function SinglePokemonCard({ pokemon }) {
  let { selectPokemon, hanleSelectPokemon } = useContext(Pokemon);
  const colors = {
    transparent: "transparent",
    current: "currentColor",
    fire: "bg-red-600",
    normal: "bg-neutral-600",
    water: "bg-blue-600",
    electric: "bg-yellow-400",
    grass: "bg-green-600",
    ice: "bg-cyan-600",
    fighting: "bg-red-800",
    poison: "bg-fuchsia-600",
    ground: "bg-amber-600",
    flying: "bg-sky-600",
    psychic: "bg-pink-600",
    bug: "bg-lime-600",
    rock: "bg-yellow-900",
    ghost: "bg-indigo-900",
    dragon: "bg-violet-900",
    dark: "bg-zinc-900",
    steel: "bg-gray-600",
    fairy: "bg-fuchsia-300",
  };
  const Backcolors = {
    transparent: "transparent",
    current: "currentColor",
    fire: "bg-red-900",
    normal: "bg-neutral-700",
    water: "bg-blue-900",
    electric: "bg-yellow-500",
    grass: "bg-green-900",
    ice: "bg-cyan-900",
    fighting: "bg-red-900",
    poison: "bg-fuchsia-900",
    ground: "bg-amber-900",
    flying: "bg-sky-900",
    psychic: "bg-pink-900",
    bug: "bg-lime-900",
    rock: "bg-yellow-900",
    ghost: "bg-indigo-900",
    dragon: "bg-violet-900",
    dark: "bg-zinc-700",
    steel: "bg-gray-900",
    fairy: "bg-fuchsia-900",
  };

  let [singlePokemon, setSinglePokemon] = useState(null);
  const handleOnClick = (pkmID) => {
    hanleSelectPokemon(pkmID);
  };
  useEffect(() => {
    let getdata = async () => {
      let pokemonRes = await (await axios.get(pokemon.url)).data;
      let pokemonSpice = await (await axios.get(pokemonRes.species.url)).data;
      // console.log(pokemonSpice);

      let a = _.find(pokemonSpice.flavor_text_entries, (o) => {
        return o.language.name === "en";
      }).flavor_text;
      // console.log(a);
      let pokemonTemp = {};
      pokemonTemp.sprite =
        pokemonRes.sprites.other["official-artwork"].front_default;
      pokemonTemp.type = pokemonRes.types;
      pokemonTemp.name = pokemonRes.name;
      pokemonTemp.id = pokemonRes.id;

      pokemonTemp.detail = a;

      setSinglePokemon(pokemonTemp);
    };
    getdata();
  }, []);

  return (
    <>
      {" "}
      {singlePokemon && (
        <>
          <button
            className={
              "shadow hover:shadow-lg transform transition group duration-500 focus:scale-125 flex flex-col justify-evenly max-w-[14rem] m-4 border border-gray-200 rounded-lg " +
              Backcolors[singlePokemon.type[0].type.name]
            }
            key={singlePokemon.id}
            onClick={() => {
              handleOnClick(singlePokemon.id);
            }}
          >
            <a>
              <img
                class=" rounded-t-lg group-focus:animate-bounce"
                src={singlePokemon.sprite}
                alt=""
              />
            </a>
            <div class="p-5">
              <a>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {singlePokemon.name}
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-200">
                {singlePokemon.detail}
              </p>
              <div className="flex justify-around">
                {singlePokemon.type.length > 0 &&
                  singlePokemon.type.map((eachType) => {
                    return (
                      <a
                        className={
                          "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white border-solid border-2 border-sky-500  rounded-lg " +
                          colors[eachType.type.name]
                        }
                      >
                        {eachType.type.name}
                      </a>
                    );
                  })}
              </div>
            </div>
          </button>
        </>
      )}
    </>
    
  );
}
