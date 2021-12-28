import Outcome from "../src/permutationsWithRepetitions";


const threeDices = Outcome({
       title: "throw dice 3 times",
       mode : "compute",
       range : [1, 2, 3, 4, 5, 6], // input range (eg. dice)
       times : 3, // roll n times
       showData : true
});

const [ rollingOne ] = threeDices('rolling a 1', arr => {
    return arr.includes(1)
});

const [ rollingTwo ] = threeDices('rolling a 2', arr => {
    return arr.includes(2)
})

const [ rollingOneAndTwo ] = threeDices('rolling a 1 and a 2', arr => {
    return arr.includes(1) && arr.includes(2)
})

console.log(rollingOneAndTwo)

const [ rollingOneOrTwo ] = threeDices('rolling a 1 or a 2', arr => {
    return arr.includes(1) || arr.includes(2)
})


describe('For 3 dices, rolling at least one one', () => {

       test('Probability must equal: 1 - ((5/6)**3)', () => {
              expect(rollingOne).toEqual(1 - ((5/6)**3));
       });
   
})

   

describe('For 3 dices, rolling a one or a two', () => {

    test('For non-exclusive events it follows that: P(A) + P(B) - P(A and B) = P(A or B)', () => {
        expect(rollingOne + rollingTwo - rollingOneAndTwo).toEqual(rollingOneOrTwo);
    });

    test('Probability must be 0.7037037037037037', () => {
       expect(rollingOneOrTwo).toEqual(0.7037037037037037);
   });

})
