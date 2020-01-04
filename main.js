import {hasDuplicates} from "./helpers/helpers";
import Outcome from "./src/permutationsWithRepetitions";

const diceProbability = () => {
    var probability = Outcome({
        title: "throw dice 3 times",
        mode : "compute",
        range : [1, 2, 3, 4, 5, 6], // input range (eg. dice)
        times : 3, // roll n times
        showData : true
    });

    probability('sum greater than 15' , arr => arr.reduce((a, b) => a + b) > 15) 
    probability('at least two of a kind', arr => hasDuplicates(arr));
    probability('rolling a five', arr => arr.includes(5));  

    probability('at least three of a kind', arr => {
        var obj = {};
        for (let n of arr) {
            obj[n] = obj[n] ? obj[n] + 1 : 1;
            if (obj[n] === 3) return true;
        }
    });  
};

diceProbability();

const towerDefence = () => {

    var probability = Outcome({
        title: "Five towers that each have a 20% probability of stopping an enemy",
        mode : "compute",
        range : [1, 2, 3, 4, 5], 
        times : 5, 
        showData : true
    });

    probability('at least one tower stopping the enemy', arr => arr.includes(1));  

};

towerDefence();

const birthDayProbability = () => {
    
    const range = Array.from({length : 366}, (n,i) => i +1);
    var n = 100;
    var probability = Outcome({
        title : "100 people with random birthdays",
        mode : "simulate",
        range : range,
        times : n,
        simulationAccuracy : 1000,
        showData : false
    });
    
    probability('at least two people having the same birthday', v => hasDuplicates(v));
};
 birthDayProbability();






