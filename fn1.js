const async = require('async')

module.exports = (callback) => {
  let tentativas = 0
  console.log('- FN1 executada')
  const run = () => {
    async.series(
      [
        (done) => {
          console.log('-> fn1.1')
          setTimeout(() => {
            done()
          }, 500)
        },
        (done) => {
          console.log('-> fn1.2')
          setTimeout(() => {
            done()
          }, 500)
        },
        (done) => {
          console.log('-> fn1.3')
          setTimeout(() => {
            done()
          }, 500)
        }
      ],
      (err, data) => {
        if (err) {
          if (tentativas < 3) {
            tentativas++
            console.log('Ocorreu um problema: ' + err + '\nTentando novamente...')
            run()
          } else {
            console.log('Muitos erros seguidos. Cancelando a operação...')
            callback(err)
          }
        } else {
          callback()
        }
      }
    )
  }
  run()
}
