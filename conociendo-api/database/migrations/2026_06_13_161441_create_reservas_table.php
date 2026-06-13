<?php
// =====================================================
// Migracion: create_reservas_table
// Proyecto: Conociendo.com - Backend Laravel
// Descripcion: Crea la tabla de reservas turisticas
// Estados posibles: PENDIENTE, CONFIRMADA, COMPLETADA, CANCELADA
// Evidencia: GA8-220501096-AA1-EV01
// =====================================================

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservas', function (Blueprint $table) {
            $table->id();
            $table->string('codigo_reserva', 30)->unique();
            $table->string('email_usuario', 120);
            $table->string('nombre_usuario', 100);
            // Relacion con la tabla destinos
            $table->foreignId('destino_id')
                  ->constrained('destinos')
                  ->onDelete('restrict');
            $table->date('fecha_viaje');
            $table->integer('cantidad_personas')->default(1);
            $table->decimal('valor_total', 12, 2);
            // Estado del ciclo de vida de la reserva
            $table->enum('estado', [
                'PENDIENTE',
                'CONFIRMADA',
                'COMPLETADA',
                'CANCELADA'
            ])->default('PENDIENTE');
            $table->string('observaciones', 500)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservas');
    }
};
