// 定义树节点类
class TreeNode {
  constructor(value) {
    this.value = value
    this.children = [] // 孩子节点数组
  }

  addChild(node) {
    this.children.push(node)
  }
}

// 迭代实现 DFS
function dfsIterative(root, targetValue) {
  if (!root) return null

  const stack = [root] // 使用栈存储节点
  while (stack.length > 0) {
    const node = stack.pop() // 弹出栈顶节点

    console.log(node.value) // 访问当前节点

    if (node.value === targetValue) {
      return node // 找到目标节点，返回
    }

    // 将子节点倒序压入栈中，以保证按从左到右的顺序遍历
    for (let i = node.children.length - 1; i >= 0; i--) {
      stack.push(node.children[i])
    }
  }

  return null // 如果没有找到目标节点
}

// 示例：搜索值为 4 的节点
const resultIterative = dfsIterative(root, 4)
if (resultIterative) {
  console.log(`节点值: ${resultIterative.value} 找到了!`)
} else {
  console.log('没有找到目标节点!')
}
