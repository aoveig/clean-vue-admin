/**
 * 深拷贝
 *
 * @param {any} data 要拷贝的数据
 *
 * @return {any} 返回拷贝后的数据
 */
export default function deepCopy<T>(data: T): T {
  // 如果传入的参数不是对象或数组，则直接返回该参数
  if (typeof data !== "object" || data === null) {
    return data;
  }

  // 根据对象或数组的类型创建一个空的对象或数组
  const result: any = Array.isArray(data) ? [] : {};

  // 遍历对象或数组的属性或元素，递归进行深度拷贝
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (typeof data[key] === "object") {
        result[key] = deepCopy<any>(data[key]);
      } else {
        result[key] = data[key];
      }
    }
  }

  // 返回新的对象或数组
  return result as T;
}
