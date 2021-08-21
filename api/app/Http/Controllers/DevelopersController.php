<?php
namespace App\Http\Controllers;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Request;

use App\Models\Developers;

class DevelopersController extends Controller
{
    public function index(Request $request, $id = null)
    {
        $developers = new Developers;
        if (!is_null($id)) {
            return $developers::findOrFail($id);
        } elseif (empty($request->query())) {
            return $developers::all();
        } else {
            $validated = $this->validate($request, [
                'nome'           => 'string|max:200|regex:/^[a-zA-Z\s]*$/',
                'sexo'           => 'string|max:1|in:F,M,N',
                'hobby'          => 'max:200',
                'datanascimento' => 'date',
                'idade'          => 'integer|min:1',
                'pageLimit'      => 'integer|min:1|max:30',
            ]);
            $conditions = [];
            if (isset($validated['id'])) {
                array_push($conditions, ['id', $validated['id']]);
            }
            if (isset($validated['nome'])) {
                array_push($conditions, ['nome', 'like', '%' . $validated['nome'] . '%']);
            }
            if (isset($validated['sexo'])) {
                array_push($conditions, ['sexo', $validated['sexo']]);
            }
            if (isset($validated['hobby'])) {
                array_push($conditions, ['hobby', 'like', '%' . $validated['hobby'] . '%']);
            }
            if (isset($validated['datanascimento'])) {
                array_push($conditions, ['datanascimento', $validated['datanascimento']]);
            }
            if (isset($validated['idade'])) {
                array_push($conditions, ['idade', $validated['idade']]);
            }
            $pageLimit = 5;
            if (isset($validated['pageLimit'])) {
                $pageLimit = $validated['pageLimit']; 
            }
            $result = Developers::where($conditions)->paginate($pageLimit);
            return $result;
        }
    }

    public function store(Request $request)
    {       
        $validated = $this->validate($request, [
            'nome'           => 'required|string|max:200|regex:/^[a-zA-Z\s]*$/',
            'sexo'           => 'required|string|max:1|in:F,M,N',
            'hobby'          => 'nullable|max:200',
            'datanascimento' => 'required|date',
        ]);     
        
        try {
            $validated['idade'] = date_diff(date_create(), date_create($validated['datanascimento']))->y;
            Developers::create(array_map('trim', $validated));
            return response()->json(['success' => 'desenvolvedor cadastrado'], 201);
        } catch (\Exception $e) {
            abort(400);
        }
    }

    public function update(Request $request, $id)
    {
        $validated = $this->validate($request, [
            'nome'           => 'string|max:200|regex:/^[a-zA-Z\s]*$/',
            'sexo'           => 'string|max:1|in:F,M,N',
            'hobby'          => 'nullable|max:200',
            'datanascimento' => 'date',
        ]);
        try {
            if (isset($validated['datanascimento'])) {
                $validated['idade'] = date_diff(date_create(), date_create($validated['datanascimento']))->y;
            }
            $developer = new Developers;
            $developer::where('id', $id)->update(array_map('trim', $validated));
            return response()->json(['success' => 'desenvolvedor atualizado'], 200);
        } catch (\Exception $e) {
            abort(400);
        }
    }

    public function delete($id)
    {
        try {
            $developer = Developers::findOrFail($id);
            $developer->delete();
            return response()->json([], 204);
        } catch (\Exception $e) {
            abort(400);
        }
    }
}
