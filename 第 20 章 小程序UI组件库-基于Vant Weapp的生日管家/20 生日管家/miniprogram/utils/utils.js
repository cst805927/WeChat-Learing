module.exports = {
  getToday,
  getFullYear,
  dateDiff,
  getNextBirthday
}
// 获取当前格式化日期
function getToday() {
  // 获取当前日期对象
  const now = new Date()
  // 获取当前年份（4 位数）
  const y = now.getFullYear()
  // 获取当前月份
  const m = now.getMonth() + 1
  // 获取当前日期
  const d = now.getDate()
  // 格式化当天日期
  const today = y + '/' + m + '/' + d
  return today
}
// 获取当前年份（4位数）
function getFullYear() {
  // 获取当前日期对象
  const now = new Date()
  // 获取当前年份（4位数）
  const y = now.getFullYear()
  return y
}
// 计算天数差
function dateDiff(sDate1, sDate2) {
  sDate1 = sDate1.replace(/-/g, '/')
  sDate2 = sDate2.replace(/-/g, '/')
  const oDate1 = new Date(sDate1)
  const oDate2 = new Date(sDate1)
  const iDays = parseInt((oDate1 - oDate2) / 1000 / 3600 / 24)
  // 把相差的毫秒数转换为天数
  return iDays
}
// 计算距离下个生日还有多少天
function getNextBirthday(b_day) {
  // 获取当前日期
  const today = getToday()
  // 获取当前年份
  let y = getFullYear()
  // 计算日期差
  let n = dateDiff(today, y + '-' + b_day)
  // 今年生日已经过完了
  if (n < 0) {
    // 获得明年年份
    y++
    // 计算日期差
    n = dateDiff(today, y + '-' + b_day)
  }
  return n
}