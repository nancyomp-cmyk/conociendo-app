<?php
// =====================================================
// Seeder: DestinoSeeder
// Proyecto: Conociendo.com - Backend Laravel
// Descripcion: Inserta destinos turisticos de prueba
// =====================================================

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DestinoSeeder extends Seeder
{
    /**
     * Inserta destinos turisticos colombianos de prueba
     * para verificar el funcionamiento del API.
     */
    public function run(): void
    {
        $destinos = [
            [
                'nombre'      => 'Ciudad Amurallada de Cartagena',
                'descripcion' => 'Centro histórico declarado Patrimonio de la Humanidad por la UNESCO. Plazas coloniales, iglesias barrocas y coloridas casas con balcones floridos.',
                'pais'        => 'Colombia',
                'ciudad'      => 'Cartagena de Indias',
                'precio'      => 850000.00,
                'categoria'   => 'CULTURAL',
                'activo'      => true,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'nombre'      => 'Parque Nacional Natural Tayrona',
                'descripcion' => 'Combina bosque tropical húmedo con playas paradisíacas de aguas cristalinas. Ideal para senderismo y avistamiento de fauna silvestre.',
                'pais'        => 'Colombia',
                'ciudad'      => 'Santa Marta',
                'precio'      => 620000.00,
                'categoria'   => 'ECOTURISMO',
                'activo'      => true,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'nombre'      => 'Valle del Cocora',
                'descripcion' => 'Hogar de la palma de cera, árbol nacional de Colombia. Paisajes de niebla y montañas verdes ideales para senderismo.',
                'pais'        => 'Colombia',
                'ciudad'      => 'Salento',
                'precio'      => 480000.00,
                'categoria'   => 'AVENTURA',
                'activo'      => true,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'nombre'      => 'San Andrés Isla',
                'descripcion' => 'Paraíso caribeño con el famoso Mar de los Siete Colores. Arrecifes de coral, snorkel y playas de arena blanca.',
                'pais'        => 'Colombia',
                'ciudad'      => 'San Andrés',
                'precio'      => 1200000.00,
                'categoria'   => 'PLAYA',
                'activo'      => true,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'nombre'      => 'Medellín — Ciudad de la Eterna Primavera',
                'descripcion' => 'Ciudad innovadora elegida la más innovadora del mundo. Metrocable, museos, parques y gastronomía excepcional.',
                'pais'        => 'Colombia',
                'ciudad'      => 'Medellín',
                'precio'      => 540000.00,
                'categoria'   => 'CIUDAD',
                'activo'      => true,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
        ];

        DB::table('destinos')->insert($destinos);
    }
}
