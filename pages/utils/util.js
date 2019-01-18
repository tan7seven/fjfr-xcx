/** 
 * 和PHP一样的时间戳格式化函数 
 * @param {string} format 格式 
 * @param {int} timestamp 要格式化的时间 默认为当前时间 
 * @return {string}   格式化的时间字符串 
 */
function formatDate(now) {
  var datenow = new Date(now);
  var year = datenow.getFullYear();
  var month = datenow.getMonth() + 1;
  var date = datenow.getDate();
  var hour = datenow.getHours();
  var minute = datenow.getMinutes();
  var second = datenow.getSeconds();
  return year + "-" + month + "-" + date + " " + hour + ":" + minute; 
}
module.exports = {
  formatDate: formatDate
}