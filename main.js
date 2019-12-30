import {sum , hasDuplicates} from "./helpers/helpers";
import Outcome from "./src/permutationsWithRepetitions";

const diceChance = () => {
    // var chance = simulatePermutationsWithRepititions([1, 2, 3, 4, 5, 6], 3) // input range (eg. dice), roll n times
    var chance = Outcome({
        mode : "compute",
        range : [1, 2, 3, 4, 5, 6],
        times : 3
    }) // input range (eg. dice), roll n times

    chance('sum greater than 15' , v => v.reduce(sum) > 15) 
    chance('two of a kind', v => hasDuplicates(v));
    chance('rolling a five', v => v.includes(5));  
};

diceChance();

const birthDayChance = () => {
    
     // the possibility of at least two out of n people having the same birthday
    const range = Array.from({length : 366}, (n,i) => i +1);
    var n = 100;
    var chance = Outcome({
        mode : "simulate",
        range : range,
        times : n
    }) // input range (eg. dice), roll n times
    chance('at least two people having the same birthday', v => hasDuplicates(v));
};

// birthDayChance();






