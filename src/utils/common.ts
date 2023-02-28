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
