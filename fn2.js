const async = require('async')

module.exports = (callback) => {
  let tentativas = 0
  console.log('- FN2 executada')
  const run = () => {
    async.series(
      [
        (done) => {
          console.log('-> fn2.1')
          setTimeout(() => {
            done()
          }, 500)
        },
        (done) => {
          console.log('-> fn2.2')
          setTimeout(() => {
            done()
          }, 500)
        },
        (done) => {
          console.log('-> fn2.3')
          async.retry(
            { times: 3, interval: 500 },
            async () => {
              try {
                console.log('Tentando...')
                throw new Error('Falhou no passo FN2->fn2.3...')
              } catch (error) {
                throw new Error(error.message)
              }
            },
            (err, res) => {
              if (err) done(err)
              else done()
            }
          )
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
