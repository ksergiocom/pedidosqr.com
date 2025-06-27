<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    // --- Vistas -----------------------------------------

    public function loginView(Request $request){
        return inertia('Auth/LoginPage');
    }

    public function registrarView(Request $request){
        return inertia('Auth/RegistrarPage');
    }

    
    // --- Lógica -----------------------------------------
    
    public function logout(Request $request){
        Auth::logout();
 
        $request->session()->invalidate();
    
        $request->session()->regenerateToken();
    
        return redirect()->route('auth.login');
    }

    public function autentificar(Request $request){
        $validated = $request->validate([
            'email'=> ['required','email'],
            'password'=> ['required']
        ]);

        if (Auth::attempt($validated)) {
            $request->session()->regenerate();
 
            return redirect()->intended('/gestion/pedidos');
        }
     
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function registrar(Request $request){
                $request->validate([
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:5|confirmed',
        ]);

        $user = User::create([
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        auth()->login($user);

        return redirect()->route('home');
    }
    
}
