const service = require('./service')

Array.prototype.newFilter = function(callback) {
    let newArray = []
    this.forEach((item, index) => {
        if(callback(item, index)) {
            newArray.push(item)
        }
    })

    return newArray
}

async function main() {
    try{
        const { 
            data: { 
                results
            }
        } = await service.obterPessoas('a')
        const tallPeople = results.newFilter(people => parseInt(people.height) > 200);
        const shortPeople = results.filter(people => parseInt(people.height) < 170);
        console.log('pessoas altas :>> ', tallPeople.map(people => people.name));
        console.log('pessoas baixas :>> ', shortPeople.map(people => people.name));
    } catch (e) {
        console.error(e)
    }
}

main()