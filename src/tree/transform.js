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
