docker run --name cryptfolio-postgres -e POSTGRES_USER=cryptfolio -e POSTGRES_PASSWORD=testpassword -p 5432:5432 -d postgres
docker exec -it cryptfolio-postgres psql -U cryptfolio

docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=testpassword postgres
docker exec -it postgres psql -U postgres

TODO: Add holding, update holding (sell or buy), implement coin selected with coingecko api?