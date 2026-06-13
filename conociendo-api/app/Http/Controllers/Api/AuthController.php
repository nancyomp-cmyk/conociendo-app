<?php
// =====================================================
// Controlador: AuthController
// Proyecto: Conociendo.com - Backend Laravel
// Descripcion: Gestiona registro e inicio de sesion
// Endpoints:
//   POST /api/auth/registro → Registrar usuario
//   POST /api/auth/login    → Iniciar sesion
//   GET  /api/auth/estado   → Estado del servicio
// =====================================================

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * POST /api/auth/registro
     * Registra un nuevo usuario en el sistema.
     *
     * Body esperado:
     * { "nombre": "Nancy", "email": "nancy@email.com", "password": "123456" }
     *
     * Respuesta exitosa (201):
     * { "exitoso": true, "mensaje": "Registro exitoso..." }
     *
     * Respuesta error (409):
     * { "exitoso": false, "mensaje": "El email ya está registrado" }
     */
    public function registro(Request $request)
    {
        // Validar que los campos requeridos lleguen correctamente
        $request->validate([
            'nombre'   => 'required|string|max:100',
            'email'    => 'required|email|max:120',
            'password' => 'required|string|min:6',
        ]);

        // Verificar si el email ya está registrado
        if (Usuario::where('email', $request->email)->exists()) {
            return response()->json([
                'exitoso' => false,
                'mensaje' => "Error en el registro: el email '{$request->email}' ya está registrado.",
                'email'   => null,
                'nombre'  => null,
            ], 409);
        }

        // Crear el usuario con la contraseña cifrada con BCrypt
        $usuario = Usuario::create([
            'nombre'   => $request->nombre,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'exitoso' => true,
            'mensaje' => "Registro exitoso. Bienvenida a Conociendo.com, {$usuario->nombre}!",
            'email'   => $usuario->email,
            'nombre'  => $usuario->nombre,
        ], 201);
    }

    /**
     * POST /api/auth/login
     * Autentica un usuario con email y contraseña.
     *
     * Body esperado:
     * { "email": "nancy@email.com", "password": "123456" }
     *
     * Respuesta exitosa (200):
     * { "exitoso": true, "mensaje": "Autenticacion satisfactoria..." }
     *
     * Respuesta error (401):
     * { "exitoso": false, "mensaje": "Error en la autenticacion..." }
     */
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        // Buscar el usuario por email
        $usuario = Usuario::where('email', $request->email)->first();

        // Verificar que existe y que la contraseña es correcta
        if (!$usuario || !Hash::check($request->password, $usuario->password)) {
            return response()->json([
                'exitoso' => false,
                'mensaje' => 'Error en la autenticación: credenciales incorrectas.',
                'email'   => null,
                'nombre'  => null,
            ], 401);
        }

        return response()->json([
            'exitoso' => true,
            'mensaje' => "Autenticación satisfactoria. Bienvenida, {$usuario->nombre}!",
            'email'   => $usuario->email,
            'nombre'  => $usuario->nombre,
        ], 200);
    }

    /**
     * GET /api/auth/estado
     * Verifica que el servicio web está activo.
     */
    public function estado()
    {
        return response()->json([
            'estado'    => 'activo',
            'mensaje'   => 'Servicio web de Conociendo.com activo en puerto 8000',
            'version'   => '1.0.0',
            'framework' => 'Laravel ' . app()->version(),
        ], 200);
    }
}
