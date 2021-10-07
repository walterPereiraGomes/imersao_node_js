const Commander = require('commander')
const Database = require('./database')
const options = Commander.opts();
const Heroi = require('./heroi')

const cleanObject = (obj) => {
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj
}

const showHeroesOrdained = (listHero) => {
    console.log('##### Lista de herois #####');
    const result = listHero.map(hero => 
        `Id: ${hero.id}; Name: ${hero.nome}; Skill: ${hero.poder}`
    ).join('\n --------------- \n');
    console.log(result);
}

async function main() {
    Commander.version("v1")
    .option("-n, --name [value]", "Name of hero")
    .option("-p, --power [value]", "Power of Hero")
    .option("-i, --id [value]", "Id of Hero")
    .option("-c, --create", "Create a Hero")
    .option("-l --list", "list list a or more heroes")
    .option("-u --update [value]", "update a hero")
    .option("-r --remove", "remove hero by id");
    Commander.parse(process.argv);

    const heroi = new Heroi(options)

    try{
        if(options.create) {
            const maxId = await Database.getMaxId()
            const result = await Database.cadastrar({...heroi, id: maxId + 1})
            if(!result) {
                console.log('hero not created!!');
                return;
            }

            console.log('hero created with success!! ')
            return;
        }

        if(options.list) {
            const result = await Database.listar()
            showHeroesOrdained(result)
            return;
        }

        if(options.remove) {
            const {id} = heroi
            const result = await Database.remover(id)
            if(!result) {
                console.log('Error Ocurrent for remove the!!');
            }
            console.log('Hero removed with success!!');
            return
        }
        if(options.update) {
            const updatedId = parseInt(options.update)
            const result = await Database.atualizar(updatedId, cleanObject(heroi))
            if(!result) {
                console.log('an error has occurred while updating the hero :>> ');
            }
            console.log('Hero updated with success!!');
        }

    } catch(e) {
        console.log('e :>> ', e);
    }
}

main()