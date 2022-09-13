function num2ChineseNum(num) {
  const strNum = num.toString()

  const length = strNum.length

  const chineseNum = { 0: '零', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '七', 8: '八', 9: '九' }

  const chineseUnit = {
    0: '',
    1: '十',
    2: '百',
    3: '千',
    4: '万',
    5: '十万',
    6: '百万',
    7: '千万',
    8: '亿',
    9: '十亿',
    10: '百亿',
    11: '亿亿'
  }

  let retNum = ''

  for (let i = 1; i <= length; i++) {
    let exponent = length - i

    const divisor = Math.pow(10, exponent)

    const result = Math.floor(num / divisor)

    const remainder = num % divisor

    if (result === 0) {
      if (!retNum.endsWith('零')) {
        retNum = retNum + chineseNum[result]
      }
    } else {
      if (remainder > Math.pow(10, 8)) {
        retNum = retNum + chineseNum[result] + chineseUnit[exponent].replace(/亿/, '')
      } else if (remainder > Math.pow(10, 4)) {
        retNum = retNum + chineseNum[result] + chineseUnit[exponent].replace(/万/, '')
      } else {
        retNum = retNum + chineseNum[result] + chineseUnit[exponent]
      }
    }

    num = remainder
  }

  return retNum
}

console.log(num2ChineseNum(2102))
console.log(num2ChineseNum(12102))
console.log(num2ChineseNum(512102))
console.log(num2ChineseNum(3512102))
console.log(num2ChineseNum(63512102))
console.log(num2ChineseNum(163512102))
