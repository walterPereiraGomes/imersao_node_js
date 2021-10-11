const assert = require('assert')
const Postgres = require('./../db/strategies/postgres')
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HERO_REGISTERED = {
    name: 'Mineta',
    skill: 'sticky'
}
const MOCK_HERO_UPDATE = {
    name: 'kirishima',
    skill: 'Strong'
}

const MOCK_HERO_DELETE = {
    name: 'Tokoyami',
    skill: 'Black Raven'
}

describe('Postgres Strategy', function() {
    before(async () => {
        await context.create(MOCK_HERO_UPDATE)
        await context.create(MOCK_HERO_DELETE)
    })
    this.timeout(Infinity)
    it('TEST 1 - connection with postgres', async function () {
        const result = await context.isConnected()
        assert.equal(result, true)
    })
    it('TEST 2 - Create a Hero', async function () {
        const newHero = await context.create(MOCK_HERO_REGISTERED)
        delete newHero.id
        assert.deepEqual(MOCK_HERO_REGISTERED, newHero)
    })
    it('TEST 3 - listing heroes', async () => {
        const [result] =  await context.read({ name: MOCK_HERO_REGISTERED.name})
        delete result.id
        assert.deepEqual(result, MOCK_HERO_REGISTERED)
    })
    it('TEST 4 - update the hero', async () => {
        const [item] = await context.read({name: MOCK_HERO_UPDATE.name})

        const newHero = {
            ...MOCK_HERO_UPDATE,
            name: 'Sado'
        }
        const [statusRequest] = await context.update(item.id, newHero)
        if(statusRequest !== 1) {
            assert.ok(0)
        }
        const [itemUpdated] = await context.read({id: item.id})
        assert.deepEqual(itemUpdated.name, newHero.name)
    })
    it('TEST 5 - delete a hero', async () => {
        const [heroToBeDeleted] = await context.read({name: MOCK_HERO_DELETE.name})
        await context.delete(heroToBeDeleted.id);
        const heroDeleted = await context.read({id: heroToBeDeleted.id})
        assert.equal(heroDeleted.length, 0)
    })
})