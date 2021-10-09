const IDb = require('./interfaces/InterfaceCrud')

class MongoDB extends IDb {
    constructor() {
        super()
    }
    create(item) {
        return 'mongo instance';
      }

}

module.exports = MongoDB;