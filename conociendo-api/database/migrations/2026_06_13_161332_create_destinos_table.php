<?php
// =====================================================
// Migracion: create_destinos_table
// Proyecto: Conociendo.com - Backend Laravel
// Descripcion: Crea la tabla de destinos turisticos
// =====================================================

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('destinos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 150);
            $table->text('descripcion');
            $table->string('pais', 100);
            $table->string('ciudad', 100);
            $table->decimal('precio', 10, 2);
            // Categorias: PLAYA, MONTANA, CIUDAD, CULTURAL, AVENTURA, ECOTURISMO
            $table->string('categoria', 50);
            $table->string('imagen_url', 255)->nullable();
            $table->boolean('activo')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('destinos');
    }
};
