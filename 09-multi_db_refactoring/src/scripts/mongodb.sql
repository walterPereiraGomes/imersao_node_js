docker ps
docker exec -it e92b3a10e2d0
    mongo -u walter2 -p senhaforte --authenticationDatabase herois

    show dbs // mostra os databases
    use herois // seleciona um database
    show collection // mostra as coleções ( tabelas )

db.herois.insert({
    name: 'Bakugou Katsuki',
    skill: 'explosion',
    birthDate: '1997-07-09'
})

for(let i = 0; i<= 1000; i++) {
    db.herois.insert({
        name: 'Naruto',
        skill: 'bushin',
        birthDate: '1997-07-09'
    })
}

db.herois.find({}, {skill: 1, _id: 0})

// create
db.herois.insert({
    name: 'Bakugou Katsuki',
    skill: 'explosion',
    birthDate: '1997-07-09'
})

//read
db.herois.find()
db.herois.find({name: 'Bakugou Katsuki'})

// update
db.herois.update({_id: ObjectId("61632c577613577bda5adc87")}, { name: 'Bakugou', skill: 'katsu'}) // assim ele troca todo registro no banco
db.herois.update({_id: ObjectId("61632c577613577bda5adc87")}, {$set: {name: 'Luffy'}})

// delete
db.herois.remove({})