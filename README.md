
# Payment Gateway [W]

## Entity Relationship Diagram
Link to the [Entity Relationship Diagram](https://dbdiagram.io/d/65a5cd90ac844320aefb0211)

## Description
This project implements the [W] API as a payment gateway. It includes basic registration and login functionalities with JWT and Bearer token to secure endpoints. Additionally, it features a credit card tokenizer, acceptance token, unique payment reference generator, and payment source ID. The implementation is based on NestJS with PostgreSQL and utilizes a Docker instance to simplify installation. Swagger is employed for local documentation of the application's endpoints.

## System Requirements
- Node.js 20.10.0
- PostgreSQL 16.1.0
- Docker 20.10.22

## Installation

```bash
$ npm install
```
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Configuration [DOCKER]

```bash
$ docker compose up -d
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Collection postman
Don't forget to import [project.postman_collection.json] for testing.

## Deploy

The [W] API has been deployed on Amazon Web Services (AWS) using an EC2 instance with Ubuntu. Please note that, due to being a free-tier instance, it does not have an SSL certificate. You can access the API through this link.
http://ec2-54-221-103-90.compute-1.amazonaws.com/api

## Documentación Swagger
Detailed documentation of the application's endpoints is available at
```bash
$ npm run start:dev
```
http://localhost:5000/docs


## License

Nest is [MIT licensed](LICENSE).
