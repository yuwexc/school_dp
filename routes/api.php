<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CourseAccessController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DoneController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/levels', [LevelController::class, 'index']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);

Route::controller(UserController::class)->group(function () {
    // Route::get('/user/generate', 'generate');
    Route::get('/user', 'show')->middleware('auth:api');
    Route::get('/users', 'index');
    Route::post('/users', 'create');
    Route::post('/user/update', 'update')->middleware('auth:api');
    Route::post('/login', 'login');
    Route::get('/logout', 'logout')->middleware('auth:api');

    Route::post('/users/phone/exist', 'ifPhoneExists');
    Route::post('/users/phone/exist-on-update', 'ifPhoneExistsOnUpdate')->middleware('auth:api');
    Route::post('/users/email/exist', 'ifEmailExists');
    Route::post('/users/email/exist-on-update', 'ifEmailExistsOnUpdate')->middleware('auth:api');
});

Route::controller(DoneController::class)->group(function () {
    Route::get('/dashboard', 'dashboard')->middleware('auth:api');
    Route::post('/lessons/{id}/done', 'create')->middleware('auth:api');
    Route::get('/user/{id_user}/lessons/{id_lesson}/done', 'show')->middleware('auth:api');
    Route::post('/user/{id_user}/lessons/{id_lesson}/done', 'update')->middleware('auth:api');
});

Route::controller(CourseController::class)->group(function () {
    // Route::get('/courses/generate', 'generate');
    Route::get('/my-courses', 'my_courses')->middleware('auth:api');
    Route::post('/courses/create', 'create')->middleware('auth:api');
    Route::post('/courses/{id}', 'edit')->middleware('auth:api');
    Route::get('/courses', 'index');
    Route::get('/courses/{id}', 'show');
});

Route::controller(CourseAccessController::class)->group(function () {
    //Route::get('/access-course/generate', 'generate');
    Route::post('/requests/{id}/enroll', 'update')->middleware('auth:api');
    Route::post('/my-courses/{id}/request', 'create')->middleware('auth:api');
    Route::delete('/my-courses/delete/{id}', 'delete')->middleware('auth:api');
});

Route::controller(LessonController::class)->group(function () {
    Route::get('/lessons/{id}', 'show')->middleware('auth:api');
    Route::post('/courses/{course}/lessons', 'create')->middleware('auth:api');
});

Route::controller(AdminController::class)->group(function () {
    Route::get('/stats', 'stats')->middleware('auth:api');
});