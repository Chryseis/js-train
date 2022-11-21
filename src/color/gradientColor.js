// #ffffff
function hex2Rgb(hex) {
  hex = hex.replace('#', '')

  return `rgb(${hex
    .split('')
    .reduce((result, item, i) => {
      if (i % 2 === 1) {
        result[result.length - 1] = result[result.length - 1] + item
        return result
      } else {
        return result.concat(item)
      }
    }, [])
    .map(o => parseInt(o, 16))
    .join()})`
}

// rgb(255,255,255)
function rgb2Hex(rgb) {
  const rgbArr = rgb.match(/\d+/g)
  return (
    '#' +
    rgbArr
      .map(color => {
        return Number(color).toString(16).padStart(2, '0')
      })
      .join('')
  )
}

// #ffffff or rgb(255,255,255)
function isHex(color) {
  return color.startsWith('#')
}

// rgb(255,255,255)
function getRgbArr(color) {
  return color.match(/\d+/g).map(o => Number(o))
}

function calcColor(start, end, ratios) {
  return Math.floor(start + (end - start) * ratios)
}

// Gradient = Start+ (End-Start) / Step * N
function gradientColor(sColor, eColor, min, max, value) {
  const formatStartColor = isHex(sColor) ? hex2Rgb(sColor) : sColor
  const formatEndColor = isHex(eColor) ? hex2Rgb(eColor) : eColor

  const [sR, sG, sB] = getRgbArr(formatStartColor)
  const [eR, eG, eB] = getRgbArr(formatEndColor)

  let ratios = value / (max - min)

  ratios = Math.min(ratios, 1)

  ratios = Math.max(ratios, 0)

  const result = [calcColor(sR, eR, ratios), calcColor(sG, eG, ratios), calcColor(sB, eB, ratios)]

  return rgb2Hex(`rgb(${result.join()})`)
}

console.log(gradientColor('#021137', '#315FAE', 1, 10, 2))
