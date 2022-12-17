import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import _ from "lodash";
import { Pokemon } from "../context";
import PokemonStat from "./pokemonStat";
import PokemonMoves from "./pokemonMoves";
// import axios from "axios";
function PokemonCard() {
  let { selectPokemon, hanleSelectPokemon } = useContext(Pokemon);

  const POKEAPI_TYPE_TO_COLOR = {
    bug: "from-green-400",
    dark: "from-gray-800",
    dragon: "from-purple-800",
    electric: "from-yellow-400",
    fairy: "from-pink-400",
    fighting: "from-red-900",
    fire: "from-red-400",
    flying: "from-indigo-600",
    ghost: "from-indigo-700",
    grass: "from-green-600",
    ground: "from-yellow-700",
    ice: "from-blue-400",
    normal: "from-gray-500",
    poison: "from-purple-600",
    psychic: "from-pink-700",
    rock: "from-yellow-600",
    steel: "from-gray-400",
    water: "from-blue-500",
  };

  let [pokemon, setPokemon] = useState({
    pokemonName: "",
    pokemonSpriteUrl: "",
    pokemonType: [],
    pokemonMoves: [],
    pokemonStats: [],
  });
  let [isRand, setIsRand] = useState(false);
  let [isLoad, setIsLoad] = useState(true);
  const loadramdom = (isRandom) => {
    setIsLoad(true);
    // setIsRand(true);

    pokemonData(isRandom);
    hanleSelectPokemon(null);
  };

  const pokemonData = async (isRandom) => {
    let pokemonRes;
    if (isRandom === true) {
      console.log("random");
      const randomPkmID = Math.floor(Math.random() * 649) + 1;
      pokemonRes = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomPkmID}/`
      );
    } else if (isRandom === false) {
      if (selectPokemon) {
        pokemonRes = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${selectPokemon}/`
        );
      } else {
        const randomPkmID = Math.floor(Math.random() * 649) + 1;
        pokemonRes = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${randomPkmID}/`
        );
      }
    }
    // -------------RANDOM 4 MOVE---------------------
    // let fourRandomPkmMove = [];
    // let pkmAllMove = pokemonRes.data.moves;
    // while (fourRandomPkmMove.length < 4) {
    //   const randomMove =
    //     pkmAllMove[Math.floor(Math.random() * pkmAllMove.length)];
    //   if (!_.includes(fourRandomPkmMove, randomMove)) {
    //     fourRandomPkmMove.push(randomMove);
    //   }
    // }
    // let pokemonMoves = [];
    // await Promise.all(
    //   _.map(fourRandomPkmMove, async (randomMove) => {
    //     let moveRes = await (await axios.get(randomMove.move.url)).data;
    //     pokemonMoves.push({
    //       name: moveRes.name,
    //       power: moveRes.power,
    //       type: moveRes.type.name,
    //     });
    //   })
    // );
    // -----------------------------------

    // let fourRandomPkmMove = [];
    let pkmAllMove = pokemonRes.data.moves;
    // while (fourRandomPkmMove.length < 4) {
    //   const randomMove =
    //     pkmAllMove[Math.floor(Math.random() * pkmAllMove.length)];
    //   if (!_.includes(fourRandomPkmMove, randomMove)) {
    //     fourRandomPkmMove.push(randomMove);
    //   }
    // }
    let pokemonMoves = [];
    await Promise.all(
      _.map(pkmAllMove, async (move) => {
        let moveRes = await (await axios.get(move.move.url)).data;
        pokemonMoves.push({
          name: moveRes.name,
          power: moveRes.power,
          type: moveRes.type.name,
        });
      })
    );
    setPokemon({
      pokemonName: pokemonRes.data.name,
      // pokemonSpriteUrl: pokemonRes.data.sprites.front_shiny,
      pokemonSpriteUrl: `https://play.pokemonshowdown.com/sprites/ani-shiny/${pokemonRes.data.name}.gif`,

      pokemonType: pokemonRes.data.types.map((type) => type.type.name),
      pokemonMoves: pokemonMoves,
      pokemonStats: pokemonRes.data.stats,
    });
    setIsLoad(false);
  };
  useEffect(() => {
    console.log("reloading");
    // setIsRand(false);

    pokemonData(false);
  }, [selectPokemon]);

  return (
    <>
      <div className=" flex flex-col items-center justify-center h-screen  col-span-1 ">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl border-2 border-black"
          onClick={() => {
            loadramdom(true);
          }}
        >
          random
        </button>
        {isLoad === true ? (
          <div className="text-6xl font-bold p1">loading</div>
        ) : (
          <div className="w-80  border-2 shadow-inner border-black bg-gray-300  rounded-xl ">
            <div className={" rounded-xl text-4xl font-bold p-1"}>
              {pokemon.pokemonName}
            </div>
            <div
              className={
                "flex justify-center border-black border-2 rounded-xl m-1" +
                " bg-gradient-to-r " +
                POKEAPI_TYPE_TO_COLOR[pokemon.pokemonType[0]] +
                " to-white"
              }
            >
              {/* {POKEAPI_TYPE_TO_COLOR[pokemon.pokemonType[0]]} */}
              <img src={pokemon.pokemonSpriteUrl}></img>
            </div>
            <div className="flex flex-row justify-center border-2">
              {pokemon.pokemonType.map((type) => {
                return (
                  <div
                    key={type}
                    className={
                      "p-1 border-black border-2 rounded-xl m-1" +
                      " bg-gradient-to-r " +
                      POKEAPI_TYPE_TO_COLOR[type] +
                      " to-white"
                    }
                  >
                    {type}
                  </div>
                );
              })}
            </div>
            <div className="border-2 rounded-xl">
              {pokemon.pokemonStats.length > 0 && (
                <PokemonStat pokemonStats={pokemon.pokemonStats}></PokemonStat>
              )}
            </div>
            <div className="border-2 rounded-xl max-h-60 overflow-y-scroll">
              {pokemon.pokemonMoves.map((move) => {
                return (
                  <PokemonMoves
                    POKEAPI_TYPE_TO_COLOR={POKEAPI_TYPE_TO_COLOR}
                    move={move}
                  ></PokemonMoves>
                  // <div
                  //   className={
                  //     "flex flex-row rounded-xl border-black border-2 m-1 justify-between" +
                  //     " bg-gradient-to-r " +
                  //     POKEAPI_TYPE_TO_COLOR[move.type] +
                  //     " to-white"
                  //   }
                  // >
                  //   <div className="p-2 font-bold">{move.name}</div>
                  //   <div className="p-2">{move.power}</div>
                  //   <div className="p-2">{move.type}</div>
                  // </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PokemonCard;
