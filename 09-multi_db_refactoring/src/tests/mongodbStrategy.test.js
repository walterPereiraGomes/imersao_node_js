const assert = require('assert')
const Mongodb = require('./../db/strategies/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context(new Mongodb())

const MOCK_HERO_CREATE = {
    name: 'Todoroki',
    skill: 'Ice and Fire'
}
let MOCK_HERO_UPDATE = {
    name: 'Lida',
    skill: 'Speed'
}
let MOCK_HERO_TO_BE_DELETED = {
    name: 'All Might',
    skill: 'One for All'
}
describe('MongoDB sequence tests', function () {
    before(async() => {
        const {_id} = await context.create(MOCK_HERO_UPDATE)
        MOCK_HERO_UPDATE = {
            ...MOCK_HERO_UPDATE,
            _id
        }
        const {_id: _id_deleted} = await context.create(MOCK_HERO_TO_BE_DELETED)
        MOCK_HERO_TO_BE_DELETED = {
            ...MOCK_HERO_TO_BE_DELETED,
            _id: _id_deleted
        }
    })
    it('TEST 1 - verify connection', async() => {
        const result = await context.isConnected()
        assert.equal('connected', result)
    })
    it('TEST 2 - Create a hero', async () => {
        const {name, skill} = await context.create(MOCK_HERO_CREATE)
        assert.deepEqual(MOCK_HERO_CREATE, {name, skill})
    })
    it('TEST 3 - Read a list of hero', async () => {
        const [{name, skill}] = await context.read({name: MOCK_HERO_CREATE.name}, 0, 2)
        const result = {name, skill}

        assert.deepEqual(result, MOCK_HERO_CREATE)
    })
    it('TEST 4 - Update a hero', async () => {
        const {modifiedCount} = await context.update(MOCK_HERO_UPDATE._id, { $set: { name: 'Minato' } })
        assert.equal(modifiedCount, 1)
    })
    it('TEST 5 - Delete a hero', async () => {
        const {deletedCount} = await context.delete(MOCK_HERO_TO_BE_DELETED._id)
        assert.equal(deletedCount, 1)
    })
})