const ICrud = require('./interfaces/InterfaceCrud')

class Postgres extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        return 'instance Postgres';
    }
}

module.exports = Postgres