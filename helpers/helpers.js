const sum = (a, b) => a + b;
// const sortToString = v => v.slice(0).sort((a,b) => a -b).join('');
const hasDuplicates = (array) => (new Set(array)).size !== array.length;
function chanceCurry(description, func) {
    var filtered = this.filter(func);
    console.log('\n'  + JSON.stringify(filtered).replace(/,(?=\[)/g, ' - ') + '\n\nProbability of ' + description + ': ' + filtered.length / this.length * 100 + ' %');
  }


export {sum, hasDuplicates, chanceCurry}