function Outcome(range, times) {

  var outcomeArray = (function permutateWithRepetitions(permutationOptions = range, permutationLength = times || permutationOptions.length) {
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

  return function chance(func) {
    return outcomeArray.filter(func).length / outcomeArray.length * 100;
  }

}

const sum = (a, b) => a + b;

var chance = Outcome([1, 2, 3, 4, 5, 6], 3) // input range (eg. dice), roll n times

console.log(chance((v) => v.reduce(sum) > 15)) // example : sum greater than 15
console.log(chance((v) => /(\d)\1{1}/.test(v.sort().join('')))); // example : has two of a kind