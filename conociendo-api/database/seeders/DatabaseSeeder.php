<?php

// =====================================================
// Archivo: DatabaseSeeder.php
// Proyecto: Conociendo.com - Backend Laravel
// Descripcion: Seeder principal que ejecuta todos los
//              seeders del proyecto
// =====================================================

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Ejecuta todos los seeders del proyecto.
     * Llama al DestinoSeeder para insertar
     * los destinos turisticos de prueba.
     */
    public function run(): void
    {
        $this->call([
            DestinoSeeder::class,
        ]);
    }
}
