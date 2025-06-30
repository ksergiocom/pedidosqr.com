<?php

use App\Models\User;
use Laravel\Socialite\Facades\Socialite;

use App\Http\Controllers\AnalisisController;
use App\Http\Controllers\ArticuloController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\InfoController;
use App\Http\Controllers\MesaController;

use App\Http\Controllers\PedidoController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;


// ----- Lading -----------------------------------------------------------------------------------
Route::view('/', 'home')->name('home');
// ----- Inertia ----------------------------------------------------------------------------------


// ----- OAuth ------------------------------------------------------------------------------------

Route::get('/auth/google/redirect', [AuthController::class, 'googleRedirect'])->name('auth.google.redirect');
Route::get('/auth/google/callback', [AuthController::class, 'googleCallback'])->name('auth.google.callback');

// ------------------------------------------------------------------------------------------------


// ----- Inertia ----------------------------------------------------------------------------------

Route::prefix('auth')->name('auth.')->middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'loginView'])->name('login');
    Route::post('/login', [AuthController::class, 'autentificar']);
    Route::get('/registrar', [AuthController::class, 'registrarView'])->name('registrar');
    Route::post('/registrar', [AuthController::class, 'registrar'])->name('registrar');
});

Route::put('/auth/actualizar-contraseña', [AuthController::class, 'actualizarPassword'])->middleware('auth')->name('auth.actualizar-contraseña');
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth')->name('auth.logout');

Route::prefix('gestion')->name('gestion.')->middleware('auth')->group(function () {
    Route::redirect('/','/gestion/pedidos');

    Route::prefix('mesas')->name('mesas.')->group(function () {
        Route::get('', [MesaController::class,'index'])->name('index');
        Route::get('crear', [MesaController::class,'create'])->name('create');
        Route::post('crear', [MesaController::class,'store'])->name('store');
        Route::get('{mesa}', [MesaController::class,'show'])->name('show');
        Route::delete('{mesa}', [MesaController::class,'destroy'])->name('destroy');
        Route::put('{mesa}/editar', [MesaController::class,'update'])->name('update');
        Route::get('{mesa}/editar', [MesaController::class,'edit'])->name('edit');
    });
    Route::prefix('articulos')->name('articulos.')->group(function () {
        Route::get('', [ArticuloController::class,'index'])->name('index');
        Route::get('crear', [ArticuloController::class,'create'])->name('create');
        Route::post('crear', [ArticuloController::class,'store'])->name('store');
        Route::get('{articulo}', [ArticuloController::class,'show'])->name('show');
        Route::get('{articulo}/editar', [ArticuloController::class,'edit'])->name('edit');
        Route::put('{articulo}/editar', [ArticuloController::class,'update'])->name('update');
        Route::delete('{articulo}', [ArticuloController::class,'destroy'])->name('destroy');
    });
    Route::prefix('pedidos')->name('pedidos.')->group(function(){
        Route::get('',[PedidoController::class,'index'])->name('index');
        Route::get('{pedido}',[PedidoController::class,'show'])->name('show');
        Route::put('{pedido}/completar',[PedidoController::class,'completar'])->name('completar');
        Route::put('{pedido}/pendiente',[PedidoController::class,'pendiente'])->name('pendiente');
        Route::delete('{pedido}',[PedidoController::class,'destroy'])->name('destroy');
    });
});

Route::prefix('analisis')->name('info.')->middleware('auth')->group(function(){
    Route::redirect('/','/analisis/pedidos');
    Route::get('pedidos', [AnalisisController::class, 'pedidos'])->name('pedidos');
});

Route::prefix('info')->name('info.')->middleware('auth')->group(function(){
    Route::get('', [InfoController::class, 'index'])->middleware('auth')->name('index');
    Route::get('sobre-nosotros', [InfoController::class, 'about'])->middleware('auth')->name('about');
    Route::get('contacto', [InfoController::class,'contacto'])->name('contacto');
});

Route::prefix('perfil')->name('perfil.')->middleware('auth')->group(function(){
    Route::get('', [UsuarioController::class,'miPerfil'])->name('mi-perfil');
});

Route::get('{mesa}',[MesaController::class, 'showPedidoEnMesa'])->name('pedidoEnMesa.show');
Route::post('{mesa}/pedir',[PedidoController::class, 'pedirPedidoEnMesa'])->name('pedidoEnMesa.pedir');
Route::get('{mesa}/{pedido}',[MesaController::class, 'gracias'])->name('pedidoEnMesa.gracias');
Route::put('/{mesa}/{pedido}', [PedidoController::class, 'update'])->name('pedidoEnMesa.update');
Route::delete('/{mesa}/{pedido}', [PedidoController::class, 'cancelar'])->name('pedidoEnMesa.cancelar');
Route::get('/{mesa}/{pedido}/editar', [PedidoController::class, 'edit'])->name('pedidoEnMesa.edit');
