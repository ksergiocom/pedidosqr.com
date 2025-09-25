<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactoController extends Controller
{
    public function enviar(Request $request)
    {
        // Validar los datos del formulario
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
            'nombre' => 'nullable|string|max:255',
            'telefono' => 'nullable|string|max:20',
            'descripcion' => 'required|string|max:1000',
        ], [
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe tener un formato válido.',
            'descripcion.required' => 'La descripción es obligatoria.',
            'descripcion.max' => 'La descripción no puede exceder los 1000 caracteres.',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            // Datos del formulario
            $datos = [
                'email' => $request->email,
                'nombre' => $request->nombre ?? 'No especificado',
                'telefono' => $request->telefono ?? 'No especificado',
                'descripcion' => $request->descripcion,
                'fecha' => now()->format('d/m/Y H:i:s'),
            ];

            // Enviar el correo
            Mail::send('emails.contacto', $datos, function ($message) use ($datos) {
                $message->to('sergio@ksergio.com')
                    ->subject('Nuevo mensaje de contacto - PedidosQR')
                    ->from($datos['email'], $datos['nombre']);
            });

            return redirect()->back()->with('success', '¡Mensaje enviado correctamente! Te contactaremos pronto.');

        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => 'Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo.'])
                ->withInput();
        }
    }
}
