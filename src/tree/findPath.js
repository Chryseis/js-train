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
