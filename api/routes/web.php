<?php

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('/developers[/{id:[0-9]+}]', ['uses' => 'DevelopersController@index']);
$router->post('/developers', ['uses' => 'DevelopersController@store']);
$router->put('/developers/{id:[0-9]+}', ['uses' => 'DevelopersController@update']);
$router->delete('/developers/{id:[0-9]+}', ['uses' => 'DevelopersController@delete']);