# js-train

## 目录

- [Color](#Color)

- [Debounce](#Debounce)

- [DeepClone](#DeepClone)

- [DismantleArray](#DismantleArray)

- [DynamicPlanning](#DynamicPlanning)

- [Event](#Event)

- [Format](#Format)

- [Inherit](#Inherit)

- [JsBridge](#JsBridge)

- [LuckyDraw](#LuckyDraw)

- [Middleware](#Middleware)

- [New](#New)

- [Num2ChineseNum](#Num2ChineseNum)

- [Promise](#Promise)

  - [promise](#promise)

  - [promiseAll](#promiseAll)

  - [promiseRace](#promiseRace)

- [ReadFiles](#ReadFiles)

- [Redux](#Redux)

  - [redux](#redux)

  - [middleware](#middleware)

- [Regex](#Regex)

- [Request4Node](#Request4Node)

- [Sort](#Sort)

  - [bubbleSort](#bubbleSort)

  - [quickSort](#quickSort)

- [Stack](#Stack)

- [Throttle](#Throttle)

- [Tree](#Tree)

  - [expandTree](#expandTree)

  - [findPath](#findPath)

  - [genTree](#genTree)

  - [transform](#transform)

- [Websocket](#Websocket)

## Color

```javascript
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
```

[![Edit Color demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVIgD0dABAMRhvsA6qYArqsRQjlGAC2wAmAEoBzAEYAKMVgCUjYF0ajsjALxbcAJxgAHKAENiMeQHJm1gDSNr15QG4NjIxR4HUjAAYGcvIAJMBKOHCmEBQ2LjhG6DyW8vJGcDxQFI4xMAC2Oao6AHxqHpoQYIzyEIwApIziujp6AIyq6n6a3emZFADavVk4sKjSFCKMALSMrQC6up7wfYPLw6PjkzPzjADUjLl57l3dS96-SxlZx6cAvowwUHAwZSc9MOd-QxQ4ZPxmsUObnKjFuHlujn6c2UODyZmM8lIulKxjMBmeAElKIjHK0AGzKGF4UhoeTKW7KfzHe4MTzBcQAVgZ9kZzNZyi4nO4fAEQi-cnEAAlsGk5B0PH84BQ6bIAIIGAyLIKyWEA4gieR0DgcdC7OjSYFdLw-Py2ax7GXygyqhFkKCkRUlV6nY0XAByPDyshgBnkdodMIopAAyhQDGhpPJ8TDUehQ2jYuJHNYAAwuG6gokk1BxQ00pisdhsRgOmXyVkspmVhkc1Bc3j8QTCCBwYVYP2ke0GcVGj4mxj-61ShNwADqMQ1ZrzjFpyvLVYr7K5XAbvOE0g-MjlCo7XZ7mldfkHqoo6s12t1-phcIRSKdHq9PsRhOp9Z5TaPZigxAAwp2HfIw4GNkDwYI4BgAkIcD7mc_YALIAiIOBgPaAFAdK-zyNQ6DTIw6GqAAVJ4kGkNB1IzkwADiEHoBA1DSno8bAZhACiGBTExFCqEwoYmIwRFusu3KNnyjDSDRdGUH-XaAdJDqODAckGI4eRoCpZhYI4ABuX48DAMGStKYAOnCFCcUpiwtm2sn_t2jAAPz6FIwRwEpqiIHhSkZoZjDGQYplsegFl6FZIqKbZqiOUozkKOFe6MB5cUOt55BSow_RwJIjhwJR2UAEILHoG4UFuVryH5pnmRFKWoGl_QwFlDy5Q8BWLMVpU7hVAKBW5GawNKEFNnAiw6VAekztUcJYLhqmoIaB4kcNegIRMsKkoNUG4vNxFDYsK1IVNaSLY4KbbT53yLP0xBfr-tmAY1DXgYtyiONd35KYBzUwM1G2kS9A43R9cB5QpIM7VByhzBmh4ykKIqBMEYTfPg2ZkhS_h5lykqdjAIykJG4lmLR9EfbYKbiK0rQAMwAOwOE4zBU60DIAGKyix9OtLiKaOOIL4gPYIAtnlaBogAnkgYBfs8EJCxg2A4CIFB5FASCgH8VA0IgIAADwAIQACIAPI_gAKgAmgACixojK1AxRcDrSsq4w5hjDo1jUNYDuoE7MBEz7mg63kHxmAOIhos8FAewAqqbLNTAAHN7Hg64IFCwMUpsxLAOt0OnmeO3QYgB47sikOgYs-zrtFacUgDKRoAAPrY7AgDStoAq9GAMdygCAHnntfV3AxDhsY0pwAYxAezgdBoJguAEN7eeD8PFDV3Q5eV6vzv21wAtC8DosGBLiBS08MC3OfQA&fontsize=14px&hidenavigation=1&theme=dark)

## Debounce

```javascript
const debounce = (fn, delay, maxTime) => {
  let timer = null
  let lastTime = 0
  maxTime = maxTime ?? delay

  return function () {
    const context = this

    if (lastTime) {
      const currentTime = +new Date()
      if (currentTime - lastTime > maxTime) {
        lastTime = +new Date()
        fn.apply(context, arguments)
      } else {
        clearTimeout(timer)
        timer = setTimeout(function () {
          lastTime = +new Date()
          fn.apply(context, arguments)
        }, delay)
      }
    } else {
      fn.apply(context, arguments)
      timer = true
      lastTime = +new Date()
    }
  }
}

const fn = debounce(() => {
  console.log('user click')
}, 500)

setInterval(fn, 100)
```

[![Edit Debounce demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVInlwUAEmARqQK6rEyMC8jACjCoANMxhQAhgE8xAW0lYAKhDkwAlHwB8jYAB1UjRrCYVVMAE59GqdlCgBuA0ZPHJDFWusAGJ4cYKyubWgZ48APzh4lLSfkYWMBTsFoZgnMRm5IKa-v5GZKgMjAVUWEz8FAAWEHB-zkaMEGCCUh7mOfUNxfRMxMkJlGHWANSoMADujAAiklQC6nV5DU2CfRYDFEMAtG5tXjqh7bqdXbubwfyjE9OzMPNxp0bCOJIADq9Q0gIl2BRikhYAObsNSUOALE5GAC-jAkcB4uUe-VgALCHAoAjMagsEKWXSxlms8POanRQnSmUM82OeNOrRJPEuY0mMzmuKRDWebw-Xx-ZX-QJB1Ao4IejyhYkwMXZpyhJxhcIRkMYXPen2-5FKf0YAOBoJFMvx5isFQs7BgYoa9KGTOurLuhsYcv8UL8roMBgKRWE1lYHC4d2pvB0iO6hVIsBwUFIgIEAHJ2PCrMQoBBiABrOO4iWMACs3m8uOJAElKJYAG6SKBCUSMACMBYWIBEIBqACE0ADpEgwFX4RLWxhsDhKhQ5FAkKAfjRECAADwAQimAHkAMJKACaAAUAKKMUfjrQGOcHqBuVCA3hx6hxo-oE8wSToO9GOdqCiSYqVAHEq8AVSUAAxLYAA5b3qOczAoWAtBUaCYDnAB6KCYOPRDKkfZ9jzYdBpDvOd0AgcstEAZSNAAB9L0IxgQBpW0AVejAGO5QBADyQwjiOPOBiAsCBXiYOALGIK8cEQtBMFwAhbyQjiuJ4_DEJwvC0NPO9m1bOAO1QLsez7GAoV0oA&fontsize=14px&hidenavigation=1&theme=dark)

## DeepClone

```javascript
// 通过数组存储，查询访问对象
// 尾调用，提高递归效率
const deepCloneByArray = val => {
  const visitedObjs = []

  const clone = val => {
    if (val instanceof RegExp) return new RegExp(val)
    if (val instanceof Date) return new Date(val)
    if (val === null || typeof val !== 'object') return val // 简单类型

    let retVal
    let visitedObj = visitedObjs.find(({ obj }) => obj === val)
    if (!visitedObj) {
      retVal = Array.isArray(val) ? [] : {}
      visitedObjs.push({ obj: val, retVal })
      Object.keys(val).forEach(key => {
        retVal[key] = clone(val[key])
      })
      return retVal
    } else {
      return visitedObj.retVal
    }
  }

  return clone(val)
}

// 通过Map，提高搜索访问对象效率
const deepCloneByMap = val => {
  const visitedObjs = new Map()

  const clone = val => {
    if (val instanceof RegExp) return new RegExp(val)
    if (val instanceof Date) return new Date(val)
    if (val === null || typeof val !== 'object') return val // 简单类型

    let retVal
    if (!visitedObjs.has(val)) {
      retVal = Array.isArray(val) ? [] : {}
      visitedObjs.set(val, retVal)
      Object.keys(val).forEach(key => {
        retVal[key] = clone(val[key])
      })
      return retVal
    } else {
      return visitedObjs.get(val)
    }
  }

  return clone(val)
}

// WeakMap 比 Map更安全，防止Map的key不被垃圾回收
const deepCloneByWeakMap = (obj, hash = new WeakMap()) => {
  // 递归拷贝
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Date) return new Date(obj)
  if (obj === null || typeof obj !== 'object') return obj // 简单类型

  if (hash.has(obj)) return hash.get(obj) // 循环引用

  const instance = new obj.constructor()
  hash.set(obj, instance)

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      instance[key] = deepCloneByWeakMap(obj[key], hash)
    }
  }
  return instance
}

const obj = { a: 2 }
obj.b = { d: 1, c: obj, e: [1, 2, 3, obj] }
obj.b.f = obj.b.c
obj.f = obj.b.e

let start = +new Date()
console.log(deepCloneByArray(obj))
console.log(+new Date() - start, 'Array')

let start1 = +new Date()
console.log(deepCloneByMap(obj))
console.log(+new Date() - start1, 'Map')

let start2 = +new Date()
console.log(deepCloneByWeakMap(obj))
console.log(+new Date() - start2, 'WeakMap')
```

[![Edit DeepClone demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVIgD0dABIFgJg4_GAOpoCN-gGtqAVCoDD_gU_NAR9GB-6MB3qYE_tQIYxAHVQNGgPh1AwDGAKV36AF40AbWYCQEwEr6gCVNA4c7yyqOBUaYYABwDCUcjABCATwCCAJy8BDN4wAvIwAbr5QQQB8jMDyjIzmlqEQcBBU6ADyAEYEQYwA2gC6ANzycQnkScROqDB5YRGB0bGo8fEQYIwAFA2MaJa-qMQwpJ0ASjAA5gCiWLYAlIxeMBQArl6ttQDujBMzcz3h86WtbR3dvf0Ug8OjjAAivlSLy2sbjNsPTzCHUMfl7U6vyCgWCqFWUAiAB8oYwKG5bCNOr0AISgxgAclIORgxAoGJeK3WrQaxUYikAAd6AVWVAN4-gGj1MqneKwKyvABq4RObUYLOSqXS2Tw9RSaRgmRycBwkAwXS6LW58WxeABjAAvosmowlSDgg1_qgVecuiiQiKBTlFvKFezwnlvH43DgUvb_L9FgB-AqFRiIGKqrkK038sWCyW2VZwAAWcpV3KVvoaABpY20bVAU-qA9zBbiKDgANYwNxwN1S0heaa-YjRwsBTVWhVLFYcqD5Wve4LVZy_NtFwr6xuZlOvYlNigtrNqxgwKBwOoN1NE95B0XivA4NOT1Xlf2M-Ij95d2puk7-8lMNgAWV8ti02kAOCaAIl8JDITIyzJUrDYHDVXG5r7Y9S2vW5SJFYK7mrkYIwDsAFdPqoGfgkv5AY0zSGkClwWNcQxIrsUyzAsY6jp8eyESeGEXLaVw3HhjzPMR7yfPRPx6pORq9KCYIQtCsLwoidyouiWI4niBKMSSnLnow1L0nubS8pu8mAt0JpmiGEo4JGvglnqlrDs2wGMC6jrOj4rp6ownpFD6fqTvEEEaQQOBzhQvyJmOLYDgqOZ4gWRa6UcZYVlWNZFlEMQpvuhmtu2eRHqx4S9m4_b2Wq3ncgerRKUyU4znOkW5dFbwkupa6SpMKwUbl26nLuBqnFlyHdmx8hnooADqMC-PmAGMIAK9aMABgAvZoAkdqABaK_CAExpgBG1gBgAhbrWgCwcoA1RGAMHqgB86oAe2qAGym75DEh36OM47hdT1fXBF0SoedpUZ5J8Z29Te8EauhpyKAYgDvRoAuLHlEa2o0bhdxkXMhIlR8MH4fsthXRaAb_TkfTYbRdwsWDJGQyxsN4N5CNClxHw8YwMJwgieHamiwQiXgubiU1SpkpStIMg1KldLdkZaTp2PzOj7wczglVuUqxzSYAVfqAPXOgCo-mo8lgUjAy4fdkNKjgYFeKseLlvBAYC652MeYDwwIacYDlt08u1kjWoWoV3J41zcAZFsqAAApeKQiJePCXS1rzdsKkbMDJR21gwHYx21Kd3VPTDSohzdOmRhlao7vJTVB6eJwfthNv4wHvi-gATG1Jyq1keRWugvoAIzJqcxC-td5QwL6-R14wRceQAzB5SqFKX8jl1KeTD8QZc5CPwTDzAJy8gM3t5AA1Mx3w6zncCkLAOBOJMXRHb-7gmTz-qJFvMA76Qe8r5ja-LAAtIwC8UB5GImQSc8rE_1zezXy-r1QdeB0LDn0vnvA-J1_zPRFqfSooDd5dBvjsLGD9v6-F_q_ACH95Dzx_hQIu_9b6ANgSA7eCCIFRzcI9OCMCThnzIVfRBACfioOfl3TE1CbwfxAImEAKQXBoHQW4JAYBwhzlVLwtAmBcCRgoAAWygEgUA5gqA0EQCAAAPCie4GR7AABUACartpiMFkQoyI8gNFmIiFAQYkxAgYmoBiCxqArHdXQC4-IGi5ErF8AkbSXhXIOIAKp6IAGL3wABzOPKBoigaRYCRD0QkmAGi6DxIoIkyxdBIzuJcRorIpB0BuHyegCAIRIiAGUjQAAPr0JgIAaVtACr0YAY7lACAHmkspFTLFwGIF4CAtgrBwC8MQBxOA6BSOwPgOAzi0k9L6QM_JdBCnFMWdYlxPC-FwAEagIRIixEwFVIcoAA&fontsize=14px&hidenavigation=1&theme=dark)

## DismantleArray

```javascript
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
```

[![Edit DismantleArray demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVIgD0AVAwDqoAEDbbgyfGCmioFj_AbQCMAGjaCATOIDM4wQBYAukvEBWJVwDkggIbyARvOKq2MU-nFglW1hx6AvxX7A2uxGzFsD76W2LuFcRh3AFcMGEhUGEs2dHc1K1DwyOi2AF87TkALm0B4Q34YQBiVMEBCm0BIc0BOZUBZRMAGJUBvuUBVeUAeBUy2AAEAB10AJ10AW1cWju6-r0GumAoQrtQ4NmBgNIz2BjpWMDDiCghyWIg4Xt1KWABBLp6ATwAKfS8ASjm7Ngou84f2Li82AF42ACkAZQA8gA5HCdLpwGCXAw4cbtKC6YhQuiXZjMADuAGpbnQAObiWwgAAkwmYIC0t1uAG5Hmk_LoKMQABZsS4we7AR5cMgzUiwHBQUi4y5aPiAdW1AGTegCY5UqAe-iKTT3ktHutUJttuxwZDLmgIBRTl1xAdGUyDeJdRQAEoTb5zNIcrlsMCkLqs2AUNgQW0ABnEeB9VM9bAAPGxjcyDQLqLiKEzAxBMZi_YmHe8Pmx3WwANYwV4_cOms6CCBKRWOrgQMCsg26c44PY1q45873ABkrbYjfrcEbOtQeoNgjwSkpb3T6a1UItg-HRoZEaLJfN_atE2p5fSZigkM9VcuAEIuw2zrXLs22x2jz2T1dp0Xh6POWnx5XWfuLdaKIJmyOx-P0x-Ezfrmmg_GEmApOgir_lwyrPum_o_P6AC0HjQeOdIwNuMC7tWN7dr255sO2bCHvhx4XH2A73iOqYwbhlz-qGd5dFGqAxkydH0UGPxeqhwjof-mHYX-9GTpcgimAWg5Lp6K6fuu8EfEsQlbjuT70a-B6AV-P5cZp8lAT-tosUOpYbrBG4qcprCOuMkzTHJeqfuhcFcPZUyat02o3AYilwZm3Suj8IjiL4UiyPIyimAkEgAOziAAHPIwjeio8ioCEUBQASpBaCoiqBWc_zPLaOj6EyoiCOiojnKoghGAAXuI-JsOcximOY4gxGAVUUKY36iO0VWkFVIQqCoWiKjycB8jAApCpc6B7AcRwwL2QXiEFJVdJSVIgKIIB7AAQmg3TnEgYC6NhaSHWgmC4EyFC9FASCgDyVA0IgIDBvuAAigIAMIACoAJoAAoAKJsE9L0AHysMGsNQBmhy4l8WjUFoCOoEjMC6OgONcMGvQTLofhMt5EwYwAqsDABiyGJdjjzBlsFCwHDwN6rAwZ0OznOI3QTL44TiMGKQ6DnDjwbLQAbnDgDKRoAAPozXNgDStoAq9GAMdygCAHnz8sy3AxBdBA7QenAXTEBjOB0Pd2D4HA2N88bpvmzLdAS1LHvIzjB1HXAp2oOdl3XZCixpEAA&fontsize=14px&hidenavigation=1&theme=dark)

## DynamicPlanning

```javascript
/**
 * 假设你是一个专业的劫匪，你计划去打劫一条街上的家舍，每家有一定数量的钱财，
 * 但相邻两家有一个彼此连接的安全系统，一旦相邻两家在同一晚被打劫，那么这个安全系统就会自动报警。
 *
 * 给你一个由非负整数组成的数组，用来代表每家的钱财，在不让安全系统自动报警的前提下，
 * 求你能打劫到的钱财的最大数量。
 *
 * 比如 [2, 0, 0, 4, 5]，能打劫到的最大钱财是7
 */
function getMax(nums) {
  if (nums.length === 0) {
    return 0
  }
  let maxMoney = nums[0]
  for (let i = 0; i < nums.length; i++) {
    nums[i] = Math.max(nums[i - 2] || 0, nums[i - 3] || 0) + nums[i]
    if (nums[i] > maxMoney) {
      maxMoney = nums[i]
    }
  }

  return maxMoney
}

function getMax1(arr) {
  let max = 0
  const length = arr.length
  for (let i = length - 1; i >= 0; i--) {
    const nextIndex = i + 2
    if (nextIndex > length - 1) continue
    if (nextIndex + 1 <= length - 1) {
      arr[i] =
        arr[i] + arr[nextIndex + 1] > arr[i] + arr[nextIndex] ? arr[i] + arr[nextIndex + 1] : arr[i] + arr[nextIndex]
    } else {
      arr[i] = arr[i] + arr[nextIndex]
    }
    if (arr[i] > max) {
      max = arr[i]
    }
  }
  return max
}

const arr1 = [2, 0, 0, 4, 5, 10, 12, 19]
console.log(getMax(arr1))
const arr2 = [2, 0, 0, 4, 5, 10, 12, 19]
console.log(getMax1(arr2))
```

[![Edit DynamicPlanning demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVIgD0AVAwDqoAEDbg4gqB90YAbygejNAAHKAqOUDIcoCw5QCFugaqVAVMqAYf76BC6MBISoG7lQMpGMoYENzQOoRgKDkpgNu1AsEELA89YnAkOZDAWdqAHU0DziVMCNKYCJYhaw5tAYvKAH26A3QmAJHK2ooA--oAm1oB78YClxlKAkdqAFoqA3z6A-34KQoBnpsFhgBTqgDAqQoBaZoDVEdoKgMUJgBJygJvxIikZgIw6gFjygFeBgBVKgKVGgGbRgEAMPizsnICbfnyigIyugHrpgPixgC6mjoAjfoAIRlLLCoAUroCm5oDHcoAWEdbuXvmAsHKAldFN6V19UoCySoALxoDQct4jbIBCNnyAvwHagAxKx1JAADmgHJNFyDEZDNiAFetAEGabAA2gAmAA0bAADKiMWwACyogCsAF0FD8ZP8QZ4BAB2IZ0VhgACuqGIFAg5DYAHMYBQALIAQywAApUPSALZwACUbGAPjYEDAbCForgOFgqHZFAAFmwALy69GS6XsNjGgBOXPpJvYaIA3DKAL6sGWwChsEX87nkGAATx1bGFYvhaIJttQMrApBNCudst9NpjAB4_UqVdR1RrrbKANSZg0y43-uDwiAE318zU4N2CgtFtgAWjYiJLAB8m-jUdWIHW2ABmZuttGSzNJgPFkN52XyxUjksAPld7s9XtzRuNxsrHtQ3t9HeD44dRv3MrNFAt7HXi5Dh9QDKZLLZnJ5_IAjALeSaTcvjdHK7GQ8ayKgcAuqqaa-m-Jopmqmpjka4aRgK0adtqbAgZqXZPhmnYzshcYQLWtafquAFAX62AUAAkhg2C-p2Q6In-q5ygqm5YBRVFYGwc6oVq9ZPpKAEssKMAwauE7MWRlGYBxQ5Pmw8bIdx6GEaJ4FFiWyGqcWbBDqpLFsVJ2lsE-s5sJpJY6e-8J6ZJ2AlgA_KZllaRZJpWRJ7GGcZbCII5rnOb5bmsTZWC7iubB2mwMBQHAMBSuOxpmWBTnmQF1nsaFolXqJTGvslnHzlgymrj-GnJQxxr7hVjpGsep4FZe1XES64GychSKYh1OL4qiT5Yk-KJGQAnKFxGkLAKqkOyAoPnygoteK4ohk1vmIr67VthtuJsHiPV9QNT7DUt5BwGNMATVNM3PrlJqIgt1ogMiIAQHAABCaBvl6SBgLy0UwHaj1oFJOAahQIpQEgoACdQFC0PGACEAAiADyADCAAqACaAAKACibAg2DM6sPGBNQChvJqtqADk1BU0TqAkzAvLoPTxrxiKXK8mwxAam-MUUNTACqaMAGK1gAHHTMrxiyFCwDOaMQHLMDxnQsvy8TdAakzLPEwARqQ6BevT8boBAABuM6aIAAPqjbAgDStoAq9G7IAgB6q2blvE3AxAmhAAAOLpwCaxDUzgdCA9g-BwHTqve77Acm3QBtG4npP0w9T2ve9JqfYg32_XahdAA&fontsize=14px&hidenavigation=1&theme=dark)

## Event

```javascript
class Event {
  events = {}
  constructor(initEvents = {}) {
    this.events = initEvents
  }

  on(event, fn) {
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.on(event[i], fn)
      }
    } else {
      this.events[event] = (this.events[event] || []).concat(fn)
    }
    return this
  }

  emit(event) {
    let cbs = this.events[event]
    const args = Array.from(arguments).slice(1)
    if (cbs) {
      cbs.forEach(function (cb) {
        cb.apply(this, args)
      })
    }

    return this
  }

  off(event, fn) {
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.off(event[i], fn)
      }
    } else {
      let cbs = this.events[event]
      if (!fn) {
        this.events[event] = null
        return this
      }

      if (cbs) {
        this.events[event] = cbs.filter(cb => cb !== fn)
      }
    }

    return this
  }

  once(event, fn) {
    const on = () => {
      this.off(event, on)
      fn.apply(this, arguments)
    }

    this.on(event, on)

    return this
  }
}

const event = new Event()

const fn = () => {
  console.log('I click')
}

event.on('click', fn)

event.once('touch', function () {
  console.log('I touch')
})

event.emit('click')

event.off('click', fn)
event.emit('click')
event.emit('touch')
event.emit('touch')

export default Event
```

[![Edit Event demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVIlQCGccABAKIBu1FzwAOqs2YxOlFgF4eAXwDc_foLKo4FAE4BXYhVIqAFGggUOXcVICUPeYOYUAFhDg5hx5hP2GRFOLIHNJcn-Q6TpQANMxgqOZ8PoIQYMw6AIIqKvQAnjj2yalpQR6mUZZW4doJsNwQLswADGFQVcEUOLCoAOa20syVADzMUJ0QANSDhTHF1nYOgY0A2hAAumERpt7jvkW-QlBwMBZjgrb2jh5wM43zVTqHDo2n58wAPg_MM_OmOIrE9BQ6y6tWflQGxUMAoahUAmu_0BlhgAFsDHkuKNiuVmMQAEYma7HYxnDzzf4KcjKZj0FStEzZdI4MAqUhwnTk1pqOHGd5wKAQYgwHQARhW_mKcQSmLgKPGYtp2lY9GINl-alQmgg5FFGIla0xOHoAAddVBctcwszxUSAYKxjCxiCwRCJvZoULmKQwGAkaFwpE9sL4kkUjSsgHco0Cj7xmBSjo0ZUJLU-g0PM1qO0bANmL1-l1hprxjjXe7ZgslpFzYJAcVJFsduHUaD0ViqjjbviuITnb6EgBCZa1vOTXGiVuUC4SVBqKD9DbFW3gyGTMvrIH7Lp-sW54rNk7DiijhsOSBQKi6TEuAB8DeYXbEEj-06XlY7zFn9qhlmtgnIPI9FBLucUpJqhIOjmGIF7RGs-Zuj-YTkJaawRDq-qGlckwmhSrLsuaMhPvmqAwS6pbAqCc4Ol477-NaAHcI0VSoDAADubAeCB3j8NRXqXKB4GWABpCwM0pCtDoADkACS6JcsQADWImWjhy6NDggQicQUmyX-3hKV-vIiVoGg2CJSxKiqaogeGfECVAQmiRJ-nynJ3iSJaSnwoiqnqY5_DadBHnchpXouUmbk_H5MlefRwUIqF9mGUFXCONFomxRF2C6to3CYGA9ATtwRiUNIIAhCA9gAEJoOSaRINl2wwJIxVoJguA2BQcJQEgoCKFQNCICA3RdgAIgA8gAwgAKgAmgACqwzAtW1Z78N0831AwbRiCJ1AiYtqDLTA9DoDtgjdGyFD0OiNjkjsFAbQAqmNABiAC0AAc22WN0FAGLAZ5jd9MDdAA9F9FA_UtgM2Pth1LRipDoGkO3dOgEDsGegDKRoAAPqWTAgDStoAq9GAMdygCAHkDyOo0tcDECoEC6twcAqMQG04IDjXYPgcDbUDlPU7TiOA7D8N8ytO1FSVcDlaglXVfQtWSHLQA&fontsize=14px&hidenavigation=1&theme=dark)

## Format

```javascript
//千分位格式化
const roundByFour = (num, digits) => {
  return parseFloat(num.toFixed(digits))
}

console.log(roundByFour(1000.12345678, 4))
```

[![Edit Format demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVIgD0dgwsqBgSoLLygPBaDw-oGjKAOqmVRwKAAgBOpAK4YAQgE8AYlLEiAvCIAUqSQFsANCPQQA5hApwAlGoB8I4PxHiYFSWNQiADgEMxcGAqhSLwotXRwKUgUILBh0DSNTcwsLAG5-AF801H5BOFJYHEDjDQlpdHklVw0ARgAGepxqgCYAZgAWAFYANgB2AA4DNuSUkD0QCDgZNB85JDAvKD90sbRMXAALCh0oJFBBKhpEEAAeAEIAEQB5AGEAFQBNAAUAURFN7et-Y_eoESgvVDGVQAcmowM-qG-MC86AhjmOOmcXhExHWPj8FBBAFVbgoALR9cEOETHChmWDWW7kmDHOhkigUr50dbQ2FfABGpHQcghxyMADdrIBlI0AAPq5fIwQDStoBV6MAx3KAQA9aQLeXBiGIIB5RHAxMQQTg6KtsPg4ODaar1ZreXROdyrT8IaNxpNpmJZoh5osYOlvUA&fontsize=14px&hidenavigation=1&theme=dark)

## Inherit

```javascript

```

[![Edit Inherit demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVIggA0IEcAQmgIYBOAnkmO1DgwAvozSZcACwoBbKElBlK1CrQA8AQgAiAeQDCAFQCaABQCiAAmlyAfAB1Ua61AtR2qAOYBeAOTUf9o6SMOzogRYWajIwFOwWxJJcQhS-AKoGAGIAtAAcAQ4RahQQFLA2BiWwagD0xaUwgTXBoY0ARqTo3I3oEABuNoDKRoAA-kpwpLCA0raAq9GAx3KAgB41Pf0OanDEnBAADhQWcJzEvjjV4tj4cAE1axvbjdXtnbfOgQxMrBw8fAJCwj9AA&fontsize=14px&hidenavigation=1&theme=dark)

## JsBridge

```javascript
;(function () {
  const callbacks = {}

  // 如果使用iframe传值
  function renderIframe(url) {
    try {
      let iframeElem = document.createElement('iframe')
      iframeElem.setAttribute('src', url)
      iframeElem.setAttribute('style', 'display:none;')
      iframeElem.setAttribute('height', '0px')
      iframeElem.setAttribute('width', '0px')
      iframeElem.setAttribute('frameborder', '0')
      document.body.appendChild(iframeElem)
      setTimeout(() => {
        document.body.removeChild(iframeElem)
        iframeElem = null
      }, 300)
    } catch (e) {}
  }

  window.JSBridge = {
    dispatch(name, data) {
      const event = document.createEvent('Events')
      event.initEvent(name, false, true)
      event.data = data
      document.dispatchEvent(event)
    },

    invoke(bridgeName, data, callback) {
      const callbackId = `${name}_${Math.floor(Math.random() * new Date().getTime())}`
      callbacks[callbackId] = callback
      window.postBridgeMessage({
        bridgeName,
        data,
        callbackId
      })
    },

    receiveMessage(msg) {
      const { data, callbackId } = msg
      if (callbacks[callbackId]) {
        callbacks[callbackId](data)
        delete callbacks.callbackId
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    window.JSBridge.dispatch('myJSBridgeReady')
  })
})()
```

[![Edit JsBridge demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVIgDcAOqkwBRgCuqxFE5ABCwCUfYEz58yqOBQkBDKFABGs4gGs4fALwiAvnT4B6A30BBmoBzzQP7ygClcIYAE6yAtjEAE8oB4FJmL4cuPfnepMOwBJeycYFnY7KGFRVHFxCjsATxEvBL5YGVsHZwBRWEctPnRSYnZnShxiANkqAphKihYAchzwlsFGeIy-dvzCnDgYCgBBCiSIRXYqVrg7YhaAGj4omO7evrCBxqGR8cnp2ZbpZNhlvhb0CDgAByhZZMRUchg6To3e_pgGxz2xiZ2KYzCItAAWMAgAHMwRQLi0AAy3LAfdIJb6_f4HIFHUEAdwg6AoYPhSJRXTR4gxg2GAMOINa2xgilIdiCpNRPQypXKTRwLPQyRwslut0CAGEwdB0CxqY0KVyErSACoQZykGYsIRaAB8aUV3LKFWoFH5pEFOACjlIADcYJLpbKmb8FZsqc7CsVUOwFJ8MjoVgBmBEI10JHRyCjEMECGCxHReBPMHoEjCkPE4ABSAGUAEJA9BQmDFOLcm63OrRliocIrdB1WSxSkScjSPgwO2UYo841VGowOo_TvNFp5YdwTmbDsmnBoCAUMcm6u17zyYYrJLsON-hLTqr1iiybsNnfiHt8653StgxeUFh7ihh8QBzyKtA20iqCKKAtFgByK4HrIKzEPISgqKoTYGi2UgyKBCjKGowToMUAAGAAkwA1s4OgAPqYQAsnUYI4GAUCkKyLBEcSlqyGmjjagAVHwqAwHifAACKDkIOBFhQqrOEIgg6Khp5yAhEFwAA2vB4FIegAC6xSyYhqhiampQZrcpDSPmhJFgR8BwLIRYsKWbo_vpMAAc4SzNmeDZ2dB4gqRByHNjoT58C-yYZAExCQnahlwMZpmOHAUJQZskhtuZmxAU5briXJqjudBEbaOFULdM2tgCK5ajSQVqWKVFbrFUVYGqchCksEBXncjAWTFhV1RVW56BiUm_qvs-nznjOsjoOgt4UAAMjcVCsXYrQcQA8gR4rkFN42kENMDoBc2qaHqcV8Bp6ZZnmv4wDgl4VlGYKtI4yQ5nphYwAASgOgqTt5CqeUIdAgEsIA3LmaCyCkSBgGuMABn9GDYDgsKOFASCgJIK20AAPAAhPN4rKgAmgACnkfCw1AOpMCjROZHRUKaC01AtCTqBky99PiCjziHhIYJA7S1MAKrKgAYgAtAAHHTXgozwFCwDqqpSzAKMGJL0ukwYEJDfTKMCskGvXDaOqAMpGgAA-jFpCwIA0raAKvRgDHcoAgB4K7rGtwDUEC3DI8zENTOAGGgmC4AQdMK07QKuxrBha6HRP0z9f1wADNbA4goNQMMOip0AA&fontsize=14px&hidenavigation=1&theme=dark)

## LuckyDraw

```javascript
/*
请实现抽奖函数rand，保证随机性
输入为表示对象数组，对象有属性n表示人名，w表示权重
随机返回一个中奖人名，中奖概率和w成正比
*/
const genPeoples = count => {
  let arr = []
  for (let i = 0; i < count; i++) {
    arr.push({ n: `p${i + 1}`, w: Math.floor(Math.random() * 5000000) })
  }

  return arr
}

const peoples = genPeoples(200)

// 方法1
const rand = function (p) {
  const ret = p.map(o => ({ ...o, score: o.w * Math.random() }))

  const max = Math.max(...ret.map(o => o.score))

  return ret.find(o => o.score === max).n
}

let startTime = +new Date()
console.log(rand(peoples))
console.log(+new Date() - startTime, 'rand1')

// 方法2
const rand2 = function (p) {
  const ret = p.reduce((arr, o) => {
    const multiple = Math.floor(o.w / 100)
    for (let i = 0; i < multiple; i++) {
      arr.push(o)
    }
    return arr
  }, [])

  const randomIdx = Math.floor(ret.length * Math.random())
  return ret[randomIdx]
}

let startTime1 = +new Date()
console.log(rand2(peoples).n)
console.log(+new Date() - startTime1, 'rand2')
```

[![Edit LuckyDraw demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVIgD0AVADqqDv0YHnagDc6C9RoGqagv4qAHUwBOAQwyAYf8C78oEHowPFpgLnNA5AYtAyfGBTRUBccoAsIwFyegT-1AhjGDAI34SjgSHNAejpLUewF1ygWBUJAdz2Bhc0CziS0WAV-MB7aoAAcoBUcoC0crxOEuGAQZaA4c6AMSougAhGgMbWgCvWLAx0LGSocBQABADm1AAKMKQADrBwBQC8BWQArpT1AHwFwCwFBbCFosLC9QUA2gC6ANws3QVgpEMAFH0FEMMADBMrBQA8jaQtFJsQANTHAJSdMz0DwjiVTXAAFgtdqD3vBaiIBQAGlQAkwFWxwKAEYAL4_AA0V3eLm-AFlRBRHjgwFBSPMFkiUTgxBhSABbBYXBgFACsayp1LOsPBZymbwK4OmTOEMAoTWEbxujPBjJy5HyBUqFWq8GGJVQ5SqNQWACYqQyCnQ6AVAJ2mgFWbUGs3LC_HoYZgFrECgQcgFBaVC6vHp6wrswoNSo4QmiSoLUjtS3AAo4f2kGFMnpwMjs76kHAuApknGog1EkkzekMmb2gpurDDOOu0RYBb-vEc3Mer11DqR0PzGBnVNsjlct6OtFodCe72VsMwep1BqZs44VB8gWoZb5AYUAAqEEJ3Yax1QMGjABFkTASYy9aRYDgMUUFgarWKarXN0LtzBd6R9wulwVV1QSQUALQFcfCKczmBQgoAcgNoK_sqqoapq8q6kKDriOg8pGiaZoWlaNpppBBSOsMLrsugTTEOuCw3D-pAXOWlzBnseSFISTRQGa4rZsiqLopiwielGKpgkqI4fHMizLKsDQbFsuxUTREDikcpzIWR1yDHcDzPERjIfCyqCwo6jYFLyyY_uMdZ2qhCaEgAkugWYNDmTFYs2sCoEUKIxgUOaGSSeloQ23JuRQIyGSZWCTCw_KsmOFATtOs6gsMt4rmuG6CnkF5XvuBrykesrwAOqB1luO57gsUX3jFFyvu-n7hT-_7QfKQETCAUIgBAcAAEJoAMACeSBgKIUBwDA4J1a22A4I8FCElASCgLkVA0IgIDbAAhMuADyADCk4AJqlAAogUw2jW0LDbLtUC9OIRR1L-1C_vtqCHTAojoNdPTbLOIWNI8Aw9RQ50AKqTgAYs-AAcV0zNsZoULAbTThDMDbHQ4OQwddCPHdD0HQARqQ6Ctdd2zoBAABubSAMpGgAA-tlMCANK2gCr0YAx3KAIAecP40TB2hsIYmFHAwjEOdOB0ANuAEFdcNsxzuN0Jj2Pi0d121fVTUtcI7WIJ13W9eC4JAA&fontsize=14px&hidenavigation=1&theme=dark)

## Middleware

```javascript
const ctx = {}

const next = async () => {}

const middleware = [
  async function A(ctx, next) {
    console.log(1)
    await next()
    console.log(6)
  },
  async function B(ctx, next) {
    console.log(2)
    await next()
    console.log(5)
  },
  async function C(ctx, next) {
    console.log(3)
    await next()
    console.log(4)
  }
]

// 推倒过程
// middleware.reduceRight((exec, fn, i) => {
//   if (i === 0) return fn(ctx, exec)
//   return () => fn(ctx, exec)
// }, next)

const compose = middleware => next => middleware.reduceRight((exec, fn) => ctx => fn(ctx, exec), next)

compose(middleware)(next)(ctx)
```

[![Edit Middleware demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVInlwUAExFWjAvI8AL4DcAOqkFlUDRqmxNOAQzgBPVMUYAKAJQcAfFz6Dh9JgFsI6dLADu0gE4wOjANqyFSsAFdFFCOUYBBZSywANOKS6sCCjMz0pLA4UKQA5soAjKoCqBHSFhBMElgUamkRInDRMLEJygBsqYLcQY6KjK7unukAQn6sQbkUoeGRoqXliQBMNemMmdLZwXkF_cVDcYkArON1k_KNzSytjADCnYGzvVwLUTHLygDM4xlZOZLzE4uXFQAs6wC6vIwA9H9GIAK40ASAqAcfjANBeggBjCMJnMVjK1nQLmIMAAShB4gALfLKbAwYhBMCoIIQdTsLRhVAwiIQMAqCAcdicAAM6msFBclnSJKOQQJxFU0MBEU53PSak0TVQ_MYguFNMBGx6ir0oiYZAMAAdSHAbJw4aYYBZrNKetKjQjrDhkaiMVjccp8VhCcTUBStP5pXz_ALXULuiE0nodXqYMorSbEaplKqjqkQAEQBA4G00FY5EgwNIoPq6imMNgcLiDFAkKARFQaIgQAAeACEABEAPL7AAqAE0AAoAUUYpagGkEdcHjCg0lQ8XYAHJqDPh6hRzBpOhFxE6wYYBRpMxsVZ9RRZwBVdsAMQAtAAOBf9OseCiwDTt7KwOt_B9Pkd_bErtcjgAjUh0DkRc63QCAADcNEAZSNAAB9V4YEAaVtAFXowBjuUAQA93wg6CRzgYhLAgbUmDgSxiFnHA_jQTBcAIBd33wwjiLAv4gJAljB0XJMUzTDNLCzRAczzGBuFEoA&fontsize=14px&hidenavigation=1&theme=dark)

## New

```javascript

```

[![Edit New demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVIggA0IEcAQmgIYBOAnkmO1DgwAvozSZcACwoBbKElBlK1CrQA8AQgAiAeQDCAFQCaABQCiAAmlyAfAB1Ua61AtR2qAOYBeAOTUf9o6SMOzogRYWajIwFOwWxJJcQhS-AKoGAGIAtAAcAQ4RahQQFLA2BiWwagD0xaUwgTXBoY0ARqTo3I3oEABuNoDKRoAA-kpwpLCA0raAq9GAx3KAgB41Pf0OanDEnBAADhQWcJzEvjjV4tj4cAE1axvbjdXtnbfOgQxMrBw8fAJCwj9AA&fontsize=14px&hidenavigation=1&theme=dark)

## Num2ChineseNum

```javascript
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
```

[![Edit Num2ChineseNum demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVLgCuqxFE5ABKnQLYBMAwgBZp4MAHJcAFB04AaVhDgBBTqQYVWAXlZgAhlDgwAlK2AAdVK1ZlUcNTYBOYzhvZccFUgGUKdtAHNxBgDcZhawamhUvjB2AAradhTB5qxhrJjEEJy6cQlJoTBq_NpwACIwGVlQzvaOOGiYWADyYOIA5DitRgB8rAC0AIxJIXJgrOJFpeWZukamyRYRMFGx8WqaNa5wAA5QEBRtHQYA2gAMALp5FmlTlTlrrBucONu7--2dR_0XwwC-rDB6GDGYYLShLaJ3areRyXH5mYZWGwpai-Cj8ZyLZZ3HCwVCo_iXRFqYiCVDCRwYxTKVSsAD8wPmrBOiFYrUAb2mtaQg1j9FmtQCfGpzudw-YAGWKFjIAzHzAIPKEqurAALHzAGEB8quAFY-YBYeXVFgAbHzAGJpetYAHY-YAl81NAA4-YAZY1NAE4-YA051av1YLLmCuZrI5XMZvNZgAA5U0i1mAGLlTdLWYBIOVNytZgG21U1a1mAFLlTYbWYBbRVNFtZgGA5W18wDWis6-YBdOQ9yR-hPISJJQn0AFVUHtKUoVJQ6QzfSz5N2afTWoBhRVaXtZpuDrUAf0bhvmAB3kY3zAPtyib5gHA5NN8wCCyjvAwqc60l4fuYXWmvz4y7azAP1yldZc8fR6u_T9p9f3P6s7X36DCNWkAMUUZ1jedQLfCx-iTU9IJ_dMr3goMT0AGrlawsP5vW5P0h2pXtRwnKdWhnPkFyg1ggJXCjwI3CjYJvBVEIPbNl0Yq5L2vUsHyfecAIVD9l3498_2E6CgOQgTwLnST31gpdZOgxC10Unk0Iw1h6wRRs1HSaYoAEFsYHbTtNB9K5P0AJcjSNZQAwJQ0rTklSOwCjoOxUAANV0OggU0EjLlSPTKgAJVc9yvKgHznH8-FkjAUg7DGVIIGcQY5FYAAeTRcXxQI5AAany2ZuVSbAtnIah7hytE-jkS4LCJNIIAAN3kBLnAAWW0NEcHKgB3cQP1kMqKsoIJuUaly4DoKB7i6nqwCgUgEskLhWAAeia1q4AS8bGUmmAsnqaJnCkVgAFItrauwhkZCBRnEKaZrWdRNBOYrGQWB6AEIXIoNzPO8mAcGodA4AAdT2fg2g5AwPoVBU_oBiKos0JHwqB1h8ssUlyS4I4ntm75Ps07k_gBfR-wR-6xhco6MBOnp5v4XrSAGoaeW4OGqYR1h0cByLfL5sKBai7HmzJfRHAJ-BnrOLGcaMkyKCOEayUoM4cBcnZtGIGBxHW4D1tkEi9t58nARGWnDu0Y7EqZ7qWf6waTlkG1ufM3n-ZRoXvcx8Xcal_HCYoeWA6VjsVbVyrNe1qBdf19b72N6czYRi3KZpx6bbt1gHZ652OcVD3uURkWfecP3BYViW8c4GXpqJmvA-MyPVawcr1dDrWYB1vWDa3FPTfqq4M6BT2Ear1Hhf-jHq_DyXRGD2Wm4X4RlfbzuY5HzCydihUzrRnOGZu3596t8ZijKCoZh5rR2vEZLnBOPKUoy64b6gbFqoJAqirviwQVdChVnqLIE-VNC1yDvXIBX9VhHAgGcMOH99KGUXhvRBI84R1nPlPX25cgY9z7onNkAASIeE49rDCznhHsFB4ZXCzhMa--kGFl1ATPZG_sUEhQIYLLB_xLYTwsPzThc8xaskAC6mrQsGegpuPbkTCr43FvsIsR5g8EK1aIATodJzY1gSArh_CyaCMpmo0RmjsatGkbInBqBsFmERKQWAOJSD-CkHwFujhxAajhkkJxLilruK4J4oy3iNQnEiX4xxjZnHAyCatHgaC64-Mif0aJjBYmBLcYk0Ji9wknA_BkgJ8SckeOSdAnxH53p7RKa44JSSvESH6NwD8XNalZNKQ0vJKSNQtLacUzp9TckVKXpwcQko-mtJOO0_xQyEnlKaeM_Ukz-kzMGdYOJwzFlhIkK0p0NozROhWVMgZQQQDSBAPIAAQmgeIABPJAOhAQ_EucdXA_AKCcCgEgUAVgqA0EQCADK30SiNF4AAFQAJoxAAKKsE-d8roZgMqIqqPHPE6hWjUFaMi1AqKYDaHQHiiwGVOAFG0DjeI-gKBYtbBCgAYr0G0uLhgZWYBQWAXQIV7FgBldaHKuUovWvwQlxKUUACNSDoHuXijK6AWpdEAMpGgAAfRKYAaVtACr0YAY7lACAHvyhVzU5VwGID4LYtg7DECxTgda7z8BwFxfyk1ZqKByvWlKmVbq0V4ouVcuAtzUAPKebofQPww1AA&fontsize=14px&hidenavigation=1&theme=dark)

## Promise

### promise

```javascript
class MyPromise {
  status = 'pending'
  result = undefined

  constructor(fn) {
    let callbacks = []
    const resolve = resolveVal => {
      try {
        this.status = 'fulfilled'
        this.result = resolveVal
        if (callbacks.length > 0) {
          if (this.status !== 'pending') {
            const { resolveFn } = callbacks.splice(0, 1)[0]
            this.status = 'pending'
            resolveVal = resolveFn(resolveVal)
            queueMicrotask(() => {
              this.status = 'fulfilled'
              this.result = resolveVal
              if (resolveVal instanceof MyPromise) {
                if (resolveVal.status === 'fulfilled') {
                  resolveVal.then(function (data) {
                    resolve(data)
                  })
                } else {
                  resolveVal.then(
                    data => {},
                    err => {
                      reject(err)
                    }
                  )
                }
              } else {
                resolve(resolveVal)
              }
            })
          }
        }
      } catch (err) {
        reject(err)
      }
    }

    const reject = rejectVal => {
      this.status = 'rejected'
      this.result = rejectVal
      if (callbacks.length > 0) {
        if (this.status !== 'pending') {
          const { rejectFn } = callbacks.splice(0, 1)[0]
          this.status = 'pending'
          rejectVal = rejectFn(rejectVal)
          queueMicrotask(() => {
            this.status = 'rejected'
            this.result = rejectVal
            if (rejectVal instanceof MyPromise) {
              if (rejectVal.status === 'rejected') {
                rejectVal.then(
                  data => {},
                  err => {
                    reject(err)
                  }
                )
              } else {
                rejectVal.then(
                  data => {
                    resolve(data)
                  },
                  err => {}
                )
              }
            } else {
              reject(rejectVal)
            }
          })
        }
      }
    }

    try {
      fn(resolve, reject)
    } catch (err) {
      reject(err)
    }

    this.then = (resolveFn, rejectFn) => {
      callbacks.push({ resolveFn, rejectFn })

      if (this.status !== 'pending') {
        queueMicrotask(() => {
          if (this.status === 'fulfilled') {
            resolve(this.result)
          } else {
            reject(this.result)
          }
        })
      }

      return this
    }

    this.catch = errFn => this.then(undefined, errFn)

    this.finally = finallyFn => {
      this.then(finallyFn, finallyFn)
    }
  }
}

MyPromise.resolve = function (val) {
  return new MyPromise(resolve => {
    resolve(val)
  })
}

MyPromise.reject = function (val) {
  return new MyPromise((resolve, reject) => {
    reject(val)
  })
}

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 500)
})
  .then(
    data => {
      console.log(data, 'resolve')
      return new MyPromise((resolve, reject) => {
        reject(2)
      })
    },
    err => {
      console.log(err, 'reject')
      return 3
    }
  )
  .then(
    data => {
      console.log(data, 'resolve')
    },
    err => {
      console.log(err, 'reject')
    }
  )
  .catch(() => {
    console.log('err')
  })
  .finally(() => {
    console.log('finally')
  })
```

[![Edit promise demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVIlQCGccABALICeACgE6kC2EODGbAAOqmbM4FehQCuLALzMA5AAdq6NAHMVAbnGTu8OVArNlcjDEioY6A6kPMyqadznEKpbgAowqACUIs6SsObE9FBQAEb0xADWSswA2gC6jqEu5NLMxnCkUABuwsr5hSUAalEWAHwhEpJNFNzsDU0dzBQAFoI40rIKFqpgppDR9vpZHT19-abmZfAVMNVQmY2dzBBgzL6R0XGJcDiwqNo9zPUADMFim1vbu76zJwPyLACEisrqmjoqO7TR6uXL3R6PcrFGAAMScDwhAF9hgdYvEkv01FAIMQYL5rgAaZgARkCKWuGWBW1e_RkH2GfwwAMcEI6UKqNSWBWhcN87NWUUCLNZkgAjnIYBLWDjeDI4AlfL5gop6uCRc1em86UNfqMoONYOgpgjWTT5mZhvy1ht1U0dnsrTU0ANULjSLsODx-IIYECTSL7XzltC1rTBkofiMxtBDYD2rbOo6oDgetR_FYvBByHt0LJ6H6E5DgyVfLmZEKqerERX_azkTAoEJ44WjMWBcnU6hS3m6iJEUSYNxuL21S2msY8DAvL5B9wa2PJNXhYXEZWtvXG8JRwn-UHuRyoPOE6vax0l2vmCekcDkZEKMRuntZwWi5Pp8_l00r1-bU1QeYJynRY8hgN8KDWEdgRpd4dVUQCvEmT9JDNEwLSWMDrXEYFA1RI4MTOC5HxuF8tkDaDtS-SNGS0c4423LZ_2bVl4IoOEL2RZRcPRN4sRxPFCRJMkKSQzpyPDBkNCZWiRLZUCgIg9CgN5Fi1iPCFxUlGBpWIWVGAVJVINPDU-hg5IVBYxCL2QzUcHNYCVKiX8A2eByoG2NwZFdGB3TYLheAEIQSPVQNXLDekfl-CyjSC21Qs7bsZBHftmFnQyFxAsCZyHNTjxykUNybej1Ti7o0zLeg0oXXdyryqsByHJLauvIzFxSzcmJFFigwwwUZM6b8kSay8byyREnK6VoOuYAI9xWIkWJy29ZAfJ9sqmrqP1GrCHhpTthlmnlUHmuSvDhZVVWBLjjhwNQFG6XwitbfdYSOysWLYk1z3hUjnjE-lvl-SSaN0GKmg0qUZVIOV9POqaOjImzTIsKi9QNSZQa2XcULgBYhtahtCqsjKgJeGy7Lx4bay-9dtsxmB5G4CRXk_MbaeMk47xW5RZzhXtdtKrsrEwWx7Hq7gzvGmlbCiKA2mUaXonYXmVSm_m0wV2W4SJDWlaCFnhRPcRDdQT1_J9Wy22GUZXQoLMJF8IpBXjYwGYkOwAHdfK9AK8X5SqnpWB3eucL7WfhU3vSEC2wKtjNbezIPD2d-m5EZ5gPa9s2hEVfljrA2Hty6x3DwNmsw_EDOI59nO2zzoCC-cIQKAAFQgPhvLkChFQbh5d1JA2iQAVmuW5HGrFMBYSiqVbVUFChgU5SG0KeiXMttAWFF3U7dmBParn0a-euuvB72TMoAJiPUOxcqufYEX5fZ1XliN-cLe04AZjHwIJ7KnsZ-cHfBeUAl4rzguvMuN8AGNCAQ_LK3Bn4nQoK_VA49Ob3QMtAyQsCQHLxULOFB48dbd1vjkeecCVA60IUKEABIQCCAAEJoHoK0JAYAohCH7PQ6wuBugUD4FAJAoBXBUBoIgEAAAeT4AARAA8gAYWbgATU4AAUWYHwgRtRxASM0W5Bg5xFD4NQCobRqBdEwHoOgMxkgJHt0Sg-FhTcjEAFVm4wgALQAA5THOAkbbCgsBait0CTACRAB6AJQSdHhNKlYsxEiYikHQOwBJWgii1EAMpGgAAfSAYAaVtACr0YAY7lACAHhE9JCS4A6QgGocwcBuDECMTgcJaBMC4AIKYiJVTuA1IoAk8JSSUn9L0WY2h9C4BMNQCw9gbCOEwERAsoAA&fontsize=14px&hidenavigation=1&theme=dark)

### promiseAll

```javascript
function promiseAll(arr) {
  let retVal = []
  if (arr && !arr.length) {
    console.warn('参数有问题')
  } else {
    return new Promise(resolve => {
      arr.forEach(promise => {
        if (!(promise instanceof Promise)) {
          promise = Promise.resolve(promise)
        }

        promise.then(data => {
          retVal.push(data)
          if (retVal.length === arr.length) {
            resolve(retVal)
          }
        })
      })
    })
  }
}

const promise1 = () => Promise.resolve(1)
const promise2 = () => Promise.resolve(2)
const promise3 = () => Promise.resolve(3)
const promise4 = () => Promise.resolve(4)
const promise5 = () => Promise.resolve(5)

Promise.all([promise1(), promise2(), promise3(), promise4(), promise5()]).then(data => {
  console.log(data)
})

promiseAll([promise1(), promise2(), promise3(), promise4(), promise5()]).then(data => {
  console.log(data)
})
```

[![Edit promiseAll demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVLgCuqxFE5ABAA4BOpAthHDACCUKAAoAhp04BKVsAA6qVq1gVWnGBQBq4qKwC8rANoBdANyLFyiGFYSprAGSPWAQkmccsVAHMKAC1kFJWVWMlQ4UlgcAHdJVFEAckAh5UAHU0BIc0A71MAMjMTpCxCAX1YYKAE5K1CNCjpOJVQYGNYABW4-AVENSKgANxgDAD4KkNDWDxwwUk4AUXFif1EuXn5-_SHg0dGbO1dFtpXWNDgKcUYYUltW5YFpIMrN0KX21Zb9gRwuqL6965h8-82hUsI02TxWOAC1FE6HEJ0Gwweo2qOigOHYdDgCxhJ3-qABD22nU0KK81D8_gM-kM4285LuIMR6ngXxgRO0ulxjOUQIZoUKnMBAu5Ap5PMU4WOHDeMAAjAY7LI1q9fh9mb1WTLceLyJKwQIAEzy0SKoZXZ6q7rffVaxg6tR6mAAZiNJuV5s-6tEjptEvt0oALC74WbwR7vv6fXapb8AKxBpUh95h1kxm2JmA4XRiIwOmXGgA00ee-oLRZWjtLDv9lelMeNJmkEP8UOx4nhGzCOqiGagpB80Nh4lx_IKDuE2dzNd-JekhYdFdnZYE1cXDrr0gbTZbg_blQl3a8fYHOIKI5A-ZA_AAQmhJABPJBgXQCQoXtCYXD-Cg8KBIUDhKgaEQEAAB5XAAEQAeQAYQAFQATWaaZWC_H8BkUEDUL0KBTh8fREmoRJ0NQTCYHEdBiOUECeE0Nt5kkAQKHwgBVWCADEAFoAA4iMqEDmAoWABlgiBBJgECAHoBKEjCJObcjiJAgAjUh0DvRT0AgHoBkAZSNAAB9fdYEAaVtAFXowBjuUAQA9JM07SMLgYhOAgdg1DgThiHwnAJPfbB8DgIjJPsxznMUiSVLUkKsOI89LzgG9UHvR9nxgQoUqAA&fontsize=14px&hidenavigation=1&theme=dark)

### promiseRace

```javascript
function promiseRace(arr) {
  if (arr && !arr.length) {
    console.warn('参数有问题')
  } else {
    return new Promise(resolve => {
      arr.forEach(promise => {
        if (!(promise instanceof Promise)) {
          promise = Promise.resolve(promise)
        }

        promise.then(data => {
          resolve(data)
        })
      })
    })
  }
}

const promise1 = () =>
  new Promise(resolve => {
    setTimeout(resolve.bind(this, 1), 1000)
  })
const promise2 = () =>
  new Promise(resolve => {
    setTimeout(resolve.bind(this, 2), 3000)
  })
const promise3 = () =>
  new Promise(resolve => {
    setTimeout(resolve.bind(this, 3), 2000)
  })
const promise4 = () =>
  new Promise(resolve => {
    setTimeout(resolve.bind(this, 4), 5000)
  })
const promise5 = () =>
  new Promise(resolve => {
    setTimeout(resolve.bind(this, 5), 6000)
  })

Promise.race([promise1(), promise2(), promise3(), promise4(), promise5()]).then(data => {
  console.log(data)
})

promiseRace([promise1(), promise2(), promise3(), promise4(), promise5()]).then(data => {
  console.log(data)
})
```

[![Edit promiseRace demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVLgCuqxFE5ABAA4BOpAthHDABKAQ2IwAFMM6cAlK2AAdVK1YQwrSdNYAybawCEUzjlioA5hQAWcxcpWsyqOKVg4A7lNTiA5ICHlQA6mgJDmgHepgBkZ3jIA3EoqAL6sMFAC8jH2nDAUdJzKqDBurAAK3HwC4unOUABuMKwAvAB8KXb2rEY4YKScAKKiluJcvPw1DU0tLWoa-v3FQ6pOFMKMMKTqRYMCMjapY_YDJcOFMwI45S7V0-swUdtjsUo3LXtDOFbU4ujCC3WNtjstp1UJB8FtdmrdQTtYhD7FDonY7qgEUpHHAKBwjjAAIx1DRyEa5fJrfZleBnYY_VICCgAFQgPGWdAoJIq1RwACM0OhxFZ-AAaViYmT8zEABjFoNh90Y5FR6MuACYceI8Y0CYdLsyyd9RqwqbT6aRGZrAezOdzLHzWPKhawAMxikUS0HImVop4CW1KlWsNVEobG6ra366jL6hlMgGsjkYc2W202-UOp1wl3zOX7AAsXu1voxAfJOr1dPD-dNMZ5cH5GZtAFYk3DJahU7L3TAa9n8Xl1cTIwXg0WDUbe2WuRX-TWbQA2etKRtKP3HTiiCQAbVbmOV_Nb8s36aGtt3rYzh4xNeVAF0ZC9LG9gcIg6kUS4YCZSGZ3p9hMmlK2RGJxGuGIbja24npcB4gRix6QZcZ4yJe163p-D52E-rhQG-H4gg2UQgLyID8AAQmgUgAJ5IGAwhJDAsT4Zy2A4JYFA8FASCgI4VA0IgIAADz6AAIgA8gAwtSACaBRdKwTEsfUSg8TJUCsFAixmLU3jUN4cmoApMDCOg2kqDx9JfMQlhSFS6kAKrUgAYgAtAAHFpqQ8cwFCwPUtIeTAPEAPTuZ58l-Te-naTxbKkOgpHhegECVPUgDKRoAAPpoTAgDStoAq9GAMdygCAHv5cUJfJcDEJwEDsGicCcMQ6k4H59G4AQWn-SVZUVeFfmRdFHWKdpeEEXAxGoGRFFUQIsQTUAA&fontsize=14px&hidenavigation=1&theme=dark)

## ReadFiles

```javascript
const path = require('path')
const glob = require('glob')
const fs = require('fs')

const readCss = function (pattern) {
  return new Promise(resolve => {
    glob(pattern, function (err, files) {
      const str = files.reduce((cssStr, file) => {
        return cssStr.concat(fs.readFileSync(path.resolve(file), 'utf8'))
      }, '')
      resolve(str)
    })
  })
}

readCss('less/**/*.{css,less,scss,sass}').then(cssStr => {
  console.log(cssStr)
})
```

[![Edit ReadFiles demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVInlwUAEADgIYUAWjAvIwE4wAjgFcIAgBQByNp0kBKANwAdVCrKoGjAOZRSAIx78hoiZJ375y1anWawcQwJFiYU-5ZVr6TAa3QBhOAdeMGEbCghyRnEZKj5UOUZgFUYjCmF4xlQYAHdGAAU-UgBbCDhXAThSKAA3GB4APiSU1O1dPRj2ONQAGkZQ8MjUaJg-Pj7IWDhE5OHW1NsmBj5DSfgcAXRhYldxYiCAZQpx_ugYRO4m2fn5gXTM_bgjvhx1YnZxew2YPwAxM4OAE8bJ1ON8qrVXGs5H1JMIKGAABzyRQteYAX1hHjmt3g1Tq4mWqJxjHRxNSZKs6KsKl8ASCUimcAA9AAqVlsnDAR49Jk9OA8uCsILo-Q4TjUPaHY6NZpzWzVGA4XRaKVPY7EykgHogMoAITQrD4gKQYFYUHKmN1GGwOA4FGKUCQoHUVBoiBAAB4AIQAEQA8v4ACoATXyAFFGPbHQ0VJ7o1BGFBWKgtNxJNRJLHUPGfuhs6lPcUYBRWIxiBwjeUKOmAKpB34AWmRBcYnoiFFgDSDEE7ME9zI7XbjzI4eeznr0pHQgIn6AgNQagGUjQAA-grYIBpW0Aq9GAY7lAIAeA_ni7jAr4EGYSz4xHTOGZaEwuAIWYHp_PFAnzKnM4_Cez2t1cAGqgRomogZoWjA6JQUAA&fontsize=14px&hidenavigation=1&theme=dark)

## Redux

### redux

```javascript
const createStore = (config = {}) => {
  let state = config.initialState || {}
  const reducers = config.reducers
  const listens = []

  return {
    dispatch(name, data) {
      if (reducers[name]) {
        state = reducers[name](state, data)
        listens.forEach(fn => {
          fn(state)
        })
      }
    },
    getState() {
      return state
    },
    subscribe(fn) {
      listens.push(fn)
    }
  }
}

const store = createStore({
  initialState: {
    a: 1
  },
  reducers: {
    change(state, data) {
      return { ...state, a: data }
    }
  }
})

store.subscribe(() => console.log(store.getState()))
store.dispatch('change', 2)
```

[![Edit redux demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVInlwUAExATjAIZUDKFpbjAXkYAKMqkgBzQY2ABfAJSCAfDIA6qRo1hMGnGNLGScaCBQjsoPPYwA-NmbIDc6zWIaM26AK7EYLOAbkRp4-fnDOGsz0TFAQDNQBQgDaALoRmmwUXiwawC6ajOhxAA6cxAAWwqjsALYwADSFnOyKeZEFjBBgIiG-_knVdSmt-R2aulTSvWEDtTApwhMNTRQt6WOasfGocDhgfACi7BXCYBoCKm0bHWeLq1Ty6xsKTwWyo4yy9eofEjAUViowhG7QKmWyGiWry-P1BcC8ACM4KwIAiYKdUCCNlsqDscMUvHBKmdHh93qh8k51FSKag3DpePwhKwONxGeirp1UKZzJZ7jBEGpQexBQBGSnfSLTfyCzmucrsVB_O56RroZpYsbgnIyRg4fVLSXXRgilbsD6aGkdcmU6mknbsnDwpEotHCYHKKI7UiwHBQUgSO58GA4P4A_nA-T2hjBnBFOClCgnADkFUVf2TjQATI8QPUQHEAEJodgsACeSDAFjgMC-BYw2Bw5QoNSgSFAYlxFFoAB4AIQAEQA8gBhAAqAE0AAoHRjN1tKdQ9-dQLTpgTJ6jJxeoZccdA7zQ9uqrZgK_z_DcAVTHADEALQADm3-R7ZgosCUY9MsB7AHp30_Jc_3Kfcdx7BFSHQMtwKKAA3JRAGUjQAAfTcH0YEAaVtAFXowBjuUAQA9_3g8DkRYCBih0FhiA3HA_zQTBcAIbd_xIsiKHAv9IOg9iVx3PMCzgYtqnLStq1rWRZCAA&fontsize=14px&hidenavigation=1&theme=dark)

### middleware

```javascript

```

[![Edit middleware demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVIggA0IEcAQmgIYBOAnkmO1DgwAvozSZcACwoBbKElBlK1CrQA8AQgAiAeQDCAFQCaABQCiAAmlyAfAB1Ua61AtR2qAOYBeAOTUf9o6SMOzogRYWajIwFOwWxJJcQhS-AKoGAGIAtAAcAQ4RahQQFLA2BiWwagD0xaUwgTXBoY0ARqTo3I3oEABuNoDKRoAA-kpwpLCA0raAq9GAx3KAgB41Pf0OanDEnBAADhQWcJzEvjjV4tj4cAE1axvbjdXtnbfOgQxMrBw8fAJCwj9AA&fontsize=14px&hidenavigation=1&theme=dark)

## Regex

```javascript

```

[![Edit Regex demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVIggA0IEcAQmgIYBOAnkmO1DgwAvozSZcACwoBbKElBlK1CrQA8AQgAiAeQDCAFQCaABQCiAAmlyAfAB1Ua61AtR2qAOYBeAOTUf9o6SMOzogRYWajIwFOwWxJJcQhS-AKoGAGIAtAAcAQ4RahQQFLA2BiWwagD0xaUwgTXBoY0ARqTo3I3oEABuNoDKRoAA-kpwpLCA0raAq9GAx3KAgB41Pf0OanDEnBAADhQWcJzEvjjV4tj4cAE1axvbjdXtnbfOgQxMrBw8fAJCwj9AA&fontsize=14px&hidenavigation=1&theme=dark)

## Request4Node

```javascript
const https = require('https')

const hostname = ''

const request = (options, postData, headers = {}) =>
  new Promise(resolve => {
    if (options.method === 'get') {
      options.path = options.path + '?' + new URLSearchParams(postData).toString()
      postData = null
    } else {
      postData = JSON.stringify(postData)
      headers['Content-Type'] = 'application/json'
      headers['Content-Length'] = Buffer.byteLength(postData)
    }

    const req = https.request(
      {
        hostname,
        port: 443,
        ...options,
        headers: {
          ...headers
        }
      },
      res => {
        let result = ''

        res.setEncoding('utf8')

        res.on('data', chunk => {
          result += chunk
        })

        res.on('error', error => {
          console.error('res=', error)
        })

        res.on('end', () => {
          resolve(result)
        })
      }
    )

    req.on('error', error => {
      console.error('req=', error)
    })

    postData && req.write(postData)
    req.end()
  })

request({ method: 'get', path: '' }).then(data => {})
```

[![Edit Request4Node demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVInlwUAEAFhRQA5yMC8jATjACOAVwgCAFAHJWHOJICUAbgA6qVWVQMWpBqgCGAWxg9GkySrWoNWgSPhNe40uwoR6AGkbsdFACJ6KPU9mGD1MPi5eYABfeR4APkZUGAB3RgAFPlIDCDgYcQE4UigAN2NuROBVRkYIMEYnFzdNHCMKZlJ0Hm5eSQBzGAoFRirUGprnV3ocdgDmE0nmuBm5xgBqUwB-SXWk1MYAVQAlABkAZVC-YmZ0vT5DOHFvBn9A-RwKUjOKPjQ-8SU1XGzz8AT0JlQwigUAsNWijBgUDyIyBNRBr3BvAAUmcAPIAORwDF-qD6dQAnk8fBjAWNxiEwjAIgBtSQAYXIVEoAFoACrk9gwSQAXRMkj07HYUAgxACzQA9ARyOZUSxQuE4KyOZRqBRuSdqH12iKTAAhYRgMBMnAAI3JVANpPaVJeYNpcNUQOsTFsJhknBwtmE9nEo3G2l0hhg7lV3j4FEQjAALEmAMwxuk1HDZxYeVUMjWJ4CMbM4AtMuCq6JA6KeQoJFGZxiwH3wKEOUwqpuFImDACiVk6fykwgoYAAHApYeMe-QpOgwZJPNdhKgANYNsPh_htqBMNa8Ffr6dw90z-A4OeSJlZPhLhF8W-b1U1azFGA4G-kPhSQrce9fnwZ6nieO7LFe1DoPeALPk2NSFMUZQFLuFDAYwsTThhQK2JeqBSIBAGPt-sHhm-sCfkRP6SLY_6eIBZ5YXS6JgowABkrE7oIOApL8VAuqCbzTjhkEAhYjGqEGIZbm0HToIm_SDEuQKzO08mSKosQfCEeELoEm4YSA7ggLkppoHc5JIGAehIjAtbGRg2BlhQBhQEgoAaFyFC0AAPAAhL4uJsryACa6R9iwzlQPEqjeawLnNnopL_tQkjRagsXqmlNTeW04LXHceQUP-By8gAYtyk5ZYw3muBQsDxLyEB1TA3nyrV9UxfKBZpd5NqdOSPXoBAJTxIAykaAAD6ZEwIA0raAKvRgDHcoAgB6tUNI0xXAxC_C4jBwFc_44PKaCYLgBCpa1G1bRQPXyn16ADZ1cVRaohnGXApn6HwFmIFZNnRH9QA&fontsize=14px&hidenavigation=1&theme=dark)

## Sort

### bubbleSort

```javascript
function bubbleSort(arr) {
  let count = arr.length - 1
  while (count > 0) {
    for (let i = 0; i < count; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp
        temp = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = temp
      }
    }
    count -= 1
  }
}

function bubbleSort2(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp
        temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
}

let arr = [2, 1, 3, 4, 5]

bubbleSort(arr)
console.log(arr)
```

[![Edit bubbleSort demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVLgCuqxFE5ABAEZ3vuwDKpAJwoAKAIYCBASlbAAOqlatYFVmQYqAvK3ECcsVAHMKAC1YBaVgEYA3PPmKA7segxWwtZVYA-VgAZpcgqKrGCCbsqsEKxavtaRrAA8qqTqcRAA1OkB9sGKEGBuOgDaEAC63toSJazpVqXZQbmKEVQAtgAOto1Nbe3RlQIlpV1NwcVl_eM1dSOjA9W1luVavbO5AL45ipuoW8nq5lo2OTs78mAMTCwKnNx8ghQATGISDYqhAuEwKlExaYkDPTUIymCw2SKZN7BD5fFR4fqxVjwpI6IGGEzmKyYiBxPCQmR7PIFF6DPDlHzFeGLeoE7q5FowDprHqMvpaSnDQljKpkyY86ZLZm5SkC5asVZcnYbE7yM6oCI6fpFR4AGisaoAzGqACxqgCsnNQtx4MH4QhJki6ZFQcFIsD0pAMFusIBVIAgcAAQmhxABPJBgURQOAwdZutCYXDGCitKBIUDWqg0RAgBIAQgAIgB5ADCABUAJoABQAoqxo7GvPIEhWoEpRIYNAByahNquoGswUToduKBKtb6iVTGcQhijNgCqeYAYmYABxtnIJZgUWBePMQVcwBIAehXa-rO-MXZ71fYpHQvvbCXQEAAbl5AMpGgAB9a222CAaVtAKvRgGO5QCAHrut4PtWcDEAIEDtCocACMQzY4DuEbYPgcBtruoHgZB147uel5YbW7auu6Xo-gI_qIIGwahus6xAA&fontsize=14px&hidenavigation=1&theme=dark)

### quickSort

```javascript
function quickSort(arr) {
  const count = arr.length
  const halfIdx = Math.floor(count / 2)
  let halfNo = arr[halfIdx]

  if (halfIdx < 1) {
    return arr
  } else {
    let temp1 = []
    let temp2 = []
    arr.splice(halfIdx, 1)
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < halfNo) {
        temp1.push(arr[i])
      } else {
        temp2.push(arr[i])
      }
    }
    return [...quickSort(temp1), halfNo, ...quickSort(temp2)]
  }
}

let arr = [2, 1, 9, 10, 12, 11]
console.log(quickSort(arr))
```

[![Edit quickSort demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVLgCuqxFE5ABAI50TEDWAyqQBOFABQBDQYICUrYAB1UrVmVRwKy0g3UBeVhME5YqAOYUAFgG4FSlWtZmxUMAEl0WVroCyY8zjBRSIREyLVYAelYAJikrRVZYdQcnADlSDz1JAG0klzcAXVjrVggwVhEc13cAHlYARhl5OKVBGAo6QUV9WKUAX1YYKDgYWSKlBNYqAFsAB1r0zILR-NaJmBnI-cWmjIM4aahuGHLHXKwAGjqYhSWwITLxiHSABgti1hr9Q2pTS2KAaj-DSWShKZX0mQgeXe9hOqSB2yUSimsxw0zocDM4iykKuCNYfQGQxGeKRa2mkVR6Mx4Jx3URvSWPWu2xabQ6rEyOC5nG4_CEomR9QuOVSFy5OB5vAEwhEyOiWwZqCZqAU43080iF1qFwAnFqnlrNXValtbKRYIZSMYRJK-TL9FIYiAziAIHAAEJoCQATyQYEcQx6LrQmFwZgokygSFAKioNEQICqAEIACIAeQAwgAVACaAAUAKL2CNQAB8Ciq4cj8TEJm0AHJqPXy6hKzAxOgW0oqpNWmJlA5BEMKA2AKpZgBiAFoABzNopVZgUWClrMQZcwKphJcrithMztzsVgBGpHQ3pbVXQEAAbqXAMpGgAB9M2wQDStoBV6MAx3KAQA8t9e7xWcDEIIEDTOocCCMQDY4GEIbYPgcDNluQEgWBl5hKe57oVWZYKM6roel6gi-og_qDDAPSUUAA&fontsize=14px&hidenavigation=1&theme=dark)

## Stack

```javascript
// 栈：先进后出，后进先出
class Stack {
  items = []

  // 压栈
  push(item) {
    this.items.push(item)
  }

  // 出栈
  pop() {
    return this.items.pop()
  }

  // 查看栈顶元素
  peek() {
    return this.items[this.items.length - 1]
  }

  // 判断栈是否为空
  isEmpty() {
    return this.items.length === 0
  }

  // 获取栈中元素的个数
  size() {
    return this.items.length
  }

  // 以字符串形式输出栈内元素
  toString() {
    return this.items.reduce((str, item) => {
      return str.concat(item.toString())
    }, '')
  }
}

const stack = new Stack()

stack.push({ name: 'allen' })
console.log(stack.peek())
console.log(stack.size())
console.log(stack.isEmpty())
console.log(stack.toString())
```

[![Edit Stack demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVIgD0dABIBAWgWP-ASioNvxgcCqBfioDD_3Tu14AdVMSgBDOHEYBlClOIBrRsHGNGEKgFs5AXkYBtALoBuRg0aBo5WbjNjAA4BXOAAsAFDpi6AlOqOWhTuEHA4Pvo4rh7een7mjgC-Vky89qgOqFpOpE6eARrZWowATjAULqXZIWEReuG5-QnJqYyAp-aA0O7MgG4ZgMKKgAS-WY5OMDAqBYHFWuWV1Yy14ZFwxov1vuGwqADmIYwAtIwAjBat1oAkSoC1psyA9GaAZCqAXHKAXl7DxWEAorpOFACek0UlMoVKo1UJLBo4La7dyMAxwxgABkSxRS1kA7cGANeVmIBaOUGgBC3QBUcoAHU1eWjgEAAXjB_kEgXNQXVlpDqNDkVpUUxAKdygHVtQBk3oAmOUARvqAeH1AMnx6UAoYqDUkLUiKUpobY06Z0kELMHrKLldAuYjUzxwCilAA02nisIAfFNATNgfNDaUcGQJFIKHFfDgKHKjYqCi0VUlTQByIP-9lZJJZZ2GxiG5RqIyoGAAdwUSlUBWRcdU0TcXgBjFQUl0MEQjCDUigWyD4iS_ujpFgkNISuzKmiYwmfnr5DgjZgzdb6fb5KpfuRDabUBbBuHETgn2-f27E97_cHs_jnu9Cp245AxpAYQAQmgpKUfkgwJW4DBA0eMNgcO4KLooEhQM6qDRECAADwAIQACIAPIAMIACoAJoAArvIwL5vha4h_ohUCMNIOwGEG1BBshqCoTAUjoPhWh_iWSiMMQ7jnreFDYQAqhBABi-wABx4Y4f4UDosAWhBvEwH-dA8RQfEoXQ7hESRKEAEakOgPz4X-6AQAAbhagDKRoAAPqTjAgDStoAq9GAMdygCAHsJqkaShcDEAq3yxqUxDYTgdBoJguAEHhwk2XZFDKXQ8mKf5aH4QeR5wKeRYXleN53kkSRAA&fontsize=14px&hidenavigation=1&theme=dark)

## Throttle

```javascript
const throttle = (fn, delay) => {
  let startTime = 0
  return function () {
    const context = this

    const currentTime = +new Date()
    if (startTime === 0) {
      startTime = +new Date()
      fn.apply(context, arguments)
    } else {
      if (currentTime - startTime > delay) {
        startTime = +new Date()
        fn.apply(context, arguments)
      }
    }
  }
}

const fn = throttle(() => {
  console.log('show', +new Date() - startTime)
  return 1
}, 1000)

let startTime = +new Date()
setInterval(() => {
  console.log(fn())
}, 100)
```

[![Edit Throttle demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVInlwUAEFAFgE6kUWyMC8jACjCoANI0xQAhgE8AlHwB8jYAB1UjRrCYNJbCgBUIAWxh9GABgDcajWxgUArm3VgHqYhQjlB81eo2MZKgMgeRUWEz8rBBw1v4aQSHETnaUhiZmANSoMADujAAiklQCsnE2ARBggjp66aa8jRa-FQGMtQbGDYzZeYXFMKVxbRrCOJIADhNQ0gJB4RRiugDmDiaUcGWtjAC-jDBQcKZ-I4xVgslsqZ0ZALTtFLo3pkoSMi3xIx31WTn5RSUtp82mNJtNZvNsItGCs1tQKJthiMdtsUf4dnEMWo1IkmMIzKwOFxYAJSoplBVEqRYDgoKRlgIAORwFikXKMsS9f4DMn3b5dIG2exOdQARkxYlF5mlQK0DyeP34XP6gLiRwoAElKDA2AA3SRQUnyXhKE6hYLUmC0-lCVClIE7SUyywgEQgGIAITQumkSDABqOjvdGGwOBYFCMUCQoEhNEQIAAPABCAoAeQAwvoAJoABQAooxw5GFGoE0WoJpJKhlrxGdRGSXUGWYJJ0I2NAmTI9AixdOrawBVfQAMVuAA4GxUE55uDAFIZZwmAPQz2CN5csFtt0sAI1I6Gk6_QEF1CkAykaAAH0qbBANK2gFXowDHcoBAD2Xx9PpbgxDYEAm2jYxFrHAlzQTBcAIBtl0_b9f3XJc9wPWDy0bV13TgL1UB9P0AxgHZcKAA&fontsize=14px&hidenavigation=1&theme=dark)

## Tree

### expandTree

```javascript
// 把一个树平铺
let tree = {
  id: 1001,
  parentId: 0,
  name: 'AA',
  children: [
    {
      id: 1002,
      parentId: 1001,
      name: 'BB',
      children: [
        { id: 1006, parentId: 1002, name: 'FF' },
        { id: 1007, parentId: 1002, name: 'GG' }
      ]
    },
    {
      id: 1003,
      parentId: 1001,
      name: 'CC',
      children: [
        {
          id: 1004,
          parentId: 1003,
          name: 'DD',
          children: [{ id: 1008, parentId: 1004, name: 'HH' }]
        },
        {
          id: 1005,
          parentId: 1003,
          name: 'EE',
          children: [{ id: 1009, parentId: 1005, name: 'II' }]
        }
      ]
    }
  ]
}

const expandTree = tree => {
  let result = []

  const expand = tree => {
    tree.forEach(({ children, ...rest }) => {
      result.push(rest)
      if (children) expand(children)
    })

    return result
  }

  return expand(tree)
}

console.log(JSON.stringify(expandTree([tree])))
```

[![Edit expandTree demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVIgD0dABIFFGgAHKBUcoIgWgznqBfKQDqpYFRhQBOMGIwC8jYIMaMI6RIwCMABg1qANAsYAHAIYTKASRWMNe1ItRGAtjFUByAIJuXNxcQAW0dFNVAG15W0UlS00NACZvCONTCgtVaN19O0dnRhcAIVyvDMY_AKDGUKLFZVStADZ4iMMTamSorTjKxnsnVwAxXpcigF8dOU7q9S0AdgaE5vM22NnMnpyAcTXB8MUhgF19EbHtyJqNAGZZxJaUye1Z7uyXAGEnwuOSqEDqELDGqsWACzLJpJG7RC6dB6uAAi0Lef2K_k-ZQqx0aE2iAA5gYorgtTkDOitHgAJElbBF7YajX5_DFaACswLxrVOELRXSyrgAotz4X8Pl9UD8iSdbgBOHEg66LJmiqE5MxmCl_KnHNU7faoIYAbkEgjIqDgImwxgwABUJFJZOJJDIAHxHRTCRgSOAAVygIlkwV2etQ-kNxsYpqMGBkoitDqdEVtMBwYFIYm5Rj8AAo07TGoLTMCcPm3RRhgBKaNZiJuz0UHAGd1wXxpwvF_0IiBgRhpnPUUuhjCdpFC5sllsVmAUd1iWyVr0j3X68ISceTkNYM3oNNxofa_0G8hwUiwHBQUgAczTACkAMoAeQAcjhjWI0Ce2wBPNO99CWyRp4Jx3bFoBOogDoIAQHAuRoCYr5IGARhQHAMAjGBGDYDgvgUA4UBIKAhpUDQiAgAAPAAhNC15POaACaAAK3KMBhWH2oIRGMVAjBQGGJ7SC41AuMxqCsTARjoAJihEU4FBGIiJiIRQPEAKrmr0AC0mL8foREUBAFCwPa5o6bARF0NpukwAJxm-MJoksQARqQ6CvhZ6AQAAbvagDKRoAAPpBgeMCANK2gCr0YAx3KAIAexkue5LFwMQT4GCIcBiMQPE4HQaCYLgBD8cZMVxRQFl0PZjkFWxAkgWBEFQWIMGIHBCFIUMQxAA&fontsize=14px&hidenavigation=1&theme=dark)

### findPath

```javascript
// 已知数组list，写一个函数，要求输入eg，输出ac->ce->eg.
const list = [
  {
    id: 'ab',
    children: [
      {
        id: 'cd',
        children: [
          {
            id: 'ef',
            children: []
          }
        ]
      },
      {
        id: 'fg',
        children: []
      }
    ]
  },
  {
    id: 'ac',
    children: [
      {
        id: 'ce',
        children: [
          {
            id: 'eg',
            children: []
          }
        ]
      }
    ]
  }
]

const findPath = (list, key) => {
  let result = []

  const getPath = (list, pId = '') => {
    list.forEach(node => {
      let key = `${pId ? `${pId}->` : pId}${node.id}`
      result.push(key)
      getPath(node.children, key)
    })
  }

  getPath(list)

  console.log(result)

  return result.find(str => str.indexOf(key) > -1)
}

console.log(JSON.stringify(findPath(list, 'eg')))
```

[![Edit findPath demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVIgD0dABIE-6gp-6AOpoCN-UEcFgMP-BMxUAAcoCo5QL-K7foEDIwEI2gZPjApoowA5v3mAvxQCGxALQA-YjAOqcAHVRlUfRjxsBeRgG1gFxowjpEjAORaARj4ANG6MxAAW0OgATtTeLqHunt4-xOjBiWGRUDFxzq6o7kUeXr4wYBmFxVlRsajxALqZAL5NVc1BjAXFyb5gKpXFEbV5Tm3urRYdXaG9fsSDNTl18d1Fc0aL7sPLo2s9pT6qW0U7ufXO40WT7W2tANwWFlY2kBgACloU4YyOABR2CidADWMAAngBKX76GZVWAURixOAAVygCMcY0eqFCLwRKhgFE-31-jABvCBjAADgBJdAknw-KH2GH7WzknBgUjRACiOnCf1QpEw0Nh1VsBMYoLBJIABgASYA0ukAfkY8sVtOaBhljG8SuaCsFmBwnmaMqxYqRqIoOEpyLg_KlEIt1XxhK-_KNMBwZzqIPBzpagfaWNCbqJ_MBwe25DgpFgOCgpBUfytaOjiIJyOihTTNre6D-fGiIuLJow2AA8mA_k7GDDdABGYPNUOWWPx71JlMAKQAypWAHI4YtoFQQMBgv4FiNkvidI4DCHL-4gIIgXgAITQWmiYKQYC0UDgMA6G4ruHCFAAtlAkKArFQaIgQAAeACEABFKwBhAAqACa7zcowV63voFivmBUC2FoqAqPYRyoD4EGoFBMBaOgqHuK-14EloWS7ieFCIQAqn-ABiugABwoaEr4UBAFCwPof5MbAr50IxzEwKhnHhBhWGQf4Qpgnx6AQAAbvogDKRoAAPovJ2gDStoAq9GAMdygCAHpxEnSZBcDENEECUgicDRMQiE4HQaCYLgBAoZx-mGcZfF0CJ6BiZBdDQaha4bnA26oLu-6IIex6ns0zRAA&fontsize=14px&hidenavigation=1&theme=dark)

### genTree

```javascript
/**
 * 把 var list = [
 { id: 1001, parentId: 0, name: "AA" },
 { id: 1002, parentId: 1001, name: "BB" },
 { id: 1003, parentId: 1001, name: "CC" },
 { id: 1004, parentId: 1003, name: "DD" },
 { id: 1005, parentId: 1003, name: "EE" },
 { id: 1006, parentId: 1002, name: "FF" },
 { id: 1007, parentId: 1002, name: "GG" },
 { id: 1008, parentId: 1004, name: "HH" },
 { id: 1009, parentId: 1005, name: "II" }
 ]
 转化为
 {
  id: 1001,
  parentId: 0,
  name: "AA",
  children: [
    {
      id: 1002,
      parentId: 1001,
      name: "BB",
      children: [
        { id: 1006, parentId: 1002, name: "FF" },
        { id: 1007, parentId: 1002, name: "GG" }
      ]
    },
    {
      id: 1003,
      parentId: 1001,
      name: "CC",
      children: [
        {
          id: 1004,
          parentId: 1003,
          name: "DD",
          children: [{ id: 1008, parentId: 1004, name: "HH" }]
        },
        {
          id: 1005,
          parentId: 1003,
          name: "EE",
          children: [{ id: 1009, parentId: 1005, name: "II" }]
        }
      ]
    }
  ]
}
 */

const list = [
  { id: 1001, parentId: 0, name: 'AA' },
  { id: 1002, parentId: 1001, name: 'BB' },
  { id: 1003, parentId: 1001, name: 'CC' },
  { id: 1004, parentId: 1003, name: 'DD' },
  { id: 1005, parentId: 1003, name: 'EE' },
  { id: 1006, parentId: 1002, name: 'FF' },
  { id: 1007, parentId: 1002, name: 'GG' },
  { id: 1008, parentId: 1004, name: 'HH' },
  { id: 1009, parentId: 1005, name: 'II' }
]

const genTree = (arr, parentId) => {
  return arr.reduce((tree, node) => {
    if (node.parentId === parentId) {
      if (parentId === 0) {
        return { ...node, children: genTree(arr, node.id) }
      }
      return tree.concat({ ...node, children: genTree(arr, node.id) })
    }
    return tree
  }, [])
}

console.log(JSON.stringify(genTree(list, 0)))
```

[![Edit genTree demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVIgD0AVAwDqoAEDbgUUZsBuAhgCc2UCHApsAvGwDarNsDYR0iNgEYADBrUAaNgAch1CgEkVbDXtT8AtjFXMQAQSeO2AXx3zFy1Zo0ATHqGgsZmflq6bNZ2DiAAQvFunt5K5v4AzMFGlOHqkVa29myOAMKlyV7sPulaACzZobm1GlnRRXEAIp2Vqb75GgCsjWEtbTHFjgCiU73VaREaAGwjzYtB7bElIABiO3MKCwMA7KumLRsTcQDi1wc1iwAcZ3n-DZuTIAASX_dH_gBOF4tYYfOImEzJeQAXXkgBt4wBoyoAuOW88n-BTRIVGqksaKu2xcjiqbDYxAAFtB0E1VHJ2CSFGj6ejAsSmQYcudFrpGfT8Y5EkSeSTyZTqbIhfSHgMVuympyBpcOts9gc2SSpf5TrLsQrCltHLcoXSmbDjR5WeqJf1Mhb6Vi1gNuWaSXyQOVBc7SRSoFTqDSJZbPUzrfVbWr7fKbQHeUrHN0PWqmSKfWKZBqtM9tQ63nrPj9kqbE-bo8BoySQ0Mw2yI68tFky2DtjME0WvaK_bJ0xogVnI1pQa6IQXo-4JYX6aO6abJxw6KwyKhxCIxBJpGm0RWnSSa-ZcXT8QByFwH1ieBl0itBTEc2vaVmHxIn1Bn0sXsasndc-9Kg_lJ8vjcWgaa85Vvet9x_bp_z0V9yxBD8b3fPEfxmaDzzgxYVhAnV_CvCCtgPPY0Ng5lTmw7MtDwl0f1uYjAKeBDQKA78CJ-Oi30WIFyL7StkIIiF_2hABuVh53IJcAHNqAAFVCGApDYAAKIRBGBABKKQAD50LYUIKAAV0EdgVJwUJ0H04gYEUxSKDkqxSEwDTJG0kjyzAJTUAcmAcB3KRJGkHcNNc-kIHcxTfP86QNCC6M9MM-YcESzzMCrJNvV9VBVCk1BZJgKyVPszAcGUNSRxEz1JwlOKjLYWy8pwBdiH4ChFMURKcGSmBUrbFMO2y3L8sEVToi84r0FKiq1PKplKrNar2DqmBpvNWRoSm09yrExdSFgHAoFICTFIAKQAZQAeQAORwcRBDQCTQoAT0U_q5MU0RxD0aK1KmkAdBAMR4jQIQHqQMB-CgOAYE8f6MGwHAyQoGwoCQUAFyoGhEBAAAeABCToztKaSAE0AAUpjYBGkc01gscpqARH4VAJMkA9qAPanUFpmB-HQDmSSxuwKH4L0hEhigWYAVWknYAFpHnZtEsYoCAKFgTTpJV2AsboZXVZgDntbJbneZpgAjByHoN9AIF4TTAGUjQAAfQXOAdpgQBpW0AVejAGO5QBAD2163bZpuBiFu_QJDgQRiBZnA6DQTBcAIdnteD0OKANuhzfQS2aboOmOd-_64EB6xBBBxAwYhqH3HcIA&fontsize=14px&hidenavigation=1&theme=dark)

### transform

```javascript
// transform({
//   0: {
//     username: '0',
//     department: 'A-B-C', {path:'A'} {path:'A-B'} {path:'A-B-C'}
//   },
//   1: {
//     username: '1',
//     department: 'A-B-D', {path:'A'} {path:'A-B'} {path:'A-B-D'}
//   },
//   2: {
//     username: '2',
//     department: 'A-X-Y',
//   },
// })
// // 打印结果：
//   [
//   {
//     name: 'A',
//     path: 'A',
//     children: [
//       {
//         name: '0',
//         path: 'A-B',
//         children: [
//           { name: '0', path: 'A-B-C', children: [] },
//           { name: '1', path: 'A-B-D', children: [] },
//         ],
//       },
//       { name: '2', path: 'A-X', children: [{ name: '2', path: 'A-X-Y', children: [] }] },
//     ],
//   }
//   ]

const transform = data => {
  const expand = originData => {
    const expandData = []
    Object.values(originData).forEach(value => {
      const departmentList = value.department.split('-')

      departmentList.forEach((d, i) => {
        expandData.push({
          path: departmentList.slice(0, i + 1).join('-'),
          parentId: i > 0 ? departmentList.slice(0, i).join('-') : '',
          username: i
        })
      })
    })

    return expandData
  }

  const removeDuplicate = originData => {
    const retObj = originData.reduce((obj, item) => {
      return {
        ...obj,
        [item.path]: item
      }
    }, {})

    return Object.values(retObj)
  }

  const genTree = (originData, parentId = '') => {
    return originData.reduce((tree, node) => {
      if (node.parentId === parentId) {
        return tree.concat({ ...node, children: genTree(originData, node.path) })
      }
      return tree
    }, [])
  }

  return genTree(removeDuplicate(expand(data)))
}

const data = {
  0: {
    username: '0',
    department: 'A-B-C'
  },
  1: {
    username: '1',
    department: 'A-B-D'
  },
  2: {
    username: '2',
    department: 'A-X-Y'
  }
}

console.log(transform(data))
```

[![Edit transform demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVIgD0dABBQE4CGqcYpLAtgBTAAOqgaNxABkSNhopuPEBXODBao2vGNIDkE7QBoRYhY0wAHNiwqbKOgIIBaAEIOAwgZkWKAC0Ta72gC-nmw-fo5OQSFh_s5uQUbyjIGGcgoAjNKyxgrKquqaOukGiSamMBZWNhT2cQAiHsBevv5RTaEtEW3N4fUJaeIppeIATFnDuSpqGlqM2iMlAwrmltbUNXOOABoOAJqLOUNpgQCUpWKAykaADsqAy36AOeaAWP8TANoT2UniBbOtqTniPZsDh9GMRvNB0CxqNJXksTO8yiYvjo9L9gSYAbFIqiEQpQeDIahoRMcTJGEi5ijGBiIvF9CCwVAIVDGM8ALrJbEk8TAMkzIoeal9Ol4xkE6Hso5_MqszllSVo0nk-YCjq1LYeEVMwksnlKhZ0wU7fbChla8XJCWy8QyiaBCaskRkTgUZjsTjcPiMAC8plCbG9AD4ZCJxE64C7sBYMN7GDwIABzNB1P2B4OoExhiNYKPoZMUf0-tkAbhDCgA8gAjPAwYgUHAANzYUEU8H4ccTqDzbBOOA9AFE2KD-I3mzBU7IEZnypU1pQADIQcMxkctnArKrrHBwMxQCAUfjaBzaE4l9NldezigL8O9ngDof8dB0iAncelhGRji5v04MzKbyCO-OIAhe1TXnWcC7sQMD8BIz6MAA1Iw6Q9ngpBoAeR4nKkXJUpY6wAJLoNIECMEGEiMAA_NOqxgYuEFQTBcGMC--DoagmHHowOiLLheTTIULFASYpyngiolARJZ7iJCFCKGojCfhgXZickp6llOkK8KQ9YwHUig7hAxChGOPrtkmKZekGE64uQS6yZWeAxuZnY_pC6CKNB_BtlWz5ULwr5WWmCKyfJ6Y8jgkWkL5wkKM8e4wLwv4dKyJH-bFgSqYMdLAFJJihQpjk1nWK6tg5VYnqWmUiBpdkuvG1AACqQqZjBtiwCYWfmBr4ZQRExtoXFBTZMkwHJCkuV2ODuZ5MH8KwMAwHSqCkJggXWbFEBgG1K2YMlBIUP1XrHXhB1Ea-I1lAV6YLTAOBOsZ-4RZFu1LbFGammKjANagzWLe1nWud1ZKrXdzRnNJcqVZDgw1TDjDXa6i1ZRyLKstDgzqWeiM_X9MFaTpekGVBJn8Ep6CPn6JzU6e1WoI6dW-vmMY2VIwWTPkfIUrxywVLR6y1C47hVThyHjJD_FKsUoviKBAubH0IulmM7NKFMeo87LfMbrYCtGtoVUiHTYakLAOBQKQ8bzW6XA8AI6BUyeID6CAi5OGglgAJ5IGATYqCkrsYNgODeNYUBIKATpUDQiAgAAPAAhHUZauI1uwAAp9owoe8FAAYiHHOdQIwUAcPGXraNQ2j56ghcwGw6A1-IceaMzoKWCoFAVwAqo1ABiDgABzV6WccUHusABo1E8wHHdDjxQk8F3Q3j143BcVqtns13H6AQPWAYXIAAPom7AgDStoAq9GAMdygCAHnPe8HwXcDEB1ZgunALDEBXOB0GgmC4AQauc9n6vwoDvOgm90Db2XkXGuztXZwHduoFg3tEC-ygP7QIgQgA&fontsize=14px&hidenavigation=1&theme=dark)

## Websocket

```javascript
import Events from '../event/index.mjs'

const md5 = str => {
  // todo
  return encodeURIComponent(str)
}

export const MSG_TYPE = {
  /*
   * 心跳
   * */
  HEARTBEAT_CHECK: 0,
  /*
   *  文本
   * */
  TEXT: 1,
  /*
   * 图片
   * */
  IMAGE: 2
}

export const SEND_MSG_TYPE = {
  /*
   * 心跳
   * */
  HEARTBEAT_CHECK: 1,
  /*
   * 回执
   * */
  ACK: 2
}

const HEARTBEAT_TIME = 30 * 1000

/*
 * 消息通道类
 * 接收报文
 * {
 *  "id":"消息id",
 *  "msgType": 1, 0--心跳  1--文本  2--图片url
 *  "content": "http://www.baidu.com" 内容 { "bizType":"","content":""}
 * }
 *
 * 发送报文
 * {
 *  "type":1   1-心跳 2-ack
 * }
 * 对外暴露 init reconnection sendMessage destroy方法
 * 对外暴露 open message error close 事件
 * e.g let instance =  MessageChannel.init({url:''}); instance.on('message',data=>{console.log(data)})
 * */

class MessageChannel extends Events {
  timer
  timer2
  count
  __ws__
  url
  static instanceMap = {}

  constructor(url, initEvents = {}) {
    super(initEvents)
    this.timer = null
    this.timer2 = null
    this.count = 0
    this.__ws__ = {}
    this.url = url
    this.connect()
    this.handleMessage()
    this.handleClose()
    this.handleError()
    this.handleBrowserEvent()
  }

  /*
   * 初始化消息通道，同一个websocket只创建一次实例
   * */
  static init({ url }) {
    const instanceId = md5(url)
    if (!MessageChannel.instanceMap[instanceId]) {
      MessageChannel.instanceMap[instanceId] = new MessageChannel(url)
    }
    return MessageChannel.instanceMap[instanceId]
  }

  /*
   * 重新连接
   * */
  reconnection() {
    let initEvents = {}
    const instanceId = md5(this.url)
    if (this.__ws__.readyState !== WebSocket.CONNECTING && this.__ws__.readyState !== WebSocket.OPEN) {
      this.closeWebSocket()
      if (MessageChannel.instanceMap[instanceId]) {
        initEvents = MessageChannel.instanceMap[instanceId].events
      }
      Object.assign(MessageChannel.instanceMap[instanceId], new MessageChannel(this.url, initEvents))
    }
  }

  /*
   * 发送消息
   * */
  sendMessage(message) {
    this.__ws__.send(JSON.stringify(message))
  }

  /*
   * 销毁消息通道
   * */
  destroy() {
    this.closeWebSocket()
    const instanceId = md5(this.url)
    delete MessageChannel.instanceMap[instanceId]
  }

  /*
   * 连接websocket
   * */
  connect() {
    if (window.WebSocket) {
      if (this.__ws__.readyState !== WebSocket.CONNECTING && this.__ws__.readyState !== WebSocket.OPEN) {
        this.__ws__ = new WebSocket(this.url)
        this.__ws__.addEventListener('open', e => {
          console.log('连接成功，ws=', e.target)
          this.emit('open', e)
          this.heartbeatStart()
        })
      }
    } else {
      console.log('浏览器不支持WebSocket')
      this.emit('error', new Error('浏览器不支持WebSocket'))
    }
  }

  /*
   * 接收websocket消息
   * */
  handleMessage() {
    this.__ws__.addEventListener('message', e => {
      const receiveMsg = JSON.parse(e.data)

      // 不是心跳才回执
      if (receiveMsg?.msgType !== MSG_TYPE.HEARTBEAT_CHECK) {
        this.emit('message', receiveMsg)

        // 发送回执报文
        const message = JSON.stringify({
          id: receiveMsg.id,
          type: SEND_MSG_TYPE.ACK
        })
        if (this.__ws__) {
          this.__ws__.send(message)
        }
      } else {
        this.heartbeatReset()
        this.heartbeatStart()
      }
    })
  }

  /*
   * 连接断开
   * */
  handleClose() {
    this.__ws__.addEventListener('close', e => {
      console.log('连接断开，ws=', e.target)
      this.emit('close', e)
    })
  }

  /*
   * 连接错误
   * */
  handleError() {
    this.__ws__.addEventListener('error', e => {
      console.log('连接错误，ws=', e)
      this.closeWebSocket()
      this.emit('error', e)
    })
  }

  /*
   * 监听浏览器事件
   * */
  handleBrowserEvent() {
    window.addEventListener('online', this.reconnection.bind(this))
  }

  /*
   * 心跳开始
   * */
  heartbeatStart() {
    this.timer = window.setTimeout(() => {
      if (this.__ws__.readyState === WebSocket.OPEN) {
        // 连接还在发心跳报文
        const msg = JSON.stringify({
          type: SEND_MSG_TYPE.HEARTBEAT_CHECK
        })
        this.__ws__.send(msg)

        // 心跳补偿，重试三次心跳未应答关闭连接
        this.timer2 = window.setInterval(() => {
          if (this.count < 3) {
            this.count = this.count + 1
            this.__ws__.send(msg)
          } else {
            this.timer2 && clearInterval(this.timer2)
            this.closeWebSocket()
          }
        }, HEARTBEAT_TIME)
      } else {
        // 连接失败时 关闭websocket
        this.closeWebSocket()
      }
    }, HEARTBEAT_TIME)
  }

  /*
   * 心跳重置
   * */
  heartbeatReset() {
    this.count = 0
    this.timer2 && clearInterval(this.timer2)
  }

  /*
   * 关闭webSocket
   * */
  closeWebSocket() {
    this.__ws__.close()
    this.timer && clearTimeout(this.timer)
  }
}

export default MessageChannel
```

[![Edit Websocket demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/api/v1/sandboxes/define?parameters=N4IgZglgNgpgziAXKCA7AJjAHgOgFYLIgDGA9qgC4yVIgQC2ADqQE4UAEAogG7UVzswLUvXYByHAHoYvSvjhiA3AB1Uqsqjgd66AKzsAvOy0tDAPnbBV7dpMnsKpdKWvsWMCgFcWqdtTKYAKoASgCSAMIizKh8ABQmAJQqqAC-yarYzGzsGlrsALIAygDiAPoAKgCaAAqchpaukgBUruxN7IDD-oDPsa3tTZKuABKcAILB5QBCo-Wl4cPhANKI7AAMADSqjS2-Nu3sgOGmgDTmvW0DO-WcABrlywCMG2o7zSeAf2qA4k4n_a6h-SPFnMsAEyqNIZLBZDi5DiFTgAOQAIqUimUqrV6lYntsbG1Oj0djivjthmNJtNZvMlux7ptMSdAHtqgHMjT5nGwjRZAkHJKHsYnjKYjGblH51IwAZhWONuK2lyWevnagAjbQD2BoAsBMAygmAbx9rO1AKXGgDZTQClRvttQ15TZlHR0BbEBblRArSAHjj2Bb6HAAOblACejBg1qpa1WAFog90bLcQ0cbICQ-9vFATS6SOQqJR_RaABYUCiMRB2ADuhZwACMAIb2zw4Mj0C3sQChioBO7UsSeLEAAXt7fdaLRaNsnKHxuyALSkTaP5SbAIvKgEAEo0mjHOi0UH1-pC3bERsMx0vEADWY5NgE_tQBomoAWs0ATOnsNAQDjuDQxYgUCDkYzUdD5eBwUvumDsTAmUgvUATtNAFWbI8z0vUhfV8ehP2_X8YBYYRTGIKBSDgX9AGi5QA3uRNGAcHddhYA4NAtFLVBiF_IwCjgn9wgzciYigHBrwoWJgHjRAxDEFIkivTQKHIyicHIWIxFguAvx_MQ1nQUtBIMMxgFyUhYBwND3ViOTBISXiTUJdQoFLSSaMk-D6MYmAoD8LBU3QAQeD4AQFwcBhEOSGwn1glhAQ8nJSE8Sg_NKUp8zgEK_PjPyyKfYh-LIiiYHyUtGHRUFHhsKEWE8R9WFieNA1YxzKAEIxgF401sWMTxfRYWIitkfgklaBwMwgOAcC8xD6lQTwoCgPzPLajqup8nq-oGlqKGGqsAsoeoVkG1r2pwEKwpCtKlumlb43qKKppm-8YEfWJmvxZaOoYjBYA_Myf1OraZqu9BYHCNCMIeg6Vue2BOCQvKzqq7bLvIl6YAmYQwsQ4q2MB9hxxsOVsXaQBcJUAac1ADRlZV1UAGH_ABgVQAAOUAKjl8xgYs4FIPcPEAK-VAGwlQAvvQJwBCa0APO1AGj5ZkaVcGKIDi1j2Ja-NXAqlzMvIPJSMExLQnQeodF0fKWCgM6WogMB2FiABCW6pJgCzUCYliBKEpKUoAbUlk2ZYAXQSSqqtM3X9cNy3EuSxgLeN6X0GtnqYHzR3zKupjFeVpbxxa9wvB8QO6ODqyjYSyj3c9pOYBtvyEdsLFdnYQBZxMABtNAD34nVOceVw73IB8n1Eu3RaIjx-JvGHSssdKqu5V3KJluW9FiYGcHjFXzrVjWB7W8LShwdxS3QL1CkEqh2E1gwjAAdTJwpKd3DwcHCAB5WFYU4cIhVhYp2AAMkvi7VtCyfp5gWf58X38V_Xzft93_falhOuWqGitVC6EYAb2LFvKmsN0jnRsKPWIOsg6WWYl3U2HsUE23_jA7EDUnL1AQXHJBicpbJ3Nugn2OAZBOSWjYCOWD97FjwMdCgOBjJwAgO6VA8DaJ63jsgr2JC0H8PTj7QMMQA74J4Ug_uM0CpNwoC3BIcMaHCy2CcGcyoy40hsBhDAEjYgSV1pgoGM0J4hRwDo9AsQABShRD7mIoCwNA7o1Zen0dwxRmdVH4naIAAFTACD1tjNUmiMp_ngA4wCp17aAI6sAjCYCIE7ygS1TuQie5GHltInaSslGhOIr-CRzsE4oJTmQ62njaTePYCXUm5Mv4UGCa4I6J0jHYPVrEfMaBnD5hwPEupLSqpwPHvfMxM854L3km_Ve7BemQL3ofY-p9QjnyvjfIZ60p6jJfhM5eUyZmJJwD_OE_SHZrMnn7AOeyPCZI6kPaBDtsSnLMbPdAMMAAy7VUyITElBagMk_DmCifc_ymhVL4Q0mJEugAEI0APlKOMwoGD-fhQSLAfwUByfcgeMB6A3m-dBRF6KTlPSfmwYsT8KDjLYJ9LBNCCVZxoX4KAGFAVixBWpcFYhADytoACcjAAWaoAWDlAD0poAQGNLkUDEASzF2K2JiEQshP5YiuD_Tqpy3lgqRWf0geKnJWcs5I1zvqGpFNIEaMqQZEJP0krcMifXR5U9nlvI-dQL54luGIoBfXFleQ7wwAgLwfIHp6g2LsYwUsLAPr4W0qWPidh2B8sAPRm3RACyRoyLRDs4Het9UlD0AB-HAbpPQrh2UYZEFQaicBwLyUkApyQnwWMc4xK0sU4pdXdGAfyM1-o9NG-wM5GRzhCfc7kBj4KBtsbCexjjUDOLAK4j1ab0DLA7Vm90LF0BOiBZ5FcywYQIiRCUUttQcBsgWAA7EvE7lAsGSY4ZpR62EpWqYqeFi3GtoJcorBKQGVMrndEnAGZiUUFJfJYI8Arlvtvv-0NgGyUUqSR-lq56VEVORlUnUgBa00AAD6DSdgWreiA61X0OqPpYegF5jV3laCdcq2JbbAxUQsHOlSbLSCaTECXTDcK4AIro51UNqKJUzSbdKmj-Lw5w11TnHEJdACYqYAe-jsM2AtX9ZCBHzq2pI2RvgFHPnKtlawN1ilmXAopsx1jMnZOce434ATQD3qgI1YkqlGLBNSrEnplgomEPia8ShwAi26ABoVblPKcIKfYBaiGpAoYsBhqpqqHSMCRY0w6yjMRlXkCgGgWjt9K4GyYc-VAJZOnXI8UhxGkn2jdAw2jULkGSUweRbDQFA9Rr1Hi108xHhyhuQCmxSJhm51XofTex-z9xlL1Xh_cBdSDm_zvYjewJdAAb8YACnVJzdH7RuodAajBBvHSYJxLiBbUoeVu9gO7EQltROWyt_IZhzFraemlF7nNDfWR1jA-iu2KFsPYbogBTCMAP4KOM86AFXowAkHJM26IAKnNAApeoAFW9ADOioAW9SS5c2O81tyY0jBtcSxhCgoQBwsG4KWKAsQ-sMce60seh05ocAADzsFFHN-9MTaf1AHmQQKHAADUVJnsbtvsR59-bwP0qst-ynDaRqY8BCsnIsBQ0E6oETkn1zOoy9Fw8w6dnRVOYF3Sh2KRAw3bJEKfInBaVft_D-n7qHACMmoAUljABvpuwZHhq6mU45zrhzYHqHwwQ8b0YfJTfCm88h3O3Q86ADt_GrAGgMUBA3j2LWugFs6MItQj6vvKy-vvL4lSvELE9Jxj7PYeysnDdz7-ppqzippo7r456maNUszy13PqFiVddgj1tXo0w8ghpJkVgHBMBgFLH1DgBTeGKEdHQOAEw0Chq9EgMfjKYBG5AJQuQBAkCgA0KmCgtBUKsK4I1e2W_-BpUaeLBxOVHB1RwSVNKjfBONVbo__gSHXCiQv4GMAqBjk4ERgkJSwvQWI4BgCWBQDYgL9FEjMwBWANZiIrwFpAxrIjAL91JqB3RppvsIB2AGcBorxududmcB4f9GoLZrY_8ADT0DdP1xdrdT1MU38zYL9fYjA1cL84A2DGpfYAAffg9gM2W2WaCieSWIf_BIBDSODwbwXwYGL_HYITGAxqY5ZA4gcmdnV_JyXgvga2ZJG_dgPjVuSA0AnAIQEQWIPjTwWCEqBIcxDLSiWIW4aQkeNpTQuAO9Twiw1gTgHcDMSQwKR8fLDWTQ5nTQlhRgRgKAVxYGQMEwtw-5PSc6WhKqKOeQi6JQmwUgMAMAVQvgGgwAtpMwsA9qUogoygOAudBA0wWIZA_A9PNA-oTA2AKdXAlAwgvAkgsgmaXI_Ii_KgooughDK3IzDQrQowFg3Q9g09OBTWKQozX9bgvQygDg9gXqfqSnDImORQ-DAdKnWITw3oxtVg9g-oHwyAKAZXI44sAFTQotQQWg_YqqNI7EHYhQ4abI9gcgZw3_J445bkF8Tgu2frZgvovIyoigQMcgJIh2f_KImIuI4aBIlFWwpyOE99TPCgwon4542Q6OT49qJDWhbkC_c5U_OINw9QIw__eocne2JjMFFjMSUIeXXmXccVAfR4TA0SMQVCDkv5KQwfRqESRKMSRwHKDMIU4ImuXwZPJk9SFksQNkyU4gaUtwlIjIUUlQ_kpwzk6kmIUU_osSAUvcIU54zA3Us0g07UvgChVzMQNUjUu0uQXU50rknk8EYfUJMfCfSktMVAWfdqBfVAJfFfEnDCDfTpbAP9CgegKAXffsA_WgOnTWeEfeU-MtMLeMqAMwVQOnLMBMoicid0BFX5fM1AQsp-dASsmwOnWCQSHIBiMNDwBFQIcoAAMSDAAA4xA6yCCnwKBYAzAuthyYA6dJAhyRyCzJBINayCziwnAvRKy6d0BfUzBABlIwwyZMAGlbEHQAY7lABAD0nPXO4FXLgGIEcUYA4DgBYGIARSkBjNwAIH7MnMvOvIoFXMkCXLnm_KLLzNUGDPn0XxYGX0QFXyjJSBSCAA&fontsize=14px&hidenavigation=1&theme=dark)
