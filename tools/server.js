const apiServer = require('./api-server') 
const devServer = require('./dev-server')

devServer.listen(8080)
apiServer.listen(3000)