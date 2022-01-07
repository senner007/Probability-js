export function permutationWithRepetitions(permutationOptions, permutationLength) {
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
  
  
  export function combineWithoutRepetitions(comboOptions, comboLength) {
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
  
  export function kSubsetPermutations(set, k, partial = []) {
    const results = []
    function recurse(set, k, partial = []) {
      for (const element in set) {
        if (k > 1) {
          const set_copy = set.slice();         // slice() creates copy of array
          set_copy.splice(element, 1);        // splice() removes element from array
          recurse(set_copy, k - 1, partial.concat([set[element]]));
        }                                       // a.concat(b) appends b to copy of a
        else {
          results.push(partial.concat([set[element]]))
        }
  
      }
    }
    recurse(set, k)
    return results
  }
  
  
  export function simulatePermutationsWithRepititions(range, times, accuracy = 100) {
  
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