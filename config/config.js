module.exports = {
    development: {
      root: require('path').normalize(__dirname + '/..'),
      app: {
        name: 'api-template'
      },
      
      db: 'mongodb://localhost/test'
 	},
 	production: {
      root: require('path').normalize(__dirname + '/..'),
      app: {
        name: 'api-template'
      },
      db: 'mongodb://localhost/test'
 	}

}