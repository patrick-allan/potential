<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Developers extends Model
{
    protected $table      = 'developers';
    protected $primaryKey = 'id';
    
    public $timestamps = false;

    protected $fillable = [
        'nome',
        'sexo',
        'idade',
        'hobby',
        'datanascimento',
    ];
}
