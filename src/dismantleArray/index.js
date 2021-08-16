/**
 *  输入：[1, [2, 3, [4]], 5]  '[a, [b, [c], e], d, f]'
 * 输出：{ a: 1, b: 2, c: 4, e: undefined, d: 5, f: undefined }
 * 注意：e和f没有匹配到任何值
 * @param a
 * @param b
 * @returns {{}}
 */

function dismantleArray(a, b) {
  try {
    b = JSON.parse(b.replace(/(\w+)/g, '"$1"'))
  } catch (e) {
    console.log('输入字符串有误')
  }

  function parse(initArr, matchArr, initRet = {}) {
    for (let i = 0, j = 0; i < matchArr.length; i++, j++) {
      let key = matchArr[i]
      if (Array.isArray(key) && Array.isArray(initArr[j])) {
        parse(initArr[j], matchArr[i], initRet)
      } else if (!Array.isArray(key) && Array.isArray(initArr[j])) {
        if (!initRet[key]) {
          initRet[key] = undefined
        }
        j = j - 1
      } else if (Array.isArray(key) && !Array.isArray(initArr[j])) {
        if (j < initArr.length) {
          i = i - 1
        } else {
          parse([], matchArr[i], initRet)
        }
      } else {
        if (!initRet[key]) {
          initRet[key] = initArr[j]
        }
      }
    }
    return initRet
  }

  return parse(a, b)
}

let arr = [1, 2, [2, 3, [4]], 5, [7, 8, [10]], [null, 'o']]

let arrStr = '[a,h,[w,y],[b,z, g, y, [c], e], d, f,[t], [k,p,[o,[u]]]]'

console.log(dismantleArray(arr, arrStr))
