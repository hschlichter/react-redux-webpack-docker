# React-Redux-Webpack-Docker

This application is using docker. So if you haven't installed it, goto here.

https://www.docker.com/products/docker-toolbox

```sh
# Build
$ docker-compose build

# Run dev
$ docker-compose up
```

To build a production build it composes config files.

```sh
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml build
```

Inside the docker container the application is using Node LTS. Use this to check the version.

```sh
# Check version.
$ node -v
```

You can grab the latest stable version from here.

https://nodejs.org/en/

or install through your favorite package manager.

