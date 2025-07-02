<?php

namespace Database\Seeders;

use App\Models\Articulo;
use App\Models\User;
use Illuminate\Database\Seeder;

class ArticuloSeeder extends Seeder
{
    public function run(): void
    {

        $user = User::where('email', 'demo@pedidosqr.com')->first();

        // Estas imagenes deben estar en storage/app/public/articulos
        $imagenes = [
            'hamburguesa.jpg',
            'patatas_fritas.webp',
            'helado.jpg',
        ];
        
        // Datos de prueba
        $productosSinImagen = [
            [
                'nombre' => 'Paella Valenciana',
                'precio' => 16.50,
                'descripcion' => 'Tradicional arroz español cocinado lentamente con pollo, conejo, judías verdes y garrofón en un caldo casero, aromatizado con azafrán para un sabor auténtico y profundamente mediterráneo.',
            ],
            [
                'nombre' => 'Ensalada Mediterránea',
                'precio' => 9.20,
                'descripcion' => 'Mezcla fresca de lechugas, tomates cherry, pepino, cebolla roja y aceitunas negras, aderezada con aceite de oliva virgen extra y un toque de orégano para una experiencia ligera pero llena de sabor.',
            ],
            [
                'nombre' => 'Tortilla Española',
                'precio' => 7.80,
                'descripcion' => 'Clásica tortilla de patatas con cebolla caramelizada, cocinada lentamente para conseguir un interior jugoso y un sabor casero irresistible, ideal para compartir o disfrutar individualmente.',
            ],
            [
                'nombre' => 'Croquetas Caseras de Jamón',
                'precio' => 6.50,
                'descripcion' => 'Seis croquetas artesanas elaboradas con bechamel cremosa y trocitos de jamón serrano de calidad, con un rebozado crujiente y dorado que las convierte en un entrante irresistible.',
            ],
            [
                'nombre' => 'Calamares a la Romana',
                'precio' => 11.00,
                'descripcion' => 'Anillas de calamar fresco rebozadas en una mezcla especial de harina y especias, fritas a la perfección para un resultado crujiente por fuera y tierno por dentro, servidas con rodajas de limón.',
            ],
            [
                'nombre' => 'Hamburguesa Gourmet',
                'precio' => 13.90,
                'descripcion' => 'Jugosa hamburguesa de ternera 100 % con queso cheddar fundido, cebolla caramelizada, tomate fresco, lechuga y salsa especial de la casa, servida en pan artesano ligeramente tostado.',
            ],
            [
                'nombre' => 'Pizza Cuatro Quesos',
                'precio' => 12.80,
                'descripcion' => 'Base fina y crujiente cubierta con una mezcla equilibrada de mozzarella, gorgonzola, parmesano y queso de cabra, creando una combinación de sabores intensos y perfectamente fundidos.',
            ],
            [
                'nombre' => 'Pollo al Curry con Arroz Basmati',
                'precio' => 14.30,
                'descripcion' => 'Tiernos trozos de pechuga de pollo cocinados en una cremosa salsa de curry suave con especias aromáticas, acompañados de arroz basmati suelto y fragante para un toque exótico.',
            ],
            [
                'nombre' => 'Tarta de Queso al Horno',
                'precio' => 5.90,
                'descripcion' => 'Deliciosa tarta de queso horneada lentamente para lograr una textura cremosa y ligera, con base de galleta y un toque de mermelada de frutos rojos que equilibra a la perfección el dulzor.',
            ],
            [
                'nombre' => 'Brownie con Helado de Vainilla',
                'precio' => 6.20,
                'descripcion' => 'Brownie de chocolate negro con nueces, horneado para mantener un interior húmedo y denso, servido con una bola de helado de vainilla y salsa de chocolate caliente.',
            ],
            [
                'nombre' => 'Flan Casero de Huevo',
                'precio' => 4.50,
                'descripcion' => 'Postre tradicional elaborado con huevos frescos, leche y azúcar, cocido al baño maría para una textura suave y cremosa, acompañado de su característico caramelo líquido.',
            ],
            [
                'nombre' => 'Cerveza Artesanal',
                'precio' => 3.80,
                'descripcion' => 'Cerveza rubia de producción local con notas florales y frutales, cuerpo medio y un final refrescante, perfecta para acompañar cualquier plato de nuestra carta.',
            ],
            [
                'nombre' => 'Refresco Natural de Limón',
                'precio' => 2.50,
                'descripcion' => 'Bebida refrescante elaborada con jugo de limón natural, ligeramente endulzada y con un toque de gas para ofrecer una experiencia revitalizante en cualquier momento del día.',
            ],
            [
                'nombre' => 'Copa de Vino Tinto Crianza',
                'precio' => 4.20,
                'descripcion' => 'Vino tinto de crianza con aromas a frutos rojos y notas especiadas, madurado en barrica para conseguir un sabor redondo y elegante que marida perfectamente con carnes y quesos.',
            ],
            [
                'nombre' => 'Café Espresso Doble',
                'precio' => 1.80,
                'descripcion' => 'Café arábica 100 % recién molido, preparado en el momento para extraer todo su aroma y sabor intenso, servido en taza pequeña para disfrutar de un auténtico espresso italiano.',
            ],
        ];

        $productos = [];

        foreach ($productosSinImagen as $producto) {
            $imagenAleatoria = $imagenes[array_rand($imagenes)];
            $producto['image_url'] = asset('storage/articulos/' . $imagenAleatoria);
            $productos[] = $producto;
        }


        foreach ($productos as $producto) {
            Articulo::create([
                'nombre' => $producto['nombre'],
                'descripcion' => $producto['descripcion'],
                'precio' => $producto['precio'],
                'user_id' => $user->id,
                'image_url' => $producto['image_url'],
            ]);


        }
    }
}
