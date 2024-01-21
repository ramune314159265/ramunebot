const toHankakuAlphabet = string => {
    return string
        .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
        })
        .replaceAll("　"," ")
}

module.exports.toHankakuAlphabet = toHankakuAlphabet