const {
    readFile,
    writeFile,
} = require('fs')

const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {
    constructor() {
        this.NOME_ARQUIVO = 'herois.json'
    }

    async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }
    async escreverArquivo(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
    }

    async cadastrar({id, nome, poder}) {
        const dados = await this.obterDadosArquivo()
        const ordainedHero = {id, nome, poder}
        const dadosFinal = [
            ...dados,
            ordainedHero
        ]
        const resultado = await this.escreverArquivo(dadosFinal)
        return resultado;
    }
    async listar(id) {
        const dados = await this.obterDadosArquivo()
        const dadosFiltrados = dados.filter(item => id ? (item.id === id) : true)
        return dadosFiltrados
    }

    async remover(id) {
        if(!id) {
            return await this.escreverArquivo([])
        }
        const dados = await this.obterDadosArquivo()
        const indiceExcluir = dados.findIndex(item => item.id === parseInt(id))
        if(indiceExcluir === -1) {
            throw Error('O usuario informado nao existe')
        }
        dados.splice(indiceExcluir, 1)
        return await this.escreverArquivo(dados)
    }

    async atualizar(id, modificacoes) {
        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))
        if(indice === -1) {
            throw Error('O usuario a ser editado nao existe')
        }

        const atual = dados[indice]
        const objetoAtualizar = {
            ...atual,
            ...modificacoes
        }

        dados.splice(indice, 1)
        return await this.escreverArquivo([
            ...dados,
            objetoAtualizar
        ])
    }

    async getMaxId() {
        const dados = await this.obterDadosArquivo()
        return dados.length > 0 ? (Math.max.apply(Math, dados.map((o) => o.id))) : 0
    }
}

module.exports = new Database()