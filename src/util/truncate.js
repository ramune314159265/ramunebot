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