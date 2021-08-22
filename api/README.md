### Rotas da API
| HTTP Method	| Path | Action | Scope | Desciption  |
| ----- | ----- | ----- | ---- |------------- |
| GET      | /developers      | index  | developers:list   | Retorna todos os desenvolvedores
| GET      | /developers/?    | index  | developers:read   | Retorna os desenvolvedores de acordo com o termo passado via querystring e paginação
| GET      | /developers/{id} | index  | developers:read   | Retorna os dados de um desenvolvedor
| POST     | /developers      | store  | developers:create | Adiciona um novo desenvolvedor
| PUT      | /developers/{id} | update | developers:write  | Atualiza os dados de um desenvolvedor
| DELETE   | /developers/{id} | delete | developers:delete | Apaga o registro de um desenvolvedor