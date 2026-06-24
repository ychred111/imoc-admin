module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 1,
    quotes: 'warn', // 引号不规范时警告（你图中选的是这个）
    semi: 'error', // 分号不规范时报错
    indent: ['error', 2] // 缩进必须为2个空格，否则报错
  }
}
