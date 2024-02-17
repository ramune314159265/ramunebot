/**
 * 全角英数字スペースを半角にする
 * @example
 * toHankakuAlphabet('ＡＢＣ　Ｄ')
 * // ABC D
 * @module toHankaku
 * @param {string} string - 半角にしたい文字列
 * @returns {string} - 結果が戻る
 */
const toHankakuAlphabet = string => {
	return string
		.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => {
			return String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
		})
		.replaceAll('　',' ')
}

module.exports.toHankakuAlphabet = toHankakuAlphabet