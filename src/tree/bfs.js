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

// 创建树结构
const root = new TreeNode(1)
const node2 = new TreeNode(2)
const node3 = new TreeNode(3)
const node4 = new TreeNode(4)
const node5 = new TreeNode(5)

root.addChild(node2)
root.addChild(node3)
node2.addChild(node4)
node2.addChild(node5)

// BFS 实现
function bfsTree(root, targetValue) {
  const queue = [root] // 初始化队列，从根节点开始

  while (queue.length > 0) {
    const node = queue.shift() // 出队一个节点

    if (node.value === targetValue) {
      return node // 找到目标节点，返回
    }

    // 将当前节点的子节点加入队列
    for (const child of node.children) {
      queue.push(child)
    }
  }

  return null // 如果没有找到目标节点
}

// 示例：搜索值为 4 的节点
const result = bfsTree(root, 4)
if (result) {
  console.log(`节点值: ${result.value} 找到了!`)
} else {
  console.log('没有找到目标节点!')
}
