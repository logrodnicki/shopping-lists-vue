// eslint-disable-next-line no-undef
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'eslint-config-prettier'
  ],
  rules: {
    'vue/multi-word-component-names': 0,
    'semi': [2, 'always'],
    'no-unused-vars': 0
  },
  env: {
    node: true
  },
  parserOptions: {
    "parser": "@typescript-eslint/parser"
  }
};