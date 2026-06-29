const { defineConfig } = require('@vue/cli-service')
const path = require('path')

// 路径解析函数
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  // 转译依赖
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
