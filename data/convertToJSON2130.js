const fs = require('fs');

function normalizeName(rawName) {
    return rawName
        .toLowerCase()
        .replace(/\b[a-z]/g, l => l.toUpperCase());
}

function tupleify(arr) {
    if (arr.length == 0 || arr.length == 1)
        return [];
    else
        return [arr.slice(0, 2)].concat(tupleify(arr.slice(2)));
}

function constructProduct([name, prodDays, outputRate]) {
    return {
        name: normalizeName(name),
        unitRate: outputRate / prodDays
    };
}

function constructComponent(prodDays, [name, outputRate]) {
    return {
        name: normalizeName(name),
        unitRate: outputRate / prodDays
    };
}

function parseProductDefinition(rawString) {
    const notEmpty = str => str !== '';

    const bits = rawString
        .split(',')
        .filter(notEmpty);

	const prodBits = bits.slice(0, 3);
	const prodDays = prodBits[1];
	const product = constructProduct(prodBits);

    const components = {
        components: tupleify(bits.slice(3))
            .map(tuple => constructComponent(prodDays, tuple))
    };

    return Object.assign({}, product, components);
}

function createDict(carry, product) {
    return Object.assign({}, carry, {
        [product.name]: product
    });
}

const ratesData = fs
    .readFileSync('./ROI2130.csv')
	.toString()
	.trim()
    .split('\n')
	.map(parseProductDefinition)
    .reduce(createDict, {});

console.log(JSON.stringify(ratesData, null, 4));
