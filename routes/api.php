<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Folder;
use App\Entry;
use App\User;
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

Route::post('login', function (Request $request) {
    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response('Login fail', 400);
    }
    else {
        return $user;
    }
});

Route::middleware('auth:api')->group(function () {
    // Obtener los datos del usuario.
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // ESTO TIENE MALA PINTA.
    Route::get('/folder/{id}', function ($id, Request $request) {
        return Entry::where('owner_id', $request->user()->id)->with(['folder'])->first();
    });

    // Obtiene las carpetas de un determinado padre.
    // Entrada: parent (opcional). Si es nulo o no se especifica obtendrán la carpeta root.
    Route::get('/folder', function (Request $request) {
        return Entry::where([
            'owner_id' => $request->user()->id,
            'parent_id' => $request->get('parent', null)
            ])->whereExists(function ($query) {
                $query->select('id')->from('folders')->where('entries.id', '=', DB::raw('entry_id'));
            })->with(['folder'])->get();
    });

    Route::post('/folder', function (Request $request) {
        // 1. Set inbox_name to null if not inbox.
        // 2. Check that the user is owner of the parent.
        // 3. Check that the inbox_name is unique.
        // 4. Check that the name of the entry is not repeated in the folder.
        // 5. Check that the parent is not null.

        $entry = new Entry();
        $entry->name = $request->input('name');
        $entry->parent_id = $request->input('parent');
        $entry->owner_id = $request->user()->id;
        
        $entry->save();

        $entry->folder()->create([
            'inbox' => $request->input('inbox', false),
            'inbox_name' => $request->input('inbox_name', null)
        ]);
    });

    Route::post('/entry/{id}/delete', function ($id, Request $request) {
        // 1. Check that id is not null. We don't want to allow the
        // user to remove his root folder.
        Entry::where(['id' => $id, 'owner_id' => $request->user()->id])->delete();
    });

    Route::get('/source/{id}', function ($id, Request $request) {
        return Entry::where(['id' => $id, 'owner_id' => $request->user()->id])->with(['source'])->firstOrFail();
    });

    Route::get('/source', function (Request $request) {
        return Entry::where([
            'owner_id' => $request->user()->id,
            'parent_id' => $request->get('parent', null)
            ])->whereExists(function ($query) {
                $query->select('id')->from('sources')->where('entries.id', '=', DB::raw('entry_id'));
            })->with(['source'])->get();
    });

    Route::post('/source', function (Request $request) {
        // 1. Set inbox_name to null if not inbox.
        // 2. Check that the user is owner of the parent.
        // 3. Check that the inbox_name is unique.
        // 4. Check that the name of the entry is not repeated in the folder.
        // 5. Check that the parent is not null.

        $entry = new Entry();
        $entry->name = $request->input('name');
        $entry->parent = $request->input('parent');
        $entry->owner_id = $request->user()->id;
        
        $entry->save();

        $entry->folder()->create([
            'content' => $request->input('content', ''),
            'type' => $request->input('type', 0)
        ]);
    });
});
