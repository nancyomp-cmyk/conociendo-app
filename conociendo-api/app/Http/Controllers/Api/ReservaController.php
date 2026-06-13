<?php
// =====================================================
// Controlador: ReservaController
// Proyecto: Conociendo.com - Backend Laravel
// Descripcion: CRUD completo de reservas turisticas
// Endpoints:
//   GET    /api/reservas                  → Listar reservas
//   GET    /api/reservas/{id}             → Ver reserva
//   GET    /api/reservas/usuario/{email}  → Por usuario
//   POST   /api/reservas                  → Crear reserva
//   PUT    /api/reservas/{id}/estado      → Cambiar estado
//   DELETE /api/reservas/{id}             → Eliminar reserva
// Evidencia: GA8-220501096-AA1-EV01
// =====================================================

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Destino;
use App\Models\Reserva;
use Illuminate\Http\Request;

class ReservaController extends Controller
{
    /**
     * GET /api/reservas
     * Lista todas las reservas con datos del destino incluidos.
     */
    public function index()
    {
        $reservas = Reserva::with('destino')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($reservas, 200);
    }

    /**
     * GET /api/reservas/{id}
     * Retorna una reserva especifica con su destino.
     */
    public function show($id)
    {
        $reserva = Reserva::with('destino')->find($id);

        if (!$reserva) {
            return response()->json([
                'error' => "Reserva no encontrada con ID: {$id}"
            ], 404);
        }

        return response()->json($reserva, 200);
    }

    /**
     * GET /api/reservas/usuario/{email}
     * Lista las reservas de un usuario especifico.
     */
    public function porUsuario($email)
    {
        $reservas = Reserva::with('destino')
            ->where('email_usuario', $email)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($reservas, 200);
    }

    /**
     * POST /api/reservas
     * Crea una nueva reserva turistica.
     * Calcula el valor total automaticamente.
     *
     * Body esperado:
     * { "email_usuario": "...", "nombre_usuario": "...",
     *   "destino_id": 1, "fecha_viaje": "2026-12-15",
     *   "cantidad_personas": 2, "observaciones": "..." }
     */
    public function store(Request $request)
    {
        $request->validate([
            'email_usuario'    => 'required|email|max:120',
            'nombre_usuario'   => 'required|string|max:100',
            'destino_id'       => 'required|integer',
            'fecha_viaje'      => 'required|date|after:today',
            'cantidad_personas'=> 'required|integer|min:1|max:20',
            'observaciones'    => 'nullable|string|max:500',
        ]);

        // Verificar que el destino existe y está activo
        $destino = Destino::find($request->destino_id);

        if (!$destino) {
            return response()->json([
                'error' => "Destino no encontrado con ID: {$request->destino_id}"
            ], 400);
        }

        if (!$destino->activo) {
            return response()->json([
                'error' => "El destino '{$destino->nombre}' no está disponible."
            ], 400);
        }

        // Calcular valor total: precio x personas
        $valorTotal = $destino->precio * $request->cantidad_personas;

        $reserva = Reserva::create([
            'email_usuario'    => $request->email_usuario,
            'nombre_usuario'   => $request->nombre_usuario,
            'destino_id'       => $request->destino_id,
            'fecha_viaje'      => $request->fecha_viaje,
            'cantidad_personas'=> $request->cantidad_personas,
            'valor_total'      => $valorTotal,
            'estado'           => 'PENDIENTE',
            'observaciones'    => $request->observaciones,
        ]);

        // Retornar la reserva con los datos del destino incluidos
        return response()->json(
            $reserva->load('destino'),
            201
        );
    }

    /**
     * PUT /api/reservas/{id}/estado
     * Actualiza el estado de una reserva.
     * Estados validos: PENDIENTE, CONFIRMADA, COMPLETADA, CANCELADA
     */
    public function actualizarEstado(Request $request, $id)
    {
        $estadosValidos = ['PENDIENTE', 'CONFIRMADA', 'COMPLETADA', 'CANCELADA'];

        $request->validate([
            'estado' => 'required|string|in:' . implode(',', $estadosValidos),
        ]);

        $reserva = Reserva::find($id);

        if (!$reserva) {
            return response()->json([
                'error' => "Reserva no encontrada con ID: {$id}"
            ], 404);
        }

        if ($reserva->estado === 'COMPLETADA') {
            return response()->json([
                'error' => 'No se puede modificar una reserva COMPLETADA.'
            ], 400);
        }

        $reserva->update(['estado' => strtoupper($request->estado)]);

        return response()->json($reserva->load('destino'), 200);
    }

    /**
     * DELETE /api/reservas/{id}
     * Elimina una reserva. Solo si está CANCELADA.
     */
    public function destroy($id)
    {
        $reserva = Reserva::find($id);

        if (!$reserva) {
            return response()->json([
                'error' => "Reserva no encontrada con ID: {$id}"
            ], 404);
        }

        if ($reserva->estado !== 'CANCELADA') {
            return response()->json([
                'error' => 'Solo se pueden eliminar reservas en estado CANCELADA.'
            ], 400);
        }

        $reserva->delete();

        return response()->json([
            'mensaje' => 'Reserva eliminada correctamente.'
        ], 200);
    }
}
