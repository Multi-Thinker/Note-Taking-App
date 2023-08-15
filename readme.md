# Note Taking API

Welcome to the Note Taking API documentation. This API provides functionality for note management, user authentication, and more. Below, you'll find information about the project structure, available commands, and key features.

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
- [Commands](#commands)
- [Routes](#routes)
- [Tech Stack](#tech-stack)
- [Docker](#docker)

## Project Structure

The project follows the following directory structure:

```
/src
/src/controllers # Contains route handlers
/src/models # Sequelize models and database relations
/src/utils # Utilities and shared resources
/src/middleware # Middleware for route protection
/src/types # TypeScript interfaces
/src/config # Environment configuration
/__tests__ # Unit tests
/migrations # Sequelize migrations
/seeders # Sequelize seeders
```

## Getting Started

### Installation


1. Install dependencies:
`yarn install`
2. Running: 
`yarn start`

# Environment Configuration
Create environment files for production and testing:

`.env.prod` for production environment configuration.
`.env.test` for testing environment configuration.
Example `.env.prod` content:

```
MYSQL_ROOT_PASSWORD=password
MYSQL_DATABASE=database
MYSQL_USER=user
MYSQL_PASSWORD=password
MYSQL_PORT=3316

JWT_SECRET=blahBlahBlahBlahBlahBlahBlahBlahBlahBlah
NODE_ENV=prod
PORT=3000
```

Example `.env.test` content:

```
MYSQL_ROOT_PASSWORD=password
MYSQL_DATABASE=database
MYSQL_USER=user
MYSQL_PASSWORD=password
MYSQL_PORT=3317

JWT_SECRET=blahBlahBlahBlahBlahBlahBlahBlahBlahBlah
NODE_ENV=test
PORT=3001
```


# Commands
- yarn prepare:prod - Flush, migrate, and seed the production database.
- yarn prepare:test - Flush, migrate, and seed the test database.
- yarn migrate:test - Migrate the test database.
- yarn seed:test - Seed the test database.
- yarn pretest - Flush and synchronize the test database.
- yarn flushdb:test - Flush and recreate the test database.
- yarn flushdb:prod - Flush and recreate the production database.
- yarn test - Run all tests.
- yarn undo:seed - Undo seed in production.
- yarn undo:migration - Undo migration in production.
- yarn undo:seed:test - Undo seed in test.
- yarn undo:migrate:test - Undo migration in test.
- yarn migrate:test:status - View migration status for test.
- yarn migrate:prod:status - View migration status for production.
- yarn start - Launch the Express server.


# Routes
See the API [Documentation](/api_docs) for detailed information about each route, request payloads, responses, and authentication requirements.

## Tech stack

- redis
- swagger
- express.js
- sequelize
- docker
- jwt
- jest / ts-jest
- node / ts-node
- supertest
- tsconfig
- prettier
- yarn
- dotenv


### API:

#### Auth

- /user/login <-- username, password
  - returns token to be used for secure requests
- /user/register <-- username, password
  - returns token to be used for secure requests

#### Notes

- GET /notes/ <-- all notes\*
- GET /notes/:id <-- specific note\*
- POST /notes/ <-- create note
- DELETE /notes/:id <-- delete note
- PUT /notes/:id <-- update note

`*` = Redis Enabled

### how to test

`yarn test` on `<root>`

### how is the test performed

- test database is migrated and seeded before tests
- test is ran against http requests for both auth and note routes
- the note route keep track and verify the session on each test
- the database and redis is flushed upon test end
- the environment is dictated by dotenv

### how is docker setup-ed

- we have two databases
  - these databases are read by `.env` files
  - test database is only used and flushed during tests
  - prod database is preserved and not flushed until user operation

### how is dotenv setup-ed

- we are using `dotenv-cli`
- we have `.env.test` `.env.prod` `.env` files
  - `.env` files is used `docker-compose.yml` as it is higher level and global
  - `.env.test` and `.env-prod` is hand-picked against the `NODE_ENV` or `package.scripts` so we are served these environment for ideal development playground

### how is migration & seed setup-id

- we have `migration` and `seed` inside the `backend`
  - you can refer to `package.scripts` to see possible operations we can run
  - to run migration we can do `yarn migrate` or `yarn migrate:test` or `yarn preparedb:prod` or `yarn preparedb:test`
  - to run seed we can do `yarn seed` or `yarn seed:test` or `yarn preparedb:prod` or `yarn preparedb:test` 
  - to undo migration we can do `yarn undo:migrate`
  - to undo seed we can do `yarn undo:seed`


# Docker 
 to run you can install via `docker-compose up -d` 
 it will install the following
 - mysql:5 for testing and production use
 - redis 

 you can unmount/stop/down the docker services via 
 `docker-compose down --remove-orphans` 

you can make use of `Dockerfile` to build the while app to deploy/host/execute as portable. 
or simply run `yarn start` 
