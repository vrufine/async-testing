const async = require('async')

const fn1 = require('./fn1')
const fn2 = require('./fn2')

const autoBuild = () => {
  let tentativas = 0
  const run = () => {
    console.log(`\n------------ INICIO GERAL: Tentativa ${tentativas} ------------`)
    async.series(
      [
        done => fn1(done),
        done => fn2(done)
      ],
      (err, data) => {
        if (err) {
          console.log('=> Erro no autobuild: ' + err)
          if (tentativas < 1) {
            tentativas++
            console.log(`=> Tentativa ${tentativas} de 1...`)
            run()
          } else {
            console.log('=> Muitas tentativas falharam... Cancelando o processo!')
          }
        } else {
          console.log('------------ CONCLUSÃO GERAL ------------')
        }
      }
    )
  }
  run()
}

autoBuild()
