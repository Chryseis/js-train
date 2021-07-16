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

const promise1 = () => new Promise(resolve => {
  setTimeout(resolve.bind(this,1),1000)
})
const promise2 = () => new Promise(resolve => {
  setTimeout(resolve.bind(this,2),3000)
})
const promise3 = () => new Promise(resolve => {
  setTimeout(resolve.bind(this,3),2000)
})
const promise4 = () => new Promise(resolve => {
  setTimeout(resolve.bind(this,4),5000)
})
const promise5 = () => new Promise(resolve => {
  setTimeout(resolve.bind(this,5),6000)
})

Promise.race([promise1(), promise2(), promise3(), promise4(), promise5()]).then(data => {
  console.log(data)
})

promiseRace([promise1(), promise2(), promise3(), promise4(), promise5()]).then(data => {
  console.log(data)
})
