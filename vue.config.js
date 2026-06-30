const { defineConfig } = require('@vue/cli-service')
const path = require('path')

// 路径解析函数
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  // webpack-dev-server提供的代理功能可以把所有请求到当前服务中的请求转发或者代理到另外的服务器上
  // 转译依赖
  devServer: {
    proxy: {
      // 当地址里面有 /api 的时候就触发代理机制
      '/api': {
        // 要代理的服务器地址 这里不用写/api
        target: 'https://api.imooc-admin.lgdsunday.club',
        changeOrigin: true // 是否跨域
      }

    }
  },
  transpileDependencies: true,

  // Webpack 配置
  chainWebpack (config) {
    // 设置 svg-sprite-loader
    // 1. 排除 src/icons 目录下的 SVG（不让默认的 file-loader 处理）
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()

    // 2. 添加新规则处理 src/icons 目录下的 SVG
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
})
