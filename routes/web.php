<?php

use App\Http\Controllers\ArticuloController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MesaController;

use App\Http\Controllers\PedidoController;
use Illuminate\Support\Facades\Route;


Route::view('/', 'home')->name('home');

Route::get('{mesa}',[MesaController::class, 'get'])->name('mesa');
Route::post('{mesa}/pedir',[PedidoController::class, 'pedir'])->name('mesa.pedir');

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
        Route::post('', [MesaController::class,'crear'])->name('crear');
        Route::delete('{mesa}', [MesaController::class,'eliminar'])->name('eliminar');
    });
    Route::prefix('articulos')->name('articulos.')->group(function () {
        Route::get('', [ArticuloController::class,'index'])->name('index');
        Route::post('', [ArticuloController::class,'crear'])->name('crear');
        Route::delete('{articulo}', [ArticuloController::class,'eliminar'])->name('eliminar');
    });
    Route::prefix('pedidos')->name('pedidos.')->group(function(){
        Route::get('',[PedidoController::class,'index'])->name('index');
        Route::delete('{pedido}',[PedidoController::class,'destroy'])->name('destroy');
    });
});
