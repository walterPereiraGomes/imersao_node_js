const Mongoose = require('mongoose')
const IDb = require('./interfaces/InterfaceCrud')

const STATUS = {
    0: 'disconnect',
    1: 'connected',
    2: 'connecting',
    3: 'disconnected'
}

class MongoDB extends IDb {
    constructor() {
        super()
        this.driver = null
        this._heroes = null
        this._connect()
    }

    defineModel() {
        const heroSchema = new Mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            skill: {
                type: String,
                required: true
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }
        })
        
        this._heroes = Mongoose.model('herois', heroSchema)
    }

    async _connect() {
        await Mongoose.connect('mongodb://walter2:senhaforte@localhost:27017/herois', 
            { useNewUrlParser: true}, (error) => {
                if(!error) return;
                console.log('fail to connect!', error)
            })
        this.driver = Mongoose.connection
        this.defineModel()
    }

    async isConnected() {
        const connection = Mongoose.connection
        const state = STATUS[connection.readyState]

        if(state !== 'connecting') return state
        await new Promise(resolve => setTimeout(resolve, 1000))
        return STATUS[connection.readyState]
    }

    async create(item) {
        return await this._heroes.create(item)
    }

}

module.exports = MongoDB;