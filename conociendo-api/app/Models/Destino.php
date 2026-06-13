<?php
// =====================================================
// Modelo: Destino
// Proyecto: Conociendo.com - Backend Laravel
// Descripcion: Representa un destino turistico
// =====================================================

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destino extends Model
{
    protected $table = 'destinos';

    protected $fillable = [
        'nombre',
        'descripcion',
        'pais',
        'ciudad',
        'precio',
        'categoria',
        'imagen_url',
        'activo',
    ];

    // Convertir tipos de datos automaticamente
    protected $casts = [
        'precio' => 'decimal:2',
        'activo' => 'boolean',
    ];

    /**
     * Relacion: Un destino puede tener muchas reservas.
     */
    public function reservas()
    {
        return $this->hasMany(Reserva::class, 'destino_id');
    }

    /**
     * Scope: Filtra solo los destinos activos.
     * Uso: Destino::activos()->get()
     */
    public function scopeActivos($query)
    {
        return $query->where('activo', true);
    }
}
