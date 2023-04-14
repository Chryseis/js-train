function num2ChineseNum(num, isAmount = false) {
  const strNum = num.toString()

  let integerPart
  let decimalPart

  let hasDecimal = strNum.indexOf('.') > -1

  if (hasDecimal) {
    integerPart = strNum.split('.')[0]
    decimalPart = strNum.split('.')[1]
  } else {
    integerPart = strNum
  }

  const length = integerPart.length

  const chineseNum = isAmount
    ? {
        0: '零',
        1: '壹',
        2: '贰',
        3: '叁',
        4: '肆',
        5: '伍',
        6: '陆',
        7: '柒',
        8: '捌',
        9: '玖'
      }
    : {
        0: '零',
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        7: '七',
        8: '八',
        9: '九'
      }

  const chineseUnit = isAmount
    ? {
        0: isAmount ? '元' : '',
        1: '拾',
        2: '佰',
        3: '仟',
        4: '万',
        5: '十万',
        6: '佰万',
        7: '仟万',
        8: '亿',
        9: '拾亿',
        10: '佰亿',
        11: '仟亿',
        12: '兆',
        13: '拾兆',
        14: '佰兆',
        15: '仟兆',
        16: '京'
      }
    : {
        0: isAmount ? '元' : '',
        1: '拾',
        2: '佰',
        3: '仟',
        4: '万',
        5: '十万',
        6: '佰万',
        7: '仟万',
        8: '亿',
        9: '拾亿',
        10: '佰亿',
        11: '仟亿',
        12: '兆',
        13: '拾兆',
        14: '佰兆',
        15: '仟兆',
        16: '京'
      }

  const decimalChineseUnit = { 0: '角', 1: '分' }

  let returnValue = ''
  let decimalReturnValue = ''

  for (let i = 1; i <= length; i++) {
    let exponent = length - i

    const divisor = Math.pow(10, exponent)

    const result = Math.floor(num / divisor)

    const remainder = num % divisor

    if (result === 0) {
      if (!returnValue.endsWith('零')) {
        returnValue = returnValue + chineseNum[result]
      }
    } else {
      if (remainder > Math.pow(10, 12)) {
        returnValue = returnValue + chineseNum[result] + chineseUnit[exponent].replace(/兆/, '')
      } else if (remainder > Math.pow(10, 8)) {
        returnValue = returnValue + chineseNum[result] + chineseUnit[exponent].replace(/亿/, '')
      } else if (remainder > Math.pow(10, 4)) {
        returnValue = returnValue + chineseNum[result] + chineseUnit[exponent].replace(/万/, '')
      } else {
        returnValue = returnValue + chineseNum[result] + chineseUnit[exponent]
      }
    }

    num = remainder
  }

  if (hasDecimal) {
    for (let i = 0; i < decimalPart.length; i++) {
      decimalReturnValue += chineseNum[decimalPart[i]] + decimalChineseUnit[i]
    }
  }

  returnValue = returnValue.replace(/零$/, '元')

  if (isAmount) {
    if (hasDecimal) {
      return returnValue + decimalReturnValue
    } else {
      return returnValue + '整'
    }
  } else {
    if (hasDecimal) {
      return returnValue + '点' + decimalReturnValue
    } else {
      return returnValue + '整'
    }
  }
}

console.log(num2ChineseNum(5))
console.log(num2ChineseNum(5000))
console.log(num2ChineseNum(5001))
console.log(num2ChineseNum(5010))
console.log(num2ChineseNum(5100))
console.log(num2ChineseNum(12102))
console.log(num2ChineseNum(512102))
console.log(num2ChineseNum(3512102))
console.log(num2ChineseNum(63512102))
console.log(num2ChineseNum(21987963512102))
