<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    // --- Vistas -----------------------------------------

    public function loginView(Request $request)
    {
        return inertia('Auth/LoginPage');
    }

    public function registrarView(Request $request)
    {
        return inertia('Auth/RegistrarPage');
    }


    // --- Lógica -----------------------------------------

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('auth.login');
    }

    public function autentificar(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if (Auth::attempt($validated)) {
            $request->session()->regenerate();

            return redirect()->intended('/gestion/pedidos');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function registrar(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:5|confirmed',
        ]);

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        auth()->login($user);

        return redirect()->route('home');
    }

    public function actualizarPassword(Request $request)
    {
        $request->validate([
            'password_actual' => ['required', 'current_password'],
            'password_nuevo' => ['required', 'string', 'min:5', 'confirmed'],
        ], [
            'password_actual.current_password' => 'La contraseña actual no es correcta.',
            'password_nuevo.confirmed' => 'La confirmación no coincide con la nueva contraseña.',
        ]);

        $user = $request->user();
        $user->password = Hash::make($request->password_nuevo); // El warning no hay problema
        $user->save();

        return redirect()->route('perfil.mi-perfil')->with('success', 'La contraseña se ha actualizado correctamente.');
    }


    public function googleRedirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function googleCallback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        $user = User::firstOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
                'avatar' => $googleUser->getAvatar(),
                'password' => Hash::make(Str::random(24)), // contraseña aleatoria segura
            ]
        );

        Auth::login($user);

        return redirect('/gestion/pedidos'); // o donde quieras redirigir
    }

}
