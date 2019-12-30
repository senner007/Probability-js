import {sum , hasDuplicates, chanceCurry} from "./helpers/helpers";

function simulatePermutationsWithRepititions(range, times, accuracy = 100) {

        const outcomeArray = [];
        

        const generateResult = (r , t) => {
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

       
        return chanceCurry.bind(outcomeArray);
    
}

const diceChance = () => {
    var chance = simulatePermutationsWithRepititions([1, 2, 3, 4, 5, 6], 3) // input range (eg. dice), roll n times

    chance('sum greater than 15' , v => v.reduce(sum) > 15) 
    chance('two of a kind', v => hasDuplicates(v));
    chance('rolling a five', v => v.includes(5));  
};

 diceChance();

const birthDayChance = () => {
    
     // the possibility of at least two out of n people having the same birthday
    const range = Array.from({length : 366}, (n,i) => i +1);
    var n = 100;
    var chance = simulatePermutationsWithRepititions(range, n) // input range (eg. dice), roll n times
    chance('at least two people having the same birthday', v => hasDuplicates(v));
};

birthDayChance();






