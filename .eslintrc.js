module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue-scoped-css/vue3-recommended',
    'prettier'
    // 'plugin:vue/vue3-essential',
    // 'plugin:vue/vue3-strongly-recommended',
    // 'eslint-config-prettier'
  ],
  rules: {
    'vue/multi-word-component-names': 0,
    semi: [2, 'always'],
    'no-unused-vars': 0,
    'vue-scoped-css/no-unused-selector': 0,
    'vue-scoped-css/no-parsing-error': 1,
    'vue-scoped-css/enforce-style-type': 0
  },
  env: {
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
};
