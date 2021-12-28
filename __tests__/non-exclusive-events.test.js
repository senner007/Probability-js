import Outcome from "../src/permutationsWithRepetitions";

const threeDices = Outcome({
       title: "throw dice 3 times",
       mode : "compute",
       range : [1, 2, 3, 4, 5, 6], // input range (eg. dice)
       times : 3, // roll n times
       showData : false
});

const [ rollingOne ] = threeDices('rolling at least one 1', arr => {
    return arr.includes(1)
});

const [ rollingTwo ] = threeDices('rolling at least one 2', arr => {
    return arr.includes(2)
})

const [ rollingOneAndTwo ] = threeDices('rolling at least one 1 and at least one 2', arr => {
    return arr.includes(1) && arr.includes(2)
})

const [ rollingOneOrTwo ] = threeDices('rolling a 1 or a 2', arr => {
    return arr.includes(1) || arr.includes(2)
})

describe('For 3 dices, rolling at least one 1', () => {
       test('Probability is equal to: 1 - ((5/6)**3)', () => {
              expect(rollingOne).toEqual(1 - ((5/6)**3));
       });
})

describe('For 3 dices, rolling a 1 or a 2', () => {
    test('For non-exclusive events it follows that: P(A) + P(B) - P(A and B) = P(A or B)', () => {
        expect(rollingOne + rollingTwo - rollingOneAndTwo).toEqual(rollingOneOrTwo);
    });

    test('Probability is equal to: 0.7037037037037037', () => {
       expect(rollingOneOrTwo).toEqual(0.7037037037037037);
   });
})
