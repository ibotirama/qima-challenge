#!/bin/bash
./mvnw clean package
docker-compose build
