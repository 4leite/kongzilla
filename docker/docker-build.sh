#!/bin/bash

docker build --file docker/Dockerfile --rm --squash --network=host --tag kongzilla:latest .

echo Run using \"docker run -e API_HOST=http://localhost:8001 --detach --rm -p 8080:80 --name kongzilla kongzilla:latest\"