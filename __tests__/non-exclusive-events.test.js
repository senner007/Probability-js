import Outcome from "../src/permutationsWithRepetitions";
import { hasDuplicates } from "../helpers/helpers";

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

const [rollingAllEqual] = threeDices('all dices being equal', arr => {
    var obj = {};
    for (let n of arr) {
        obj[n] = obj[n] ? obj[n] + 1 : 1;
        if (obj[n] === 3) return true;
    }
})

const [rollingAllDifferent] = threeDices('all dices being different', arr => {
    return !hasDuplicates(arr)
})

const [rollingTwoSameAndOneDifferent] = threeDices('rolling two same and one different', arr => {
    var obj = {};
    for (let n of arr) {
        obj[n] = obj[n] ? obj[n] + 1 : 1;
    }
    return Object.values(obj).some(entry => entry == 2)
})

describe('For 3 dices, all dices being different', () => {

    test('Probability is equal to: 6/6 * 5/6 * 4/6 = 120/216', () => {
        expect(rollingAllDifferent).toEqual(6/6 * 5/6 * 4/6);
    });

    test('Probability is equal to: 120/216', () => {
        expect(rollingAllDifferent).toEqual(120/216);
    });
})

describe('For 3 dices, all dices being equal', () => {

    test('Probability is equal to: 6/216', () => {
        expect(rollingAllEqual).toEqual(6/216);
    });
})

describe('For 3 dices, rolling two same and one different', () => {

    test('Probability is equal to:  1 - rollingAllEqual - rollingAllDifferent = 90/216', () => {
        expect(rollingTwoSameAndOneDifferent).toBeCloseTo(1 - rollingAllEqual - rollingAllDifferent, 5);
    });

    test('Probability is equal to: 90/216', () => {
        expect(rollingTwoSameAndOneDifferent).toEqual(90 / 216);
    });
})

describe('For 3 dices, rolling at least one 1 and at least one 2', () => {

    test('Probability is equal to: rollingTwoSameAndOneDifferent / 3 = 30/216', () => {
        expect(rollingOneAndTwo).toEqual(rollingTwoSameAndOneDifferent /3);
    });

    test('Probability is equal to: 30/216', () => {
        expect(rollingOneAndTwo).toEqual(30 / 216);
    });
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
