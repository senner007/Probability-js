import {sum , hasDuplicates, chanceCurry} from "./helpers/helpers";

function Outcome(range, times) {

  const outcomeArray = (function permutateWithRepetitions(permutationOptions = range, permutationLength = times || permutationOptions.length) {
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
  })();

  return chanceCurry.bind(outcomeArray);
}
var chance = Outcome([1, 2, 3, 4, 5, 6], 3) // input range (eg. dice), roll n times

chance('sum greater than 15' , v => v.reduce(sum) > 15) 
chance('two of a kind', v => hasDuplicates(v));
chance('rolling a five', v => v.includes(5));  