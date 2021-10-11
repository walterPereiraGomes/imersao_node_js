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
    const Heroes = driver.define('heroes', {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            required: true
        },
        skill: {
            type: Sequelize.STRING,
            required: true
        }
    }, {
        tableName: 'heroes',
        freezeTableName: false,
        timestamps: false
    })

    await Heroes.sync()
    await Heroes.create({
        nome: 'Hawks',
        poder: 'Penas'
    })

    const result = await Heroes.findAll({ raw: true, attributes: ['name']})

    console.log('result => ', result)
}

main()