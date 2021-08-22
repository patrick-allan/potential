# PotentialApp

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

PotentialApp foi desenvolvido para atender os requisitos apresentados na prova de recrutamento.

### Tecnologias utilizadas
- [Lumen](https://lumen.laravel.com/)
- [REACT](https://pt-br.reactjs.org/)
- [MySQL](https://www.mysql.com/)
- [NGINX](https://www.nginx.com/)
- [Docker](https://www.docker.com/)

## Instalação

Primeiro, clone o repositório:
```bash
$ git clone https://github.com/patrick-allan/potential.git
```
### Back-end | REST API - Lumen 8

- Developers Resource
- Validações
- Paginação
- Manipulação de dados via Model
- Tratamento de erros
- [CORS](https://github.com/barryvdh/laravel-cors) Support

- Instale as dependências.
```
$ cd potential/api
$ composer install
```
##### Requisito
 - Banco de dados MySQL

#### Configure as variáveis de ambiente
- Crie o arquivo `.env`
```
$ cat .env.example > .env
```
- Configure todas as variáveis no arquivo `.env`.

- Crie a tabela developers no banco de dados.
```
$ php artisan migrate --seed
```
- Inicie o back-end:
```
 php -S localhost:8000 -t public
```

### Front-end | REACT

- Instale as dependências.
```
$ cd potential/api
$ npm install
```
- Inicie o front-end:
```
$ npm start
```

### Docker - apenas desenvolvimento
docker-compose build && docker-compose up -d