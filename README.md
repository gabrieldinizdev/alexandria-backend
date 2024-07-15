# Library of Alexandria

## Description

An Application to

## Installation

On the first use of application, we need create the docker container. Run the following:

```bash
npm run exec:start-replicas
```

> if you get an error, like "permission denied", just run
>
> `chmod 777 -R .docker`

Before init the application, add `.env` file to root folder copying from `.env.example` file

Now, pull db changes:

```bash
npm run prisma:pull
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
