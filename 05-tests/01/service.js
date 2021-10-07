const { get } = require('axios')
const URL = `https://swapi.dev/api/people`

async function obterPessoas(nome) {
    const result = await get(`${URL}/?search=${nome}&format=json`)
    return result
    // return await require("@pipedreamhq/platform").axios(this, {
    //     url: `${URL}/?search=${nome}&format=json`,
    //   })
}

// obterPessoas('r2')
// .then((resultado) => {
//     console.log('resultado :>> ', resultado);
// })
// .catch((erro) => {
//     console.log('deu ruim :>> ');
// })

module.exports = {
    obterPessoas
}