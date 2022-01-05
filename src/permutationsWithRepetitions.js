var colors = require('colors/safe');
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
      outcomeArray = combineWithoutRepetitions(range, times);
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

function permutationWithRepetitions(permutationOptions, permutationLength) {
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


function combineWithoutRepetitions(comboOptions, comboLength) {
  // If the length of the combination is 1 then each element of the original array
  // is a combination itself.
  if (comboLength === 1) {
    return comboOptions.map((comboOption) => [comboOption]);
  }

  // Init combinations array.
  const combos = [];

  // Extract characters one by one and concatenate them to combinations of smaller lengths.
  // We need to extract them because we don't want to have repetitions after concatenation.
  comboOptions.forEach((currentOption, optionIndex) => {
    // Generate combinations of smaller size.
    const smallerCombos = combineWithoutRepetitions(
      comboOptions.slice(optionIndex + 1),
      comboLength - 1,
    );

    // Concatenate currentOption with all combinations of smaller size.
    smallerCombos.forEach((smallerCombo) => {
      combos.push([currentOption].concat(smallerCombo));
    });
  });

  return combos;
}

function simulatePermutationsWithRepititions(range, times, accuracy = 100) {

  const outcomeArray = [];

  const generateResult = (r, t) => {
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