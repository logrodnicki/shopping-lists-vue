// eslint-disable-next-line no-undef
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'eslint-config-prettier'
  ],
  rules: {
    'vue/multi-word-component-names': 0
  },
  env: {
    node: true
  }
}