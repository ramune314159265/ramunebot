/**
 * 指定の文字数を越えたら省略する
 * @example
 * truncate('0123456789',5)
 * // 0123…
 * @module truncate
 * @param {string} string - 省略したい文字列
 * @param {number} maxLength - 最大文字数
 * @param {string} string - 省略記号
 * @returns {string} - 結果が戻る
 */
const truncate = (string, maxLength, ellipsis) => {
    if (string.length <= maxLength) {
        return string
    }
    const subString = string.slice(0, maxLength - 1)
    return (ellipsis
        ? subString.slice(0, subString.lastIndexOf(" "))
        : subString) + '…'
};

module.exports.truncate = truncate