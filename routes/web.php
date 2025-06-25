<?php

use App\Http\Controllers\ArticuloController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MesaController;

use Illuminate\Support\Facades\Route;


Route::view('/', 'home')->name('home');

Route::prefix('auth')->name('auth.')->group(function () {
    Route::get('/login', [AuthController::class, 'loginView'])->name('login');
    Route::post('/login', [AuthController::class, 'autentificar']);
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/registrar', [AuthController::class, 'registrarView'])->name('registrar');
    Route::post('/registrar', [AuthController::class, 'registrar']);
});

Route::prefix('gestion')->name('gestion.')->group(function () {
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
});
