import {hasDuplicates} from "./helpers/helpers";
import Outcome from "./src/permutationsWithRepetitions";

const diceChance = () => {
    var chance = Outcome({
        title: "throw dice 3 times",
        mode : "compute",
        range : [1, 2, 3, 4, 5, 6], // input range (eg. dice)
        times : 3, // roll n times
        showData : true
    });

    chance('sum greater than 15' , v => v.reduce((a, b) => a + b) > 15) 
    chance('at least two of a kind', v => hasDuplicates(v));
    chance('rolling a five', v => v.includes(5));  

    chance('at least three of a kind', arr => {
        var obj = {};
        for (let n of arr) {
            obj[n] = obj[n] ? obj[n] + 1 : 1;
            if (obj[n] === 3) return true;
        }
    });  
};

diceChance();

const birthDayChance = () => {
    
    const range = Array.from({length : 366}, (n,i) => i +1);
    var n = 100;
    var chance = Outcome({
        title : "100 people with random birthdays",
        mode : "simulate",
        range : range,
        times : n,
        simulationAccuracy : 1000,
        showData : false
    });
    
    chance('at least two people having the same birthday', v => hasDuplicates(v));
};
 birthDayChance();






