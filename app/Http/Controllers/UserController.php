<?php

namespace App\Http\Controllers;

use App\Entry;
use App\Mail\RegistrationMail;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

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
        $user->status = config('mail.enabled') ? 0 : 1;
        $user->api_token = str_random(60);
        $user->confirmation_token = str_random(60);
        $user->password = bcrypt($request->password);
        $user->saveOrFail();

        // User's root folder creation.
        $entry = new Entry();
        $entry->name = 'root';
        $entry->owner_id = $user->id;
        $entry->parent_id = null;
        $entry->save();

        if (config('mail.enabled')) {
            // Envío de email.
            try {
                Mail::to($user)->send(new RegistrationMail($user));
            } catch (\Exception $ex) {
                $user->delete();
                abort(500, 'El mail de confirmación no se pudo enviar.');
            }
        }

        return $user;
    }

    public function confirm(Request $request, User $user) {
        $request->validate([
            'confirmation_token' => 'required'
        ]);

        if ($user->status == 0 && $user->confirmation_token == $request->confirmation_token) {
            $user->status = 1;
            $user->save();
            return $user->makeVisible('api_token');
        }
        else {
            abort(422, 'Código de confirmación inválido.');
        }
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
