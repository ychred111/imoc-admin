/**
 * ============================================================
 * 模块：element-plus 主题色动态切换工具
 * 功能：根据用户选择的主色，动态生成并注入新的 CSS 样式
 * 原理：从 CDN 获取 element-plus 默认样式 → 将固定色值替换为占位符 →
 *       根据主色计算所有衍生色值 → 替换占位符 → 生成新 style 标签注入页面
 * ============================================================
 */

import color from 'css-color-function' // 颜色函数解析器：执行 tint(10%) / shade(10%) 等运算
import rgbHex from 'rgb-hex' // RGB 转十六进制转换器
import formula from '@/constants/formula.json' // 颜色计算公式配置文件
import axios from 'axios' // HTTP 请求库：用于获取 CDN 样式文件

// ============================================================
// 第一步：根据主色生成完整的色值表
// ============================================================

/**
 * 根据主色值生成所有衍生色值表
 * @param {string} primary - 主色十六进制值，如 '#409eff'
 * @returns {object} 色值表，如 { primary: '#409eff', 'light-1': '#...', ... }
 *
 * 执行流程：
 * 1. 将主色存入 colors 对象
 * 2. 遍历 formula.json 中的每个颜色变量
 * 3. 将 formula 中的 'primary' 占位符替换为实际主色值
 * 4. 使用 css-color-function 计算 tint/shade 后的 RGB 值
 * 5. 使用 rgb-hex 将 RGB 转换为十六进制
 * 6. 返回完整的色值映射表
 */
export const generateColors = primary => {
  // 边界处理：如果没有传入主色值，直接返回
  if (!primary) return

  // 初始化色值对象，先存入原始主色
  const colors = {
    primary
  }

  // 遍历 formula.json 中的每一个颜色变量
  Object.keys(formula).forEach(key => {
    // 示例：formula[key] = 'color(primary tint(10%))'
    // 替换后：'color(#409eff tint(10%))'
    const value = formula[key].replace(/primary/g, primary)

    // 1. color.convert(value)  → 计算颜色函数，返回 RGB 字符串，如 'rgb(64, 158, 255)'
    // 2. rgbHex(...)           → 转换为十六进制，如 '409eff'
    // 3. 拼接 '#' 前缀，存入 colors 对象
    colors[key] = '#' + rgbHex(color.convert(value))
  })

  return colors
}

// ============================================================
// 第二步：获取 element-plus 默认样式并转换为模板
// ============================================================

/**
 * 获取当前 element-plus 版本的默认样式表（从 CDN 拉取）
 * @returns {string} 带有占位符的 CSS 模板
 *
 * 执行流程：
 * 1. 读取 element-plus/package.json 获取版本号
 * 2. 拼接 unpkg CDN 地址
 * 3. 使用 axios 请求 index.css 文件
 * 4. 调用 getStyleTemplate 将固定色值替换为占位符
 */
const getOriginalStyle = async () => {
  // 从 node_modules 中读取 element-plus 的版本号
  const version = require('element-plus/package.json').version

  // 拼接 CDN 地址：https://unpkg.com/element-plus@版本号/dist/index.css
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`

  // 发起 HTTP 请求获取 CSS 文件内容
  const { data } = await axios(url)

  // 将原始 CSS 中的固定色值替换为占位符变量
  return getStyleTemplate(data)
}

/**
 * 将 element-plus 默认样式中的固定色值替换为占位符
 * @param {string} data - 原始 CSS 文本
 * @returns {string} 带占位符的 CSS 模板
 *
 * 执行流程：
 * 1. 定义 element-plus 默认色值 → 占位符的映射表
 * 2. 遍历映射表，用正则全局替换 CSS 中的色值
 * 3. 例如：'#409eff' → 'primary'，'#53a8ff' → 'light-1'
 * 4. 返回替换后的模板，供后续全局替换使用
 */
const getStyleTemplate = data => {
  // element-plus 默认色值与占位符的映射关系
  // 这些是 element-plus 内置的固定色值，需要被替换为可动态变化的占位符
  const colorMap = {
    '#3a8ee6': 'shade-1', // 主色变暗 10%
    '#409eff': 'primary', // 主色（基准色）
    '#53a8ff': 'light-1', // 主色变亮 10%
    '#66b1ff': 'light-2', // 主色变亮 20%
    '#79bbff': 'light-3', // 主色变亮 30%
    '#8cc5ff': 'light-4', // 主色变亮 40%
    '#a0cfff': 'light-5', // 主色变亮 50%
    '#b3d8ff': 'light-6', // 主色变亮 60%
    '#c6e2ff': 'light-7', // 主色变亮 70%
    '#d9ecff': 'light-8', // 主色变亮 80%
    '#ecf5ff': 'light-9' // 主色变亮 90%
  }

  // 遍历映射表，将 CSS 中的固定色值替换为占位符
  // 例如：'.el-button--primary { background: #409eff; }'
  // 替换后：'.el-button--primary { background: primary; }'
  Object.keys(colorMap).forEach(key => {
    const value = colorMap[key]
    // 全局替换（不区分大小写），将色值替换为占位符变量名
    data = data.replace(new RegExp(key, 'ig'), value)
  })

  return data
}

// ============================================================
// 第三步：核心方法 - 生成完整的新样式表
// ============================================================

/**
 * 根据用户选择的主色值，生成 element-plus 的完整新样式表
 * @param {string} primaryColor - 用户选择的主色十六进制值
 * @returns {string} 完整的 CSS 文本（所有色值已被替换为用户自定义色值）
 *
 * 执行流程：
 * 1. 调用 generateColors 生成所有衍生色值表
 * 2. 调用 getOriginalStyle 获取带占位符的 CSS 模板
 * 3. 遍历色值表，将 CSS 模板中的占位符全部替换为实际色值
 * 4. 返回替换完成的最终 CSS 文本
 */
export const generateNewStyle = async primaryColor => {
  // --- 步骤 1：生成所有衍生色值 ---
  // 返回结果示例：
  // {
  //   primary: '#409eff',
  //   'light-1': '#53a8ff',
  //   'light-2': '#66b1ff',
  //   ...
  // }
  const colors = generateColors(primaryColor)

  // --- 步骤 2：获取带占位符的 CSS 模板 ---
  // 模板示例：'.el-button--primary { background: primary; }'
  let cssText = await getOriginalStyle()

  // --- 步骤 3：将占位符替换为实际色值 ---
  // 遍历所有色值，逐个替换 CSS 中的占位符
  Object.keys(colors).forEach(key => {
    // 正则说明：
    // - '(^|\\s+)'：匹配行首或空白字符，确保只替换独立的占位符
    // - 'g'：全局替换，替换所有匹配项
    // - '$1'：保留前面的行首或空白字符
    // 示例：将 'primary' 替换为 '#409eff'
    cssText = cssText.replace(
      new RegExp('(^|\\s+)' + key, 'g'),
      '$1' + colors[key]
    )
  })

  // --- 步骤 4：返回最终 CSS ---
  return cssText
}

// ============================================================
// 第四步：将新样式写入页面
// ============================================================

/**
 * 将生成的新样式写入到页面中
 * @param {string} elNewStyle - 完整的 CSS 文本
 * @param {boolean} isNewStyleTag - 是否生成新的 style 标签（预留参数，当前未使用）
 *
 * 执行流程：
 * 1. 创建一个新的 <style> 标签
 * 2. 将 CSS 文本设置为标签的 innerHTML
 * 3. 将标签追加到 <head> 中
 *
 * 注意：由于每次都会创建新的 style 标签，旧样式会被覆盖
 * 如需删除旧标签，可在此函数中添加清理逻辑
 */
export const writeNewStyle = elNewStyle => {
  // 创建 style DOM 元素
  const style = document.createElement('style')

  // 将生成的 CSS 文本放入 style 标签
  style.innerHTML = elNewStyle

  // 将 style 标签追加到页面头部
  // 新样式会覆盖之前同名的样式定义
  document.head.appendChild(style)
}
