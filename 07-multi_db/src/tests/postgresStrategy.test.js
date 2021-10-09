const assert = require('assert')
const Postgres = require('./../db/strategies/postgres')
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HERO_REGISTERED = {
    nome: 'Mineta',
    poder: 'sticky'
}

describe('Postgres Strategy', function() {
    this.timeout(Infinity)
    it('PostgresSQL connection', async function () {
        const result = await context.isConnected()
        assert.equal(result, true)
    })
    it('Create', async function () {
        const newHero = await context.create(MOCK_HERO_REGISTERED)
        delete newHero.id
        assert.deepEqual(MOCK_HERO_REGISTERED, newHero)
    })
    it.only('list', async () => {
        const [result] =  await context.read({ nome: MOCK_HERO_REGISTERED.nome})
        delete result.id
        assert.deepEqual(result, MOCK_HERO_REGISTERED)
    })
})