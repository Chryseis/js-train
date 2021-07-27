const getCloneFlag = obj => {
  let type = typeof obj
  if (type !== 'object') {
    return false
  } else {
    if (obj === null) {
      return false
    } else if (obj instanceof RegExp) {
      return false
    } else if (obj instanceof Date) {
      return false
    } else if (Array.isArray(obj)) {
      return true
    } else {
      return true
    }
  }
}

const deepCloneByArray = val => {
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

const deepCloneByMap = val => {
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
        return visitedObjs.get(val)
      }
    } else {
      return val
    }
  }

  return clone(val)
}

function deepCopy(obj, hash = new WeakMap()) {
  // 递归拷贝
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Date) return new Date(obj)
  if (obj === null || typeof obj !== 'object') return obj // 简单类型

  if (hash.has(obj)) return hash.get(obj) // 循环引用

  const instance = new obj.constructor()
  hash.set(obj, instance)

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      instance[key] = deepCopy(obj[key], hash)
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
console.log(deepCopy(obj))
console.log(+new Date() - start1, 'Map')
