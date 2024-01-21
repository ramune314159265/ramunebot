const randomRangeInt = (min, max) => {
    return Math.random() * ( max - min ) + min;
}

module.exports = randomRangeInt