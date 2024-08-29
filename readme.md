push image: docker push ibrahimjamil/producer:latest
create secret: kubectl create secret generic producer-secret --from-env-file=.env
docker build: docker build -t ibrahimjamil/producer:latest ./producer
docker run: docker run --env-file .env --name producer-container ibrahimjamil/producer:latest

EKS cluster - name: Create EKS Cluster
run: |
eksctl create cluster \
 --name pubsub-cluster \
 --region ${{ secrets.AWS_REGION }} \
 --version 1.30 \
 --nodegroup-name ng-default \
 --node-type t3.small \
 --nodes 2 \
 --managed
