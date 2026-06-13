<?php
// =====================================================
// Controlador: DestinoController
// Proyecto: Conociendo.com - Backend Laravel
// Descripcion: CRUD completo de destinos turisticos
// Endpoints:
//   GET    /api/destinos      → Listar destinos activos
//   GET    /api/destinos/{id} → Ver destino por ID
//   POST   /api/destinos      → Crear destino
//   PUT    /api/destinos/{id} → Actualizar destino
//   DELETE /api/destinos/{id} → Eliminar destino
// =====================================================

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Destino;
use Illuminate\Http\Request;

class DestinoController extends Controller
{
    /**
     * GET /api/destinos
     * Lista todos los destinos activos disponibles.
     */
    public function index()
    {
        $destinos = Destino::activos()
            ->orderBy('nombre')
            ->get();

        return response()->json($destinos, 200);
    }

    /**
     * GET /api/destinos/{id}
     * Retorna los datos de un destino especifico.
     */
    public function show(int $id)
    {
        $destino = Destino::find($id);

        if (!$destino) {
            return response()->json([
                'error' => "Destino no encontrado con ID: {$id}"
            ], 404);
        }

        return response()->json($destino, 200);
    }

    /**
     * POST /api/destinos
     * Crea un nuevo destino turistico.
     *
     * Body esperado:
     * { "nombre": "...", "descripcion": "...", "pais": "...",
     *   "ciudad": "...", "precio": 500000, "categoria": "PLAYA" }
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre'      => 'required|string|max:150',
            'descripcion' => 'required|string',
            'pais'        => 'required|string|max:100',
            'ciudad'      => 'required|string|max:100',
            'precio'      => 'required|numeric|min:0.01',
            'categoria'   => 'required|string|max:50',
            'imagen_url'  => 'nullable|string|max:255',
        ]);

        // Verificar que no exista un destino duplicado
        $existe = Destino::where('nombre', $request->nombre)
            ->where('ciudad', $request->ciudad)
            ->exists();

        if ($existe) {
            return response()->json([
                'error' => "Ya existe un destino llamado '{$request->nombre}' en '{$request->ciudad}'."
            ], 400);
        }

        $destino = Destino::create([
            'nombre'      => $request->nombre,
            'descripcion' => $request->descripcion,
            'pais'        => $request->pais,
            'ciudad'      => $request->ciudad,
            'precio'      => $request->precio,
            'categoria'   => $request->categoria,
            'imagen_url'  => $request->imagen_url,
            'activo'      => true,
        ]);

        return response()->json($destino, 201);
    }

    /**
     * PUT /api/destinos/{id}
     * Actualiza los datos de un destino existente.
     */
    public function update(Request $request, int $id)
    {
        $destino = Destino::find($id);

        if (!$destino) {
            return response()->json([
                'error' => "Destino no encontrado con ID: {$id}"
            ], 404);
        }

        $request->validate([
            'nombre'      => 'required|string|max:150',
            'descripcion' => 'required|string',
            'pais'        => 'required|string|max:100',
            'ciudad'      => 'required|string|max:100',
            'precio'      => 'required|numeric|min:0.01',
            'categoria'   => 'required|string|max:50',
        ]);

        $destino->update($request->all());

        return response()->json($destino, 200);
    }

    /**
     * DELETE /api/destinos/{id}
     * Elimina un destino del sistema.
     */
    public function destroy(int $id)
    {
        $destino = Destino::find($id);

        if (!$destino) {
            return response()->json([
                'error' => "Destino no encontrado con ID: {$id}"
            ], 404);
        }

        $destino->delete();

        return response()->json([
            'mensaje' => 'Destino eliminado correctamente.'
        ], 200);
    }
}
