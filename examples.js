import {hasDuplicates} from "./helpers/helpers";
import Outcome, { printProbability } from "./src/permutationsWithRepetitions";

;(() => {
    const threeDices = Outcome({
        title: "throw dice 3 times",
        mode : "compute",
        range : [1, 2, 3, 4, 5, 6], // input range (eg. dice)
        times : 3, // roll n times
        showData : true
    });

    threeDices('sum greater than 15' , arr => arr.reduce((a, b) => a + b) > 15) 
    threeDices('at least two of a kind', arr => hasDuplicates(arr));
    threeDices('rolling a five', arr => arr.includes(5));  

    const atLeastThreeOfAKind = threeDices('at least three of a kind', arr => {
        const obj = {};
        for (let n of arr) {
            obj[n] = obj[n] ? obj[n] + 1 : 1;
            if (obj[n] === 3) return true;
        }
    }); 

    printProbability(...atLeastThreeOfAKind)
    
})();

;(() => {
    const towerDefense = Outcome({
        title: "Five towers that each have a 20% probability of stopping an enemy",
        mode : "compute",
        range : [1, 2, 3, 4, 5], 
        times : 5, 
        showData : true
    });

    towerDefense('at least one tower stopping the enemy', arr => arr.includes(1));  

})();

;(() => {
    
    const range = Array.from({length : 366}, (n,i) => i +1);
    const n = 100;
    const birtdays = Outcome({
        title : "100 people with random birthdays",
        mode : "simulate",
        range : range,
        times : n,
        simulationAccuracy : 1000,
        showData : false
    });
    
    birtdays('at least two people having the same birthday', v => hasDuplicates(v));
})();



