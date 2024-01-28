/**
 * ランダムな整数を返す
 * @example
 * randomRangeInt(0, 3)
 * // 1
 * @module randomRange
 * @param {number} min - ランダムな整数の最小値
 * @param {number} max - ランダムな整数の最大値
 * @returns {number} - 結果が戻る
 */
const randomRangeInt = (min, max) => {
	return Math.round(Math.random() * ( max - min ) + min)
}

/**
 * ランダムな数値を返す
 * @example
 * randomRangeNum(0, 3)
 * // 2.5167957500693117
 * @module randomRange
 * @param {number} min - ランダムな数値の最小値
 * @param {number} max - ランダムな数値の最大値
 * @returns {number} - 結果が戻る
 */
const randomRangeNum = (min, max) => {
	return Math.random() * ( max - min ) + min
}

module.exports.randomRangeInt = randomRangeInt
module.exports.randomRangeNum = randomRangeNum