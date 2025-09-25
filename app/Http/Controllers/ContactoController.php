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
            $email = $request->email;
            $nombre = $request->nombre ?? 'No especificado';
            $telefono = $request->telefono ?? 'No especificado';
            $descripcion = $request->descripcion;
            $fecha = now()->format('d/m/Y H:i:s');

            // Enviar el correo con contenido HTML directo
            Mail::send([], [], function ($message) use ($email, $nombre, $telefono, $descripcion, $fecha) {
                $html = "
                <!DOCTYPE html>
                <html lang='es'>
                <head>
                    <meta charset='UTF-8'>
                    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                    <title>Nuevo mensaje de contacto - PedidosQR</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background-color: #000; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                        .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #ddd; }
                        .field { margin-bottom: 20px; }
                        .field-label { font-weight: bold; color: #555; margin-bottom: 5px; }
                        .field-value { background-color: white; padding: 10px; border-radius: 4px; border: 1px solid #ddd; }
                        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
                    </style>
                </head>
                <body>
                    <div class='header'>
                        <h1>Nuevo mensaje de contacto</h1>
                        <p>PedidosQR.com</p>
                    </div>
                    <div class='content'>
                        <p>Has recibido un nuevo mensaje de contacto a través del formulario de tu sitio web.</p>
                        <div class='field'>
                            <div class='field-label'>Fecha y hora:</div>
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
                            <div class='field-label'>Teléfono:</div>
                            <div class='field-value'>{$telefono}</div>
                        </div>
                        <div class='field'>
                            <div class='field-label'>Mensaje:</div>
                            <div class='field-value'>{$descripcion}</div>
                        </div>
                    </div>
                    <div class='footer'>
                        <p>Este mensaje fue enviado desde el formulario de contacto de pedidosqr.com</p>
                        <p>Puedes responder directamente a este correo para contactar al usuario.</p>
                    </div>
                </body>
                </html>";

                $message->to('sergio@ksergio.com')
                    ->subject('Nuevo mensaje de contacto - PedidosQR')
                    ->from($email, $nombre)
                    ->html($html);
            });

            return redirect()->back()->with('success', '¡Mensaje enviado correctamente! Te contactaremos pronto.')->with('scroll_to_contact', true);

        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => 'Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo.'])
                ->withInput()
                ->with('scroll_to_contact', true);
        }
    }
}
