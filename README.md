# Library of Alexandria

## Description

An Application to

## Installation

First we need to create an alias for the local port 127.0.0.1 to use in the mongo replicas with the Docker images:

```bash
# Open hosts file to edit
$ sudo nano /etc/hosts
```

Edit file:

```txt
  //...
  # docker network
  127.0.0.1      mongo1 mongo2 mongo3
```

On the first use of application, we need create the docker container. Run the following:

```bash
npm run exec:start-replicas
```

> if you get an error, like "permission denied", just run
>
> `chmod 777 -R .docker`

Before init the application, add `.env` file to root folder copying from `.env.example` file

Now, generate schema changes:

```bash
npm run prisma:generate
```

```bash
npm install
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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Alexandria is [MIT licensed](LICENSE).
