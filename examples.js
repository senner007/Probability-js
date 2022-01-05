import { hasDuplicates, mapToDistribution } from "./helpers/helpers";
import Outcomes, { printProbability } from "./src/permutationsWithRepetitions";

; (() => {
    const threeDices = Outcomes({
        title: "throw dice 3 times",
        isDependent: false,
        mode: "compute",
        range: [1, 2, 3, 4, 5, 6], // input range (eg. dice)
        times: 3, // roll n times
        showData: true
    });

    const sumGreaterThan15 = threeDices('sum greater than 15', arr => arr.reduce((a, b) => a + b) > 15)
    const atLeastTwoOfAKind = threeDices('at least two of a kind', arr => hasDuplicates(arr));
    const atLeastRollingAFive = threeDices('rolling a five', arr => arr.includes(5));

    const atLeastThreeOfAKind = threeDices('at least three of a kind', arr => {
        const distribution = mapToDistribution(arr);
        if (Object.values(distribution).includes(3)) {
            return true;
        }
    });

    printProbability(...sumGreaterThan15);
    printProbability(...atLeastTwoOfAKind)
    printProbability(...atLeastRollingAFive)
    printProbability(...atLeastThreeOfAKind)
})();

; (() => {
    const towerDefense = Outcomes({
        title: "Five towers that each have a 20% probability of stopping an enemy",
        isDependent: false,
        mode: "compute",
        range: [1, 2, 3, 4, 5],
        times: 5,
        showData: true
    });

    const oneTowerStopping = towerDefense('at least one tower stopping the enemy', arr => arr.includes(1));

    printProbability(...oneTowerStopping)
})();

; (() => {
    const range = Array.from({ length: 366 }, (n, i) => i + 1);
    const n = 100;
    const birtdays = Outcomes({
        title: "100 people with random birthdays",
        isDependent: false,
        mode: "simulate",
        range: range,
        times: n,
        simulationAccuracy: 1000,
        showData: false
    });

    birtdays('at least two people having the same birthday', v => hasDuplicates(v));
})();

; (() => {

    const fiveBalls = Outcomes({
        title: "3 blue, 3 green, 2 orange",
        isDependent: true,
        mode: "compute",
        range: ["B1", "B2", "B3", "G1", "G2", "G3", "O1", "O2"],
        times: 5,
        showData: true
    });


    const twoBlueTwoGreenOneOrange = fiveBalls('selecting 2 blue balls, 2 green balls and 1 orange ball', arr => {
        return arr[0] == "B1" &&
        arr[1] == "B2" &&
        arr[2] == "G1" &&
        arr[3] == "G2" &&
        arr[4] == "O1"
    });

    printProbability(...twoBlueTwoGreenOneOrange)
})();



