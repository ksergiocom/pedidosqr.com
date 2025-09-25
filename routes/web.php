<?php

use App\Models\User;
use Laravel\Socialite\Facades\Socialite;

use App\Http\Controllers\AnalisisController;
use App\Http\Controllers\ArticuloController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactoController;
use App\Http\Controllers\InfoController;
use App\Http\Controllers\CodigoController;

use App\Http\Controllers\PedidoController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;
// ----- Lading -----------------------------------------------------------------------------------
Route::view('/', 'home')->name('home');
// Route::view('/about', 'about')->name('about');
Route::view('/terminos', 'terminos')->name('terminos');
Route::post('/contacto/enviar', [ContactoController::class, 'enviar'])->name('contacto.enviar');
// ----- Inertia ----------------------------------------------------------------------------------


// ----- OAuth ------------------------------------------------------------------------------------

Route::get('/auth/google/redirect', [AuthController::class, 'googleRedirect'])->middleware('guest')->name('auth.google.redirect');
Route::get('/auth/google/callback', [AuthController::class, 'googleCallback'])->middleware('guest')->name('auth.google.callback');

// ------------------------------------------------------------------------------------------------

Route::get('/recuperar-pass', [AuthController::class, 'recuperarView'])->middleware('guest')->name('password.request');
Route::post('/recuperar-pass', [AuthController::class, 'enviarLinkRecuperacion'])->middleware('guest')->name('password.email');
Route::get('/recuperar-pass/{token}', [AuthController::class, 'nuevaContraseñaView'])->middleware('guest')->name('password.reset');
Route::post('/recuperar-pass/{token}', [AuthController::class, 'resetContraseña'])->middleware('guest')->name('password.update');

// ----- Inertia ----------------------------------------------------------------------------------

Route::prefix('auth')->name('auth.')->middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'loginView'])->name('login');
    Route::post('/login', [AuthController::class, 'autentificar']);
    Route::get('/registrar', [AuthController::class, 'registrarView'])->name('registrar-view');
    Route::post('/registrar', [AuthController::class, 'registrar'])->name('registrar');
});

Route::put('/auth/actualizar-contraseña', [AuthController::class, 'actualizarPassword'])->middleware('auth')->name('auth.actualizar-contraseña');
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth')->name('auth.logout');

Route::prefix('gestion')->name('gestion.')->middleware('auth')->group(function () {
    Route::redirect('/', '/gestion/pedidos');

    Route::prefix('codigos')->name('codigos.')->group(function () {
        Route::get('', [CodigoController::class, 'index'])->name('index');
        Route::get('crear', [CodigoController::class, 'create'])->name('create');
        Route::post('crear', [CodigoController::class, 'store'])->name('store');
        // Route::get('{codigo}', [CodigoController::class,'show'])->name('show');
        Route::delete('{codigo}', [CodigoController::class, 'destroy'])->name('destroy');
        Route::put('{codigo}/editar', [CodigoController::class, 'update'])->name('update');
        Route::get('{codigo}/editar', [CodigoController::class, 'edit'])->name('edit');
    });
    Route::prefix('articulos')->name('articulos.')->group(function () {
        Route::get('', [ArticuloController::class, 'index'])->name('index');
        Route::get('crear', [ArticuloController::class, 'create'])->name('create');
        Route::post('crear', [ArticuloController::class, 'store'])->name('store');
        // Route::get('{articulo}', [ArticuloController::class,'show'])->name('show');
        Route::get('{articulo}/editar', [ArticuloController::class, 'edit'])->name('edit');
        Route::put('{articulo}/editar', [ArticuloController::class, 'update'])->name('update');
        Route::delete('{articulo}', [ArticuloController::class, 'destroy'])->name('destroy');
        Route::delete('{articulo}/imagen/eliminar', [ArticuloController::class, 'destroyImage'])->name('imagen.destroy');
    });
    Route::prefix('pedidos')->name('pedidos.')->group(function () {
        Route::get('', [PedidoController::class, 'index'])->name('index');
        // Route::get('{pedido}',[PedidoController::class,'show'])->name('show');
        Route::put('{pedido}/completar', [PedidoController::class, 'completar'])->name('completar');
        Route::put('{pedido}/pendiente', [PedidoController::class, 'pendiente'])->name('pendiente');
        Route::delete('{pedido}', [PedidoController::class, 'destroy'])->name('destroy');
    });
});

Route::prefix('analisis')->name('info.')->middleware('auth')->group(function () {
    Route::redirect('/', '/analisis/historial');
    Route::get('historial', [AnalisisController::class, 'historial'])->name('historial');
    // Route::get('estadisticas', [AnalisisController::class, 'estadisticas'])->name('estadisticas');
});

// Route::prefix('info')->name('info.')->middleware('auth')->group(function(){
//     Route::get('', [InfoController::class, 'index'])->middleware('auth')->name('index');
//     Route::get('sobre-nosotros', [InfoController::class, 'about'])->middleware('auth')->name('about');
//     Route::get('contacto', [InfoController::class,'contacto'])->name('contacto');
// });

Route::prefix('perfil')->name('perfil.')->middleware('auth')->group(function () {
    Route::get('', [UsuarioController::class, 'miPerfil'])->name('mi-perfil');
});

Route::get('{codigo}', [CodigoController::class, 'showPedidoEnCodigo'])->name('pedidoEnCodigo.show');
Route::post('{codigo}/pedir', [PedidoController::class, 'pedirPedidoEnCodigo'])->name('pedidoEnCodigo.pedir');
Route::get('{codigo}/{pedido}', [CodigoController::class, 'gracias'])->name('pedidoEnCodigo.gracias');
Route::put('/{codigo}/{pedido}', [PedidoController::class, 'update'])->name('pedidoEnCodigo.update');
Route::delete('/{codigo}/{pedido}', [PedidoController::class, 'cancelar'])->name('pedidoEnCodigo.cancelar');
Route::get('/{codigo}/{pedido}/editar', [PedidoController::class, 'edit'])->name('pedidoEnCodigo.edit');
