import {chanceCurry} from "../helpers/helpers";

export default function Outcome(options) {

    var outcomeArray;
    const range = options.range;
    const times = options.times;

    if (options.mode === "simulate") {
        outcomeArray = simulatePermutationsWithRepititions(range, times)
    } else if (options.mode === "compute") {
        outcomeArray = permutationAlgorithm(range, times);
    }

    return chanceCurry.bind(outcomeArray);
  }


  function permutationAlgorithm(permutationOptions, permutationLength) {
    const outcomeArray = (function permutateWithRepetitions(permutationOptions, permutationLength) {
        if (permutationLength === 1) {
          return permutationOptions.map(permutationOption => [permutationOption]);
        }
    
        // Init permutations array.
        const permutations = [];
    
        // Go through all options and join it to the smaller permutations.
        permutationOptions.forEach((currentOption) => {
          const smallerPermutations = permutateWithRepetitions(
            permutationOptions,
            permutationLength - 1,
          );
    
          smallerPermutations.forEach((smallerPermutation) => {
            permutations.push([currentOption].concat(smallerPermutation));
          });
        });
    
        return permutations;
      })(permutationOptions, permutationLength);
      return outcomeArray;
  }

  function simulatePermutationsWithRepititions(range, times, accuracy = 100) {

    const outcomeArray = [];

    const generateResult = (r , t) => {
        const temp = [];

        for (let i = 0; i < t; i++) {
            let randomFromRange = r[Math.floor(Math.random() * r.length)];
            temp.push(randomFromRange);
        }
        return temp;
    }

    for (let i = 0; i < accuracy; i++) {
        outcomeArray.push(generateResult(range, times));
    }

    return outcomeArray;

}