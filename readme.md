push image: docker push ibrahimjamil/producer:latest
create secret: kubectl create secret generic producer-secret --from-env-file=.env
docker build: docker build -t ibrahimjamil/producer:latest ./producer
docker run: docker run --env-file .env --name producer-container ibrahimjamil/producer:latest
