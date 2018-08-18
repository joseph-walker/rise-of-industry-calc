const fs = require('fs');

/*
A product looks like:
{
    name: 'Some Product',
    unitRate: 0.1,
    components: [
        {
            name: 'Some Component',
            unitRate: 0.06667
        }
    ]
}
*/

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

function constructProduct([name, unitRate]) {
    return {
        name: normalizeName(name),
        unitRate: unitRate
    };
}

function parseProductDefinition(rawString) {
    const notEmpty = str => str !== '';

    const bits = rawString
        .split(',')
        .filter(notEmpty);

    const product = constructProduct(bits.slice(0, 2));
    const components = {
        components: tupleify(bits.slice(2))
            .map(constructProduct)
    };

    return Object.assign({}, product, components);
}

function createDict(carry, product) {
    return Object.assign({}, carry, {
        [product.name]: product
    });
}

const ratesData = fs
    .readFileSync('./../data/roiRates.csv')
    .toString()
    .split('\n')
    .map(parseProductDefinition)
    .reduce(createDict, {});

console.log(JSON.stringify(ratesData, null, 4));
