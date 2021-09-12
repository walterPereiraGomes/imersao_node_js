const service = require('./service')

Array.prototype.meuMap = function (callback) {
    const novoArrayMapeado = []
    for(let i =0; i <= this.length -1; i++) {
        const resultado = callback(this[i], i);
        novoArrayMapeado.push(resultado)
    }

    return novoArrayMapeado;
}

async function main() {
    try {
        const result = await service.obterPessoas('a')
        // const names = [];
        // result.results.forEach(pessoa => {
        //     names.push(pessoa.name)
        // });

        // const names = result.results.map(pessoa => pessoa.name)

        const names = result.results.meuMap((pessoa, indice) => {
            console.log('pessoa :>> ', pessoa.name);
        })

        // console.log('names :>> ', names);
    } catch(error) {
        console.log('error :>> ', error);
    }
}

main()