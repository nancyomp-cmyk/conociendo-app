<?php
// =====================================================
// Modelo: Reserva
// Proyecto: Conociendo.com - Backend Laravel
// Descripcion: Representa una reserva turistica
// Estados: PENDIENTE, CONFIRMADA, COMPLETADA, CANCELADA
// =====================================================

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    protected $table = 'reservas';

    protected $fillable = [
        'codigo_reserva',
        'email_usuario',
        'nombre_usuario',
        'destino_id',
        'fecha_viaje',
        'cantidad_personas',
        'valor_total',
        'estado',
        'observaciones',
    ];

    protected $casts = [
        'fecha_viaje'  => 'date',
        'valor_total'  => 'decimal:2',
    ];

    /**
     * Relacion: Una reserva pertenece a un destino.
     * Permite acceder a: $reserva->destino->nombre
     */
    public function destino()
    {
        return $this->belongsTo(Destino::class, 'destino_id');
    }

    /**
     * Genera el codigo unico de reserva antes de guardar.
     * Formato: RES-1234567890
     */
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($reserva) {
            $reserva->codigo_reserva = 'RES-' . time();
        });
    }
}
