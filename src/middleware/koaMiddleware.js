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

middleware.reduceRight(async (exec, fn, i) => {
  if (exec instanceof Promise) exec = await exec
  if (i === 0) await fn(ctx, exec)
  return async () => fn(ctx, exec)
}, next)
