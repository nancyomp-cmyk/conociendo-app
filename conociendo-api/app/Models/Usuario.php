<?php
// =====================================================
// Modelo: Usuario
// Proyecto: Conociendo.com - Backend Laravel
// Descripcion: Representa un usuario registrado
// Evidencia: GA8-220501096-AA1-EV01
// =====================================================

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Usuario extends Authenticatable
{
    // Nombre de la tabla en la base de datos
    protected $table = 'usuarios';

    // Campos que se pueden llenar masivamente
    protected $fillable = [
        'nombre',
        'email',
        'password',
    ];

    // Campos que NUNCA se retornan en respuestas JSON
    protected $hidden = [
        'password',
    ];
}
