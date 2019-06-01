<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function show(Request $request, User $user) {
        return $user;
    }
    public function store(Request $request) {

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

    }

    public function login(Request $request) {
        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            return $user->makeVisible('api_token');
        }
        else if ($user && $user->status == 0) {
            return response()->json(['message' => 'User not verified.'], 403);
        }
        else {
            return response()->json(['message' => 'Login fail.'], 400);
        }
    }
}
