module.exports = {
  env: {
    production: {
      plugins: ['transform-remove-console']
    }
  },
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
