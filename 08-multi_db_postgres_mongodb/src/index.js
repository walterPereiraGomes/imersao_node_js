const mongoDB = require('./db/strategies/mongodb')
const postgS = require('./db/strategies/postgres')
const ContextStrategy = require('./db/strategies/base/contextStrategy');

const instanceMongo = new ContextStrategy(new mongoDB())
console.log(instanceMongo.create())


const InstancePostgres = new ContextStrategy( new postgS())
console.log(InstancePostgres.create())

