/*
    0 - obter um usuario
    1 - numero do usuario apartir do id
    2 - obter o endereco do usuario pelo id
*/

const util = require('util');
const obterUsuarioAsync = util.promisify(obterUsuario);
const obterTelefoneAsync = util.promisify(obterTelefone);
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario(callback) {
    setTimeout(function () {
        return callback(null, {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 1000);
}

function obterTelefone(idUsuario, callback) {
    setTimeout(function () {
        return callback(null, {
            ddd: 35,
            numero: '99706-3546'
        })
    }, 2000);
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'sdasdsadsa',
            numero: '0'
        })
    }, 2000);
}

function executaComCallback() {
    obterUsuario((erro, usuario) => {
        if(erro) {
            console.error('erro no usuario!')
            return;
        }
    
        obterTelefone(usuario.id, (erro1, telefone) => {
            if(erro1) {
                console.log('erro no telefone');
                return;
            }
            obterEndereco(usuario.id, (erro2, endereco) => {
                if(erro) {
                    console.log('deu ruim no endereco');
                    return;
                }
                console.log(`
                    ----------TRATANDO COM CALLBACK----------
                    Nome: ${usuario.nome},
                    Telefone: (${telefone.ddd})${telefone.numero},
                    Endereco: ${endereco.rua}, ${endereco.numero}
                `);
                
            })
        })
    });
}

function executaComPromise() {
    const usuarioPromise = obterUsuarioAsync()
    usuarioPromise
        .then(usuario => {
            return obterTelefoneAsync(usuario.id)
            .then(result => {
                return {
                    usuario: {
                        id: usuario.id,
                        nome: usuario.nome,
                    },
                    telefone: result
                }
            })
        })
        .then((resultado) => {
            return obterEnderecoAsync(resultado.usuario.id)
            .then(endereco => {
                return {
                    usuario: resultado.usuario,
                    telefone: resultado.telefone,
                    endereco
                }
           })
        })
        .then(resposta => {
            console.log(`
                ----------TRATANDO COM PROMISE----------
                Nome: ${resposta.usuario.nome},
                Telefone: (${resposta.telefone.ddd})${resposta.telefone.numero},
                Endereco: ${resposta.endereco.rua}, ${resposta.endereco.numero}
            `);
        })
        .catch(erro => {
            console.log('erro => ', erro);
        });
}

const promisseTelefoneEndereco = (idUsuario) => Promise.allSettled([obterTelefoneAsync(idUsuario), obterEnderecoAsync(idUsuario)]);
async function executaComAsyncAwait() {
    try{
        console.time('tempo-walter');
        const usuario = await obterUsuarioAsync();
        const telefoneEndereco = await promisseTelefoneEndereco(usuario.id);
        const telefone = telefoneEndereco[0].value;
        const endereco = telefoneEndereco[1].value;

        console.log(`
            ----------TRATANDO COM PROMISE----------
            Nome: ${usuario.nome},
            Telefone: (${telefone.ddd})${telefone.numero},
            Endereco: ${endereco.rua}, ${endereco.numero}
        `);

        console.timeEnd('tempo-walter');

    } catch(error) {
        console.log('Deu ruim :>> ', error);
    }
}

/*
TIPOS
    1 = callback,
    2 = Promise,
    3 = async/await
*/
const tipoExecucao = 3;
if(tipoExecucao === 1) {
    executaComCallback();
} else if(tipoExecucao == 2) {
    executaComPromise();
} else if(tipoExecucao == 3) {
    executaComAsyncAwait();
}