const assert = require('assert')
const Mongodb = require('./../db/strategies/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context(new Mongodb())

const MOCK_HERO_CREATE = {
    name: 'Todoroki',
    skill: 'Ice and Fire'
}
describe('MongoDB sequence tests', () => {
    it('TEST 1 - verify connection', async() => {
        const result = await context.isConnected()
        assert.equal('connected', result)
    })
    it.only('TEST 2 - Create a hero', async () => {
        const {name, skill} = await context.create(MOCK_HERO_CREATE)
        assert.deepEqual(MOCK_HERO_CREATE, {name, skill})
    })
})