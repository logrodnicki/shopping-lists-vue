// eslint-disable-next-line no-undef
module.exports = {
  extends: [
    // 'plugin:vue/vue3-essential',
    // 'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier'
    // 'eslint-config-prettier'
  ],
  rules: {
    'vue/multi-word-component-names': 0,
    semi: [2, 'always'],
    'no-unused-vars': 0,
    'vue-scoped-css/no-unused-selector': 0
  },
  env: {
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
};
