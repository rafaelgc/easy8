<?php

use App\Entry;
use App\Folder;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/user', 'UserController@store');
Route::post('/login', 'UserController@login');

Route::middleware('auth:api')->group(function () {
    // Obtener los datos del usuario.
    Route::get('/user/{user}', 'UserController@show');

    // Obtiene las carpetas de un determinado padre.
    // Entrada: parent (opcional). Si es nulo o no se especifica obtendrán la carpeta root.
    Route::get('/folder', 'FolderController@index');
    Route::post('/folder', 'FolderController@store');
    Route::post('/folder/{id}', 'EntryController@updateFoºlder');
    Route::delete('/folder/{entry}', 'FolderController@destroy')->middleware('can:delete,entry');

    Route::post('/entry/{id}', 'EntryController@update');

    Route::get('/source/{entry}', 'SourceController@show')->middleware('can:view,entry');
    Route::get('/source', 'SourceController@index');
    Route::post('/source', 'SourceController@store');
    Route::post('/source/{entry}', 'SourceController@update')->middleware('can:update,entry');
    Route::delete('/source/{entry}', 'SourceController@destroy')->middleware('can:delete,entry');
});
