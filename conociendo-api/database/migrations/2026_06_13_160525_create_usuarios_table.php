<?php
// =====================================================
// Migracion: create_usuarios_table
// Proyecto: Conociendo.com - Backend Laravel
// Descripcion: Crea la tabla de usuarios del sistema
// =====================================================

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Crea la tabla 'usuarios' en la base de datos.
     * Almacena los datos de registro e inicio de sesion.
     */
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 100);
            $table->string('email', 120)->unique();
            $table->string('password', 255);
            $table->timestamps();
        });
    }

    /**
     * Elimina la tabla si se revierte la migracion.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
