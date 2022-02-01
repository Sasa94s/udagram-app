# Udagram Image Filtering Application

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

The project is split into two parts:
1. [Frontend](./udagram-frontend) - Angular web application built with Ionic Framework
2. [Backend RESTful API](./udagram-api) - Node-Express application
   1. [Feed Service](./udagram-api/feed-service)
   2. [Users Service](./udagram-api/users-service)

### Prerequisite
1. Docker. To be able to set up the project locally you need to download and install [Docker](https://www.docker.com/products/docker-desktop) 
2. Environment variables will need to be set. These environment variables include database connection details that should not be hard-coded into the application code.

## Getting Started
> _tip_: it's recommended that you start with getting the backend API running since the frontend web application depends on the API.

### Setting up your own project

Please follow [Instructions](./GUIDE.md) manual, you can find step-by-step guide to build up your own platform.

To run the whole project `backend`, `frontend` and `reverse-proxy`. 

#### Environment Script
A file named `set_env.sh` can be found in [`users-service`](./udagram-api/users-service) or [`feed-service`](./udagram-api/feed-service) has been prepared as an optional tool to help you configure these variables on your local development environment.

Firstly, set up your environment variables:
```shell
source set_env.sh
```

Then build docker images and run the containers as below:
```shell
docker-compose -f docker-compose-build.yaml build --parallel
docker-compose up
```
