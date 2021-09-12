const service = require('./service')

async function main() {
    try {
        const result = await service.obterPessoas('a');
        console.time('tempo_for')
        const pessoas = result.results.map(pessoa => pessoa.name);
        console.log('pessoas :>> ', pessoas);
        // let names = []
        // for(let i = 0; i <= result.results.length -1; i++) {
        //     names.push(result.results[i].name);
        // }
        // console.log('names :>> ', names);
        console.timeEnd('tempo_for');
    } catch(e) {
        console.log('erro interno :>> ', e);
    }
}

main()