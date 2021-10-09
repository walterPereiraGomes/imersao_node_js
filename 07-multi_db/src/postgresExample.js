// npm install sequelize (esse é o ORM)
// npm install pg-hstore pq (são drivers de conexão com o banco)

const Sequelize = require('sequelize')

const driver = new Sequelize(
    'heroes',
    'walter',
    'senhaforte',
    {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false
    }
)

async function main() {
    const Herois = driver.define('herois', {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING,
            required: true
        },
        poder: {
            type: Sequelize.STRING,
            required: true
        }
    }, {
        tableName: 'herois',
        freezeTableName: false,
        timestamps: false
    })

    await Herois.sync()
    await Herois.create({
        nome: 'Hawks',
        poder: 'Penas'
    })

    const result = await Herois.findAll({ raw: true, attributes: ['nome']})

    console.log('result => ', result)
}

main()