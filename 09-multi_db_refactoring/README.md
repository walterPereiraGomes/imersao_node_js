-- POSTGRES
    docker run --name meu-postgres -e POSTGRES_USER=walter -e POSTGRES_PASSWORD=senhaforte -e POSTGRES_DB=heroes -p 5432:5432 -d postgres

    docker run --name adminer -p 8080:8080 --link postgres:postgres -d adminer

-- MONGODB
docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=walter -e MONGO_INITDB_ROOT_PASSWORD=senhaforte -d mongo

docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -e MONGO_URL=mongodb://walter:senhaforte@mongodb:27017 -d mongoclient/mongoclient

docker exec -it mongodb /bin/bash

mongo --host localhost -u walter -p senhaforte --authenticationDatabase admin --eval "db.getSiblingDB('herois').createUser({user: 'walter2', pwd: 'senhaforte', roles: [{role: 'readWrite', db: 'herois'}]})"