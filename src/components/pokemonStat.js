import React, { useEffect, useState } from "react";

export default function PokemonStat({ pokemonStats }) {
  const statName = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed",
  };
  const calPercent = (baseStat) => {
    const max = 200;
    const percent = (100 * baseStat) / max;
    console.log(percent);
    return percent;
  };
  const [stats, setStat] = useState(null);
  useEffect(() => {
    let Stats = [];

    let tempPokemonStats = [...pokemonStats];
    for (let i in statName) {
      let singleStats = {};
      tempPokemonStats.map((item) => {
        if (item.stat.name == i) {
          singleStats.stat = item.base_stat;
          singleStats.name = statName[i];
        }
      });
      Stats.push(singleStats);
    }
    setStat([...Stats]);
  }, [pokemonStats]);

  return (
    <div>
      {console.log(pokemonStats)}
      <div class="resp-scroll">
        <table class="vitals-table">
          <tbody>
            {stats &&
              stats.length > 0 &&
              stats.map((item) => {
                // calPercent(item.stat);
                return (
                  <tr>
                    <th>{item.name}</th>
                    <td class="cell-num">{item.stat}</td>
                    <td class="cell-barchart w-full">
                      <div
                        style={{ width: `${calPercent(item.stat)}%` }}
                        class="bg-gray-600 h-4 border-2 rounded-md"
                      ></div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
          {/* <tfoot>
            <tr>
              <th>Total</th>
              <td class="cell-num cell-total">680</td>
              <th class="cell-barchart"></th>
              <th>Min</th>
              <th>Max</th>
            </tr>
          </tfoot> */}
        </table>
      </div>
    </div>
  );
}
