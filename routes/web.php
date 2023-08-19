<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuizSessionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Models\Quiz;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $quizzes = Quiz::all();
    return Inertia::render('Dashboard', ['quizzes' => $quizzes]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('quizzes', QuizController::class)
    ->only((['index', 'store', 'edit', 'create', 'update']))
    ->middleware(['auth', 'verified']);


Route::resource('questions', QuestionController::class)
    ->only((['store', 'edit', 'create', 'update']))
    ->middleware(['auth', 'verified']);

Route::resource('quizSessions', QuizSessionController::class)
    ->only((['store', 'create']))
    ->middleware(['auth', 'verified']);



require __DIR__ . '/auth.php';