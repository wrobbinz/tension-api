# 🔩 Tension API

- [Getting Started](#getting-started)
- [Commands](#commands)

## Getting Started

### Install Dependencies

```bash
$ git clone git@github.com:wrobbinz/tension-api.git
$ cd tension-api
$ npm install
$ touch server/.env
```

### Set up Env file

Open `.env` in your editor of choice and fill in the variables there.

Example:

```bash
#  DotEnv: https://github.com/motdotla/dotenv
PORT=4000
NODE_ENV=development
JWT_SECRET=tension
DB_USER=tension
DB_PASSWORD=tension
DB_HOST=localhost
DB_NAME=tension
API_PREFIX=/api/v0
```

### Set up Database

Install PostgreSQL ([Postgres App](https://postgresapp.com/) recommended). Create a new database, a new user, and install the [`citext`](https://nandovieira.com/using-insensitive-case-columns-in-postgresql-with-citext) extension.

```bash
$ createdb tension
$ psql postgres
>>> \connect tension
>>> CREATE EXTENSION IF NOT EXISTS citext;
>>> \dx
>>> CREATE USER tension;
>>> \q
```

### Start Server

```bash
$ npm start
```

### Explore API

#### API Docs

Open [http://0.0.0.0:4000/documentation](http://0.0.0.0:4000/documentation) (assuming you used port 4000 in your .env file) in a web browser for API documentation.

#### GraphiQl

Open [http://0.0.0.0:4000/graphiql](http://0.0.0.0:4000/graphiql) to visually experiment with graphql.

## Commands

### Server

- `npm start`

### Testing

- `npm test`
- `npm run lint`

### Development

#### Hapi-Pal CLI

- `npx hpal make route <name>`
- `npx hpal make model <name>`

##### Database

- `npx knex migrate:rollback`
- `npx knex migrate:latest`
- `npx knex migrate:make migration_name`
- `npx knex seed:make seed_name`
