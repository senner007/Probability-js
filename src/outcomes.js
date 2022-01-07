const colors = require('colors/safe');
import {simulatePermutationsWithRepititions, kSubsetPermutations, combineWithoutRepetitions, permutationWithRepetitions} from './permutation-methods'

colors.enable();

export default function Outcomes(options) {

  if (options.mode == "simulate" && options.isDependent) {
    throw new Error("simulation mode for dependent events not implemented yet");
  }

  const range = options.range;
  const times = options.times;
  const accuracy = options.simulationAccurac

  var outcomeArray;
  if (options.mode === "simulate") {
    outcomeArray = simulatePermutationsWithRepititions(range, times, accuracy)
  } else if (options.mode === "compute") {
    if (options.isDependent) {
      // kSubsetPermutations and combineWithoutRepetitions should produce the same results with same probability. 
      // kSubsetPermutations creates permutations of length k from array where order matters and uses more computations
      if (options.showData) {
        outcomeArray = kSubsetPermutations(range, times);
      } else {
        outcomeArray = combineWithoutRepetitions(range, times);
      }
    } else {
      outcomeArray = permutationWithRepetitions(range, times);
    }
  }

  return function (description, func) {
    const filteredData = outcomeArray.filter(func);

    return [
      filteredData.length / outcomeArray.length,
      description,
      options,
      filteredData
    ]

  }
}

export function printProbability(probability, description, options, filteredData) {
  console.log(colors.red.bold('Title: ' + options.title));
  console.log(
    colors.underline(`${options.mode === "simulate" ? "Estimated" : "Actual"}`),
    `probability of`,
    colors.bold(description),
    colors.underline(`${probability * 100} %`)
  );

  console.log(
    `${options.showData ? JSON.stringify(filteredData).replace(/,(?=\[)/g, ' - ') : ""}`
  );
  console.log("\n");
}

