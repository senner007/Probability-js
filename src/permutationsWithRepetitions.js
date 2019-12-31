var colors = require('colors/safe');
colors.enable();
export default function Outcome(options) {

    var outcomeArray;
    const range = options.range;
    const times = options.times;
    const showData = options.showData
    const accuracy = options.simulationAccuracy
    const title = options.title;

    if (options.mode === "simulate") {
        outcomeArray = simulatePermutationsWithRepititions(range, times, accuracy)
    } else if (options.mode === "compute") {
        outcomeArray = permutationAlgorithm(range, times);
    }

    return function (description, func) {
      var filtered = outcomeArray.filter(func);
      console.log(colors.red.bold('Title: ' + title));
      console.log(
        colors.underline(`${options.mode === "simulate" ? "Estimated" : "Actual"}`),
       `probability of`,
       colors.bold(description),
       colors.underline(`${filtered.length / outcomeArray.length * 100} %`)
      );
      console.log(colors.bold(showData ? `Data set: ` : `Data set not shown`));
      console.log(
        `${showData ? JSON.stringify(filtered).replace(/,(?=\[)/g, ' - ') : ""}`
      );
      console.log("\n");
    }
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