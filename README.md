# PotentialApp

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

PotentialApp foi desenvolvido para atender os requisitos apresentados na prova de recrutamento.

## Tecnologias utilizadas
- [Lumen](https://lumen.laravel.com/)
- [REACT](https://pt-br.reactjs.org/)
- [MySQL](https://www.mysql.com/)
- [NGINX](https://www.nginx.com/)
- [Docker](https://www.docker.com/)

## Instalação

PotentialApp necessita:
> [Node.js](https://nodejs.org/).
> [Lumen](https://lumen.laravel.com/).

Instale as dependências.

```sh
cd dillinger
npm i
node app
```

For production environments...

```sh
npm install --production
NODE_ENV=production node app
```

## Docker

Dillinger is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image.

```sh
cd dillinger
docker build -t <youruser>/dillinger:${package.json.version} .
```

This will create the dillinger image and pull in the necessary dependencies.
Be sure to swap out `${package.json.version}` with the actual
version of Dillinger.

Once done, run the Docker image and map the port to whatever you wish on
your host. In this example, we simply map port 8000 of the host to
port 8080 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 --restart=always --cap-add=SYS_ADMIN --name=dillinger <youruser>/dillinger:${package.json.version}
```

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:8000
```
<!-- 
# Potential App
Aplicação desenvolvida para atender os requisitos apresentados
na prova de recrutamento Gazin Tech 2021


### Backend
desenvolvido utilizando o framework Lumen (PHP)

##### Start
cd ./api/
composer install

###### dev
php -S localhost:8000 -t public

### Frontend
desenvolvido utilizando o framework REACT (JavaScript)
-->