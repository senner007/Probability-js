import Outcomes from "../src/permutationsWithRepetitions";
import { mapToDistribution } from "../helpers/helpers";

describe('Selecting 2 blue balls, 2 green balls and 1 orange ball', () => {

    const fiveBalls = Outcomes({
        title: "Picking a subset from a collection of blue(B), green(G) and orange(O) balls without replacement",
        isDependent: true,
        mode: "compute",
        range: ["B", "B", "B", "G", "G", "G", "O", "O"],
        times: 5,
        showData: false
    });

    const [twoBlueTwoGreenOneOrange] = fiveBalls('selecting 2 blue balls, 2 green balls and 1 orange ball', arr => {
        const distribution = mapToDistribution(arr);
        return distribution["B"] == 2 && distribution["G"] == 2 && distribution["O"] == 1
    });


        test('Probability is equal to: 3/8 * 2/7 * 3/6 * 2/5 * 2/4 * 5!/2!*2!', () => {
            expect(twoBlueTwoGreenOneOrange).toEqual(3 / 8 * 2 / 7 * 3 / 6 * 2 / 5 * 2 / 4 * 5 * 4 * 3 / 2);
        });
    });


describe('Selecting 1 blue balls, 2 green balls and 1 orange ball with data shown method', () => {

    const fourBalls = Outcomes({
        title: "Picking a subset from a collection of blue(B), green(G) and orange(O) balls without replacement",
        isDependent: true,
        mode: "compute",
        range: ["B", "G", "G", "G", "O"],
        times: 4,
        showData: true
    });

    const [oneBlueTwoGreenOneOrange] = fourBalls('selecting 1 blue ball, 2 green balls and 1 orange ball', arr => {
        const distribution = mapToDistribution(arr);
        return distribution["B"] == 1 && distribution["G"] == 2 && distribution["O"] == 1
    });

    test('Probability is equal to: 1 / 5 * 3 / 4 * 2 / 3 * 1 / 2  * (4!/2!)', () => {
        const calc = 1 / 5 * 3 / 4 * 2 / 3 * 1 / 2  * (4 * 3 * 2 / 2)
        expect(oneBlueTwoGreenOneOrange.toFixed(5)).toEqual(calc.toFixed(5));
    });
});
