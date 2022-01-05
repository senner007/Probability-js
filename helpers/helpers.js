const hasDuplicates = (outcome) => (new Set(outcome)).size !== outcome.length;

const mapToDistribution = (outcome) => {
    const distribution = {};
    for (let n of outcome) {
        distribution[n] = distribution[n] ? distribution[n] + 1 : 1;
    }
    return distribution
}

export {hasDuplicates, mapToDistribution}