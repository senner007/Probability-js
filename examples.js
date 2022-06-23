import { hasDuplicates, mapToDistribution } from "./helpers/helpers";
import Outcomes, { printProbability } from "./src/outcomes";

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

    const threeOfAKind = threeDices('three of a kind', arr => {
        const distribution = mapToDistribution(arr);
        return Object.values(distribution).includes(3)
    });

    printProbability(...sumGreaterThan15);
    printProbability(...atLeastTwoOfAKind)
    printProbability(...atLeastRollingAFive)
    printProbability(...threeOfAKind)
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
    const range = Array.from({ length: 365 }, (n, i) => i + 1);
    const peoplesBirthday = Outcomes({
        title: "100 people with random birthdays",
        isDependent: false,
        mode: "simulate",
        range: Array.from({ length: 365 }, (n, i) => i + 1),
        times: 100,
        simulationAccuracy: 10000,
        showData: false
    });

    const birthdayConundrum = peoplesBirthday('at least two people having the same birthday', v => hasDuplicates(v));

    printProbability(...birthdayConundrum)
})();

; (() => {
    const fourBalls = Outcomes({
        title: "Picking a subset from a collection of blue(B), green(G) and orange(O) balls without replacement",
        isDependent: true,
        mode: "compute",
        range: ["B", "G", "G", "G", "O"],
        times: 4,
        showData: true
    });

    const oneBlueTwoGreenOneOrange = fourBalls('selecting 1 blue ball, 2 green balls and 1 orange ball', arr => {
        const distribution = mapToDistribution(arr);
        return distribution["B"] == 1 && distribution["G"] == 2 && distribution["O"] == 1
    });

    printProbability(...oneBlueTwoGreenOneOrange)
})();



