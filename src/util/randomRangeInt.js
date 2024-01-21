const randomRangeInt = (min, max) => {
    return Math.round(Math.random() * ( max - min ) + min);
}
const randomRangeNum = (min, max) => {
    return Math.random() * ( max - min ) + min;
}

module.exports.randomRangeInt = randomRangeInt
module.exports.randomRangeNum = randomRangeNum