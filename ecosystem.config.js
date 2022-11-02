module.exports = {
  apps: [
    {
      name: 'lbrygen-nuxt',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
