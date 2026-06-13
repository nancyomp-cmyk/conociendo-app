<?php
// =====================================================
// Archivo: api.php
// Proyecto: Conociendo.com - Backend Laravel
// Descripcion: Define todas las rutas del API REST
// URL base: http://localhost:8000/api
//
// MODULO AUTH:
//   POST /api/auth/registro
//   POST /api/auth/login
//   GET  /api/auth/estado
//
// MODULO DESTINOS:
//   GET    /api/destinos
//   GET    /api/destinos/{id}
//   POST   /api/destinos
//   PUT    /api/destinos/{id}
//   DELETE /api/destinos/{id}
//
// MODULO RESERVAS:
//   GET    /api/reservas
//   GET    /api/reservas/{id}
//   GET    /api/reservas/usuario/{email}
//   POST   /api/reservas
//   PUT    /api/reservas/{id}/estado
//   DELETE /api/reservas/{id}
// =====================================================

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DestinoController;
use App\Http\Controllers\Api\ReservaController;

// ── MÓDULO AUTENTICACIÓN ──────────────────────────
Route::prefix('auth')->group(function () {
    Route::post('/registro', [AuthController::class, 'registro']);
    Route::post('/login',    [AuthController::class, 'login']);
    Route::get('/estado',    [AuthController::class, 'estado']);
});

// ── MÓDULO DESTINOS ───────────────────────────────
Route::prefix('destinos')->group(function () {
    Route::get('/',     [DestinoController::class, 'index']);
    Route::get('/{id}', [DestinoController::class, 'show']);
    Route::post('/',    [DestinoController::class, 'store']);
    Route::put('/{id}', [DestinoController::class, 'update']);
    Route::delete('/{id}', [DestinoController::class, 'destroy']);
});

// ── MÓDULO RESERVAS ───────────────────────────────
Route::prefix('reservas')->group(function () {
    Route::get('/',                      [ReservaController::class, 'index']);
    Route::get('/usuario/{email}',       [ReservaController::class, 'porUsuario']);
    Route::get('/{id}',                  [ReservaController::class, 'show']);
    Route::post('/',                     [ReservaController::class, 'store']);
    Route::put('/{id}/estado',           [ReservaController::class, 'actualizarEstado']);
    Route::delete('/{id}',              [ReservaController::class, 'destroy']);
});
