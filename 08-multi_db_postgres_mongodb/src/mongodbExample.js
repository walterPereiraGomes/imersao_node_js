const Mongoose = require('mongoose')

Mongoose.connect('mongodb://walter2:senhaforte@localhost:27017/herois', 
    { useNewUrlParser: true}, (error) => {
        if(!error) return;
        console.log('fail to connect!', error)
    })

const connection = Mongoose.connection

connection.once('open', () => console.log('database is running'))

// setTimeout(() => {
//     const state = Mongoose.connection.readyState
    
//     console.log('state :>> ', state);
// }, 1000)

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

const model = Mongoose.model('herois', heroSchema)

async function main() {
    // create item
    const resultCreated = await model.create({
        name: 'Midorya',
        skill: 'One for All'
    })

    console.log('result created', resultCreated)

    // read itens

    const listItens = await model.find()
    console.log('itens--> ', listItens)

}

main()

/*
 0: disconnect
 1: connected
 2: connecting
 3: disconnected
*/