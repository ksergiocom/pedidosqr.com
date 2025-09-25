<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
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


    public function recuperarView(Request $request)
    {
        return inertia('Auth/ResetPage');
    }

    public function nuevaContraseñaView(Request $request, $token) {
        return inertia('Auth/ResetPasswordPage', [
            'token' => $token,
            'email' => $request->query('email'),
        ]);
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

        // HAcerlo CASE INseSITIVE!
        $credentials = [
            'email' => strtolower($validated['email']),
            'password' => $validated['password'],
        ];


        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->intended('/gestion/pedidos');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function registrar(Request $request)
    {
        // return "Lo siento no se puede registrar nadie todavía :(";

        $request->validate([
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:5|confirmed',
        ]);

        $user = User::create([
            'email' => strtolower($request->email),
            'password' => Hash::make($request->password),
        ]);

        // Enviar correo de notificación de registro
        try {
            $this->enviarNotificacionRegistro($user);
        } catch (\Exception $e) {
            // Log del error pero no interrumpir el registro
            \Log::error('Error enviando correo de registro: ' . $e->getMessage());
        }

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
        // return "Lo siento no se puede registrar nadie todavía :(";

        $googleUser = Socialite::driver('google')->stateless()->user();

        $isNewUser = false;
        $user = User::firstOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'google_id' => strtolower($googleUser->getId()),
                'avatar' => $googleUser->getAvatar(),
                'password' => Hash::make(Str::random(24)), // contraseña aleatoria segura
            ]
        );

        // Verificar si es un usuario nuevo
        if ($user->wasRecentlyCreated) {
            $isNewUser = true;
        }

        // Enviar correo de notificación si es un usuario nuevo
        if ($isNewUser) {
            try {
                $this->enviarNotificacionRegistro($user);
            } catch (\Exception $e) {
                // Log del error pero no interrumpir el registro
                \Log::error('Error enviando correo de registro (Google): ' . $e->getMessage());
            }
        }

        Auth::login($user);

        return redirect('/gestion/pedidos'); // o donde quieras redirigir
    }

    public function enviarLinkRecuperacion(Request $request) {
        $request->validate(['email' => 'required|email']);
        $status = Password::sendResetLink($request->only('email'));
        return $status === Password::RESET_LINK_SENT
            ? back()->with('info', 'Hemos enviado un enlace de recuperación a tu correo')
            : back()->withErrors(['email' => __($status)]);
    }

    public function resetContraseña(Request $request, $token) {
        $data = $request->validate([
            'email'                 => ['required','email'],
            'password'              => ['required','string','min:5','confirmed'],
        ]);
        $data['token'] = $token;
        $status = Password::reset(
            $data,
            function ($user, $newPassword) {
                $user->forceFill([
                    'password'       => Hash::make($newPassword),
                    'remember_token' => Str::random(60),
                ])->save();
                event(new PasswordReset($user));
            }
        );
        return $status === Password::PASSWORD_RESET
            ? redirect()->route('auth.login')->with('status', __($status))
            : back()->withErrors(['email' => __($status)]);
    }

    private function enviarNotificacionRegistro($user)
    {
        $email = $user->email;
        $fecha = now()->format('d/m/Y H:i:s');
        $nombre = $user->name ?? 'Nuevo usuario';

        // Enviar el correo con contenido HTML directo
        Mail::send([], [], function ($message) use ($email, $nombre, $fecha) {
            $html = "
            <!DOCTYPE html>
            <html lang='es'>
            <head>
                <meta charset='UTF-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <title>Nuevo usuario registrado - PedidosQR</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #000; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #ddd; }
                    .field { margin-bottom: 20px; }
                    .field-label { font-weight: bold; color: #555; margin-bottom: 5px; }
                    .field-value { background-color: white; padding: 10px; border-radius: 4px; border: 1px solid #ddd; }
                    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
                    .success { background-color: #d4edda; color: #155724; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
                </style>
            </head>
            <body>
                <div class='header'>
                    <h1>🎉 Nuevo usuario registrado</h1>
                    <p>PedidosQR.com</p>
                </div>
                <div class='content'>
                    <div class='success'>
                        <strong>¡Excelente!</strong> Un nuevo usuario se ha registrado en tu plataforma.
                    </div>
                    <div class='field'>
                        <div class='field-label'>Fecha y hora de registro:</div>
                        <div class='field-value'>{$fecha}</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>Correo electrónico:</div>
                        <div class='field-value'>{$email}</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>Nombre:</div>
                        <div class='field-value'>{$nombre}</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>Estado:</div>
                        <div class='field-value'>✅ Usuario activo y autenticado</div>
                    </div>
                </div>
                <div class='footer'>
                    <p>Este es un correo automático del sistema de registro de pedidosqr.com</p>
                    <p>El usuario ya puede acceder a la plataforma de gestión.</p>
                </div>
            </body>
            </html>";

            $message->to('sergio@ksergio.com')
                ->subject('🎉 Nuevo usuario registrado - PedidosQR')
                ->from('noreply@pedidosqr.com', 'PedidosQR - Sistema')
                ->html($html);
        });
    }

}
