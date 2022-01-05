import Outcomes from "../src/permutationsWithRepetitions";
import { mapToDistribution } from "../helpers/helpers";

const fiveBalls = Outcomes({
    title: "Blue, Green and Orange",
    isDependent: true,
    mode: "compute",
    range: ["B", "B", "B", "G", "G", "G", "O", "O"],
    times: 5,
    showData: true
});

const [twoBlueTwoGreenOneOrange] = fiveBalls('selecting 2 blue balls, 2 green balls and 1 orange ball', arr => {
    const distribution = mapToDistribution(arr);
    return distribution["B"] == 2 && distribution["G"] == 2 && distribution["O"] == 1
});

describe('Selecting 2 blue balls, 2 green balls and 1 orange ball', () => {
    test('Probability is equal to: 3/8 * 2/7 * 3/6 * 2/5 * 2/4 * 5!/2!*2!', () => {
        expect(twoBlueTwoGreenOneOrange).toEqual(3 / 8 * 2 / 7 * 3 / 6 * 2 / 5 * 2 / 4 * 5 * 4 * 3 / 2);
    });
});

