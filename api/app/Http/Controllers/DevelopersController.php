<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\Developers;

class DevelopersController extends Controller
{
    public function __construct()
    {
    }

    public function index(Request $request, $id = null)
    {
        //dd($request, $id);
        //$result = DB::table('developers')->get();
        $developers = Developers::all();
        return $developers->toJson();
    }

    public function store()
    {
        return json_encode(['post'=>'Adiciona um novo desenvolvedor']);
    }

    public function update($id)
    {        
        $result = ['put'=>'Atualiza os dados de um desenvolvedor', 'id' => $id];
        return $result;
    }

    public function delete($id)
    {
        $result = ['delete'=>'Apaga o registro de um desenvolvedor', 'id' => $id];
        return $result;
    }
}
