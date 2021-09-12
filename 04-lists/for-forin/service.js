const axios = require('axios')
const URL = `https://swapi.dev/api/people`

async function obterPessoas(nome) {
    return await require("@pipedreamhq/platform").axios(this, {
        url: `${URL}/?search=${nome}&format=json`,
      })
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