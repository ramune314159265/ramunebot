//hexcolor https://kiwimonitor.amebaownd.com/posts/36819100/
const quakeScales = {
    '-1': {
        name: '不明',
        level: -1,
        ansiColor: '',
        hexColor: '#FFFFFF'
    },
    '10': {
        name: '1',
        level: 1,
        ansiColor: '[0;30m',
        hexColor: '#3C5A82'
    },
    '20': {
        name: '2',
        level: 2,
        ansiColor: '[0;34m',
        hexColor: '#1E82E6'
    },
    '30': {
        name: '3',
        level: 3,
        ansiColor: '[0;32m',
        hexColor: '#78E6DC'
    },
    '40': {
        name: '4',
        level: 4,
        ansiColor: '[0;33m',
        hexColor: '#FFFF96'
    },
    '45': {
        name: '5弱',
        level: 5,
        ansiColor: '[0;35m',
        hexColor: '#FFD200'
    },
    '50': {
        name: '5強',
        level: 6,
        ansiColor: '[0;35m',
        hexColor: '#FF9600'
    },
    '55': {
        name: '6弱',
        level: 7,
        ansiColor: '[0;31m',
        hexColor: '#F03200'
    },
    '60': {
        name: '6強',
        level: 8,
        ansiColor: '[0;31m',
        hexColor: '#BE0000'
    },
    '70': {
        name: '7',
        level: 9,
        ansiColor: '[37;1;41m',
        hexColor: '#8C0028'
    }
}

const quakeScalesByName = {
    '不明': {
        level: -1,
        ansiColor: '',
        hexColor: '#FFFFFF'
    },
    '1': {
        level: 1,
        ansiColor: '[0;30m',
        hexColor: '#3C5A82'
    },
    '2': {
        level: 2,
        ansiColor: '[0;34m',
        hexColor: '#1E82E6'
    },
    '3': {
        level: 3,
        ansiColor: '[0;32m',
        hexColor: '#78E6DC'
    },
    '4': {
        level: 4,
        ansiColor: '[0;33m',
        hexColor: '#FFFF96'
    },
    '5弱': {
        level: 5,
        ansiColor: '[0;35m',
        hexColor: '#FFD200'
    },
    '5強': {
        level: 6,
        ansiColor: '[0;35m',
        hexColor: '#FF9600'
    },
    '6弱': {
        level: 7,
        ansiColor: '[0;31m',
        hexColor: '#F03200'
    },
    '6強': {
        level: 8,
        ansiColor: '[0;31m',
        hexColor: '#BE0000'
    },
    '7': {
        level: 9,
        ansiColor: '[37;1;41m',
        hexColor: '#8C0028'
    }
}

const TsunamiScales = {
    MajorWarning: '大津波警報!',
    Warning: '津波警報!',
    Watch: '津波注意報!',
    Unknown: '不明'
}

const domesticTsunamiInfos = {
    None: 'なし',
    Unknown: '不明',
    Checking: '調査中',
    NonEffective: '若干の海面変動が予想されるが、被害の心配なし',
    Watch: '津波注意報!',
    Warning: '津波予報(津波に警戒)'
}

const foreignTsunamiInfos = {
    None: 'なし',
    Unknown: '不明',
    Checking: '調査中',
    NonEffectiveNearby: '震源の近傍で小さな津波の可能性があるが、被害の心配なし',
    WarningNearby: '震源の近傍で津波の可能性がある',
    WarningPacific: '太平洋で津波の可能性がある',
    WarningPacificWide: '太平洋の広域で津波の可能性がある',
    WarningIndian: 'インド洋で津波の可能性がある',
    WarningIndianWide: 'インド洋の広域で津波の可能性がある',
    Potential: '一般にこの規模では津波の可能性がある'
}

const quakeInfoTypes = {
    ScalePrompt: '震度速報',
    Destination: '震源に関する情報',
    ScaleAndDestination: '震度・震源に関する情報',
    DetailScale: '各地の震度に関する情報',
    Foreign: '遠地地震に関する情報',
    Other: 'その他の情報'
}

/**
 * マグニチュードデータで-1だったら情報なしと返し、それ以外にはMを付ける
 * @param {number} magnitude - マグニチュードデータ
 * @returns {string} - 正規化した結果
 */
const magnitudeNormalizer = (magnitude) => {
    if (magnitude === -1) return '情報なし'
    return `M${magnitude}`
}

/**
 * 震源の深さで-1だったら情報なし、0だったらごく浅いと返し、それ以外には単位を付ける
 * @param {number} magnitude - 深さ
 * @returns {string} - 正規化した結果
 */
const depthNormalizer = (depth) => {
    if (depth === -1) return '情報なし'
    if (depth === 0) return 'ごく浅い'
    return `${depth}km`
}

module.exports.quakeScales = quakeScales
module.exports.quakeScalesByName = quakeScalesByName
module.exports.TsunamiScales = TsunamiScales
module.exports.domesticTsunamiInfos = domesticTsunamiInfos
module.exports.foreignTsunamiInfos = foreignTsunamiInfos
module.exports.quakeInfoTypes = quakeInfoTypes
module.exports.magnitudeNormalizer = magnitudeNormalizer
module.exports.depthNormalizer = depthNormalizer