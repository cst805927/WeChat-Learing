// 获取当前格式化日期
function getToday() {
  // 获取当前日期对象
  let now = new Date()
  // 获取当前年份（4 位数）
  let y = now.getFullYear()
  // 获取当前月份
  let m = now.getMonth() + 1
  // 获取当前日期
  let d = now.getDate()
  // 格式化当天日期
  let today = y + '/' + m + '/' + d
  return today
}
// 获取当前年份（4位数）
function getFullYear() {
  // 获取当前日期对象
  let now = new Date()
  // 获取当前年份（4位数）
  let y = now.getFullYear()
  return y
}