const getCloneFlag = obj => {
  let type = typeof obj
  if (type !== 'object') {
    return false
  } else {
    if (obj === null) {
      return false
    } else if (Array.isArray(obj)) {
      return true
    } else {
      return true
    }
  }
}

const deepClone = val => {
  const visitedObjs = []

  const clone = val => {
    const isNeedClone = getCloneFlag(val)

    if (isNeedClone) {
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
    } else {
      return val
    }
  }

  return clone(val)
}

const deepClone1 = val => {
  const visitedObjs = new Map()

  const clone = val => {
    const isNeedClone = getCloneFlag(val)

    if (isNeedClone) {
      let retVal
      if (!visitedObjs.has(val)) {
        retVal = Array.isArray(val) ? [] : {}
        visitedObjs.set(val, retVal)
        Object.keys(val).forEach(key => {
          retVal[key] = clone(val[key])
        })
        return retVal
      } else {
        return visitedObjs.val
      }
    } else {
      return val
    }
  }

  return clone(val)
}

const obj = { a: 2 }
obj.b = { d: 1, c: obj, e: [1, 2, 3, obj] }
obj.b.f = obj.b.c
obj.f = obj.b.e

let start = +new Date()
console.log(deepClone(obj))
console.log(+new Date() - start)

let start1 = +new Date()
console.log(deepClone1(obj))
console.log(+new Date() - start1)
