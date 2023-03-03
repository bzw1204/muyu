/**
 * 利用ES6的Map方法根据对象执行属性进行数组去重
 *
 * @param arr 待去重数组
 * @param key 需要判断的对象的Key
 * @return 去重后的数组
 */
export function unique<T, K extends keyof T>(arr: T[], key: K) {
  let map = new Map()
  arr.forEach((item) => {
    if (!map.has(item[key])) {
      map.set(item[key], item)
    }
  })
  return [...map.values()]
}

/**
 * 根据数组对象中某一属性进行分组
 */
export function groupBy<T, K extends keyof T>(arr: T[], key: K): Record<any, any> {
  // 根据数组对象中某一属性进行分组
  const result: Record<any, any> = {}
  return arr.reduce((total, item) => {
    // @ts-ignore
    ;(total[item[key]] = total[item[key]] || []).push(item)
    return total
  }, result)
  // => {男: [{name: "lilei", label: "男"}, {name: "jim", label: "男"}], 女: [{name: "hanmeimei", label: "女"}, {name: "lucy", label: "女"}]}

  //或者
  // let result = arr.reduce((total, item) => {
  //   total[item.label] = total[item.label] || []
  //   total[item.label].push(item)
  //   return total
  // }, {})
  // => {男: [{name: "lilei", label: "男"}, {name: "jim", label: "男"}], 女: [{name: "hanmeimei", label: "女"}, {name: "lucy", label: "女"}]}
}
