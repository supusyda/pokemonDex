import React from "react";

export default function PokemonMoves({ POKEAPI_TYPE_TO_COLOR, move }) {
  return (
    <div
      className={
        "flex flex-row rounded-xl border-black border-2 m-1 justify-between" +
        " bg-gradient-to-r " +
        POKEAPI_TYPE_TO_COLOR[move.type] +
        " to-white"
      }
    >
      <div className="p-2 font-bold">{move.name}</div>
      <div className="p-2">{move.power}</div>
      <div className="p-2">{move.type}</div>
    </div>
  );
}
