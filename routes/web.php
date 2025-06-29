<?php

use App\Http\Controllers\ArticuloController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MesaController;

use App\Http\Controllers\PedidoController;
use Illuminate\Support\Facades\Route;


Route::view('/', 'home')->name('home');

Route::get('{mesa}',[MesaController::class, 'showPedidoEnMesa'])->name('pedidoEnMesa.show');
Route::post('{mesa}/pedir',[PedidoController::class, 'pedirPedidoEnMesa'])->name('pedidoEnMesa.pedir');
Route::get('{mesa}/{pedido}',[MesaController::class, 'gracias'])->name('pedidoEnMesa.gracias');
Route::put('/{mesa}/{pedido}', [PedidoController::class, 'update'])->name('pedidoEnMesa.update');
Route::delete('/{mesa}/{pedido}', [PedidoController::class, 'cancelar'])->name('pedidoEnMesa.cancelar');
Route::get('/{mesa}/{pedido}/editar', [PedidoController::class, 'edit'])->name('pedidoEnMesa.edit');


Route::prefix('auth')->name('auth.')->middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'loginView'])->name('login');
    Route::post('/login', [AuthController::class, 'autentificar']);
    Route::get('/registrar', [AuthController::class, 'registrarView'])->name('registrar');
    Route::post('/registrar', [AuthController::class, 'registrar']);
});

Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth')->name('auth.logout');

Route::prefix('gestion')->name('gestion.')->middleware('auth')->group(function () {
    Route::prefix('mesas')->name('mesas.')->group(function () {
        Route::get('', [MesaController::class,'index'])->name('index');
        Route::get('crear', [MesaController::class,'create'])->name('create');
        Route::post('crear', [MesaController::class,'store'])->name('store');
        Route::get('{mesa}', [MesaController::class,'show'])->name('show');
        Route::delete('{mesa}', [MesaController::class,'destroy'])->name('destroy');
        Route::get('{mesa}/editar', [MesaController::class,'edit'])->name('edit');
        Route::put('{mesa}/editar', [MesaController::class,'update'])->name('update');
    });
    Route::prefix('articulos')->name('articulos.')->group(function () {
        Route::get('', [ArticuloController::class,'index'])->name('index');
        Route::get('crear', [ArticuloController::class,'create'])->name('create');
        Route::post('crear', [ArticuloController::class,'store'])->name('store');
        Route::get('{articulo}/editar', [ArticuloController::class,'edit'])->name('edit');
        Route::put('{articulo}/editar', [ArticuloController::class,'update'])->name('update');
        Route::delete('{articulo}', [ArticuloController::class,'destroy'])->name('destroy');
    });
    Route::prefix('pedidos')->name('pedidos.')->group(function(){
        Route::get('',[PedidoController::class,'index'])->name('index');
        Route::delete('{pedido}',[PedidoController::class,'destroy'])->name('destroy');
    });
});
