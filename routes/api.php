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

Route::post('register', function (Request $request) {

    // User input validation.
    $request->validate([
        'name' => 'required|max:255',
        'surname' => 'required|max: 255',
        'email' => 'required|email|unique:users',
        'password' => 'required|confirmed|min:5'
    ]);

    // User creation.
    $user = new User();
    $user->fill($request->all());
    $user->status = 0;
    $user->api_token = str_random(60);
    $user->password = bcrypt($request->password);
    $user->saveOrFail();

    // User's root folder creation.
    $entry = Entry::create([
        'parent_id' => null,
        'owner_id' => $user->id,
        'name' => 'Root',
    ]);

    Folder::create([
        'entry_id' => $entry->id,
        'inbox' => false
    ]);

});

Route::post('login', function (Request $request) {
    $user = User::where('email', $request->email)->first();

    if ($user && Hash::check($request->password, $user->password)) {
        return $user;
    }
    else if ($user && $user->status == 0) {
        return response()->json(['message' => 'User not verified.'], 403);
    }
    else {
        return response()->json(['message' => 'Login fail.'], 400);
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

    Route::delete('/entry/{id}', function ($id, Request $request) {
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
        // 6. Check that te name is not empty.

        $entry = new Entry();
        $entry->name = $request->input('name');
        $entry->parent_id = $request->input('parent');
        $entry->owner_id = $request->user()->id;
        
        $entry->save();

        $entry->source()->create([
            'content' => $request->input('content', ''),
            'type' => $request->input('type', 0)
        ]);
    });

    Route::post('/source/{id}', function ($id, Request $request) {
        $entry = Entry::where([
            'id' => $id,
            'owner_id' => $request->user()->id
        ])->firstOrFail();

        $entry->source()->getResults()->fill([
            'content' => $request->input('content', '')
        ])->save();
    });
});
