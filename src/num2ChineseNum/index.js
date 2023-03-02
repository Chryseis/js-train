function num2ChineseNum(num) {
  const strNum = num.toString()

  const length = strNum.length

  const chineseNum = { 0: '零', 1: '壹', 2: '贰', 3: '叁', 4: '肆', 5: '伍', 6: '陆', 7: '柒', 8: '捌', 9: '玖' }

  const chineseUnit = {
    0: '',
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

  let returnValue = ''

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

  return returnValue
}

console.log(num2ChineseNum(5))
console.log(num2ChineseNum(12102))
console.log(num2ChineseNum(512102))
console.log(num2ChineseNum(3512102))
console.log(num2ChineseNum(63512102))
console.log(num2ChineseNum(21987963512102))
