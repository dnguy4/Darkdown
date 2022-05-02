const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "Darkdown",
    themeColor: "#2c3e50",
    start_url: "/"
  }
})