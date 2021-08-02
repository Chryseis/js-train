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
  toString() {}
}
