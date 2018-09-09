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

  return function chance(description, func) {
    var filtered = outcomeArray.filter(func);
    console.log('\n'  + JSON.stringify(filtered).replace(/,(?=\[)/g, ' - ') + '\n\nProbability of ' + description + ': ' + filtered.length / outcomeArray.length * 100 + ' %');
  }
}

const sum = (a, b) => a + b;
const sortToString = v => v.slice(0).sort().join('');

var chance = Outcome([1, 2, 3, 4, 5, 6], 3) // input range (eg. dice), roll n times

chance('sum greater than 15' , v => v.reduce(sum) > 15) 
chance('two of a kind', v => /(\d)\1{1}/.test(sortToString(v)));
chance('rolling a five', v => v.includes(5));  