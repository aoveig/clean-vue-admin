/**
 * 合并数组并过滤相同的值
 *
 * @param {Array<any>} arr1 要合并的数组1
 * @param {Array<any>} arr2 要合并的数组2
 *
 * @return {Array<any>} 返回值为一个数组
 */
export function getUniqueAfterMerge(arr1: Array<any>, arr2: Array<any>) {
  const uniqueArr = [...new Set([...arr1, ...arr2])];
  return uniqueArr;
}
