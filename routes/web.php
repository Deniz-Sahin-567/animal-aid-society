<?php

use App\Http\Controllers\AnimalLocationController;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\CatController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('cats', CatController::class);
    Route::resource('areas', AreaController::class);

    Route::prefix('cats/{cat}')->group(function () {
        Route::resource('/animal-locations', AnimalLocationController::class);
    });

    Route::get('cat-list/{area}', [AnimalLocationController::class, 'area_cats'])->name('area-cat-list');
});

require __DIR__ . '/settings.php';
