/**
 * ランダムな整数を返す
 * @example
 * randomRangeInt(0, 3)
 * // 1
 * @module random
 * @param {number} min - ランダムな整数の最小値
 * @param {number} max - ランダムな整数の最大値
 * @returns {number} - 結果が戻る
 */
const randomRangeInt = (min, max) => {
	return Math.round(Math.random() * (max - min) + min)
}

/**
 * ランダムな数値を返す
 * @example
 * randomRangeNum(0, 3)
 * // 2.5167957500693117
 * @module random
 * @param {number} min - ランダムな数値の最小値
 * @param {number} max - ランダムな数値の最大値
 * @returns {number} - 結果が戻る
 */
const randomRangeNum = (min, max) => {
	return Math.random() * (max - min) + min
}

/**
 * 配列から一つの要素をランダムに返す
 * @example
 * RandomFromArray(['a', 'b', 'c'])
 * // 'c'
 * @module random
 * @param {array} array - 元の配列
 * @returns {any} - 結果が戻る
 */
const randomFromArray = array => {
	return array[Math.floor(Math.random() * array.length)]
}

module.exports.randomRangeInt = randomRangeInt
module.exports.randomRangeNum = randomRangeNum
module.exports.randomFromArray = randomFromArray