import bodyParser from 'body-parser'

module.exports = function(options = {}) {

  function start({ app }, cb) {

    app.use(bodyParser.json())

    cb()
  }

  return {
    start
  }
}
