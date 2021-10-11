const ICrud = require('./interfaces/InterfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud {
    constructor() {
        super()
        this.driver = null
        this._heroes = null
        this._connect()
    }

    _connect() {
        this.driver = new Sequelize(
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
        this.defineModel()
    }

    async defineModel() {
        this._heroes = this.driver.define('heroes', {
            id: {
                type: Sequelize.INTEGER,
                required: 1,
                primaryKey: 1,
                autoIncrement: 1
            },
            name: {
                type: Sequelize.STRING,
                required: 1
            },
            skill: {
                type: Sequelize.STRING,
                required: 1
            }
        }, {
            tableName: 'heroes',
            freezeTableName: 0,
            timestamps: 0,
            createdAt: 0,
            updatedAt: 0
        })

        await this._heroes.sync()
    }

    async isConnected() {
        try {
            await this.driver.authenticate()
            return true
        } catch(error) {
            console.log('fail -> ', error)
        }
    }

    async create(item) {
        const {dataValues: newHero} = await this._heroes.create(item);
        return newHero
    }

    async read(params = {}) {
        return await this._heroes.findAll({ raw: true, where: params})
    }
    async update(id, newHero) {
        if(!id || !newHero)
            console.error('Invalid Parameters!')
        return await this._heroes.update(newHero, {where: {id: id}})
    }

    async delete(id) {
        return await this._heroes.destroy({where: { id }})
    }
}

module.exports = Postgres