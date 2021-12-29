import Outcome from "../src/permutationsWithRepetitions";

const N_THROWS = 3;
const N_RANGE = 6

const threeDices = Outcome({
    title: `throw dice ${N_THROWS} times`,
    mode: "compute",
    range: Array.from({ length: N_RANGE }, (n, i) => i + 1), // input range (eg. dice)
    times: N_THROWS, // roll n times
    showData: false
});

const [rollingOne] = threeDices('rolling at least one 1', arr => {
    return arr.includes(1)
});

const [rollingTwo] = threeDices('rolling at least one 2', arr => {
    return arr.includes(2)
})

const [rollingOneAndTwo] = threeDices('rolling at least one 1 and at least one 2', arr => {
    return arr.includes(1) && arr.includes(2)
})


const [rollingOneOrTwo] = threeDices('rolling a 1 or a 2', arr => {
    return arr.includes(1) || arr.includes(2)
})

describe('For 3 dices, rolling at least one 1', () => {
    test('Probability is equal to: Total - (N_RANGE -1 / N_RANGE) ** N_THROWS) = 1 - ((5/6)**3)', () => {
        expect(rollingOne).toEqual(1 - ((N_RANGE - 1) / N_RANGE) ** N_THROWS);
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
