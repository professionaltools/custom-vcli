//工具类文件
const path = require('path')
const os = require('os')
//从工作目录下找路径
const resolve = function (dir) {
  return path.resolve(__dirname, '..', dir)
}
//获取IP
const getIp = function () {
  let needHost = ''
  try {
    // 获得网络接口列表
    let network = os.networkInterfaces();
    for (let dev in network) {
      let iface = network[dev]
      for (let i = 0; i < iface.length; i++) {
        let alias = iface[i]
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          needHost = alias.address
        }
      }
    }
  } catch (e) {
    needHost = 'localhost'
  }
  return needHost
}
module.exports = {
  resolve,
  getIp,
}

