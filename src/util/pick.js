/**
 * arrayをindexを中心にmaximum個取り出す
 * @example
 * const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
 * const picked1 = pick(array, 6, 3)
 * // picked1 = [5, 6, 7]
 * const picked2 = pick(array, 4, 5)
 * // picked1 = [2, 3, 4, 5, 6]
 * @module pick
 * @param {array} array - 取り出し元のarray
 * @param {number} index - 取り出すところの中心
 * @param {number} maximum - 取り出す個数
 * @returns {array} - 結果が戻る
 */
const pick = (array, index, maximum) => {
	const length = array.length
	if (maximum >= length) return array
	const start = index - Math.ceil(maximum / 2)
	const offset = (start < 0) ? Math.abs(start) : 0
	const pickedResult = array.slice(index - Math.ceil(maximum / 2) + offset, index + Math.floor(maximum / 2) + offset)
	return pickedResult
}

module.exports = pick