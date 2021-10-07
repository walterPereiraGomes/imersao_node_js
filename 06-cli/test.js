const {deepEqual, ok} = require('assert')

const DEFAULT_ITEM_CADASTRADO = {
    nome: 'Katsuki Bakugou',
    poder: 'Explosão',
    id: 1
}

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Midorya Izuku',
    poder: 'One For All',
    id: 2
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Todoroki Shoto',
    poder: 'Fogo e Gelo',
    id: 3
}

const database = require('./database')

describe('Suite de manipulação de Heróis', function() {
    before(async () => {
        await database.remover()
        await database.cadastrar(DEFAULT_ITEM_CADASTRADO)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })
    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRADO
        const [resultado] = await database.listar(expected.id)

        deepEqual(resultado, expected)
    })
    it('deve cadastrar um heroi, usando arquivos', async() => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)

        deepEqual(actual, expected)
    })
    it('deve remover um heroi por id', async () => {
        const expected = true;
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRADO.id)
        
        deepEqual(resultado, expected)
    })
    it.only('deve atualizar um heroi pelo id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Mineta',
            poder: 'Grudar'
        }

        const novoDado = {
            nome: 'Mineta',
            poder: 'Grudar'
        }

        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
        deepEqual(resultado, expected)
    })
})