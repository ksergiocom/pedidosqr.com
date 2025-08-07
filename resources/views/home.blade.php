@extends('layout')

@section('main')

    {{-- Sección principal: Encabezado y CTA --}}
    <nav class="text-left w-full mb-7 px-4">
        <h3><a class="underline underline-offset-3 text-gray-50 font-light hover:text-white text-lg" href="/">pedidosqr.com</a></h3>
    </nav>
    <section class="px-4 pb-10 text-white mx-auto">
        <h1 class="text-4xl font-medium md:text-5xl">
            <span class="font-extrabold text-white">
                Códigos QR
            </span>
            personalizados y gestión de
            <span class="font-extrabold text-white">
                pedidos en tiempo real
            </span>
        </h1>

        {{-- Botón de llamada a la acción --}}
        <a class="my-15 inline-block bg-white rounded p-2 px-7 text-gray-900 font-semibold shadow hover:bg-gray-100 w-full text-center"
           href="/gestion">¡Pruébame!</a>

        {{-- Descripción principal --}}
        <p class=" text-gray-100 max-w-2xl mx-auto">
            Una aplicación web <strong>completamente gratuita</strong> que te permite crear códigos QR personalizados.
            Cada vez que un cliente escanea o marca un artículo en el QR, su petición aparece al instante en tu panel de
            control, en tiempo real.
        </p>
    </section>

    {{-- Contenido detallado --}}
    <section class="min-h-dvh py-10 text-white max-w-5xl mx-auto space-y-16">

        <hr class="opacity-20">

        {{-- ¿Cómo funciona? --}}
        <section id="como-funciona">
            <h2 class="text-4xl font-semibold mb-4">¿Cómo funciona?</h2>
            <ol class="list-decimal list-inside text-gray-100 space-y-2">
                <li>Genera tu código QR con los productos o servicios que ofrezcas.</li>
                <li>Comparte el QR en tus mesas, escaparates o redes sociales.</li>
                <li>El cliente marca lo que desea desde su móvil.</li>
                <li>Tú recibes el pedido instantáneamente en tu dashboard.</li>
            </ol>
        </section>

        <hr class="opacity-20">

        {{-- Ventajas clave --}}
        <section id="ventajas-clave">
            <h2 class="text-4xl font-semibold mb-4">Ventajas clave</h2>
            <ul class="list-disc list-inside text-gray-100 space-y-2">
                <li><strong>Sin descargas ni instalaciones</strong>: todo funciona en el navegador.</li>
                <li><strong>Tiempo real</strong>: recibe cada pedido al momento, gestiona de forma ágil.</li>
                <li><strong>Interfaz intuitiva</strong>: fácil de usar, sin curvas de aprendizaje.</li>
                <li><strong>100% gratis</strong>: sin suscripciones ocultas ni comisiones.</li>
            </ul>
        </section>

        <hr class="opacity-20">

        {{-- ¿Necesitas más? --}}
        <section id="necesitas-mas">
            <h2 class="text-4xl font-semibold mb-4">¿Necesitas más?</h2>
            <p class="text-gray-100 mb-4">
                Aunque el uso básico es gratuito, ofrecemos servicios de personalización para negocios que buscan un extra:
            </p>
            <ul class="list-disc list-inside text-gray-100 space-y-2">
                <li>Diseño propio de tus códigos QR y dashboard.</li>
                <li>Integración con tu sistema de TPV.</li>
                <li>Conexión con otras herramientas que ya utilices (CRM, sistemas de inventario, etc.).</li>
            </ul>
            <p class="mt-4 text-gray-100">
                Para estas opciones avanzadas, <a class="underline text-blue-300 hover:text-blue-400" href="#contacto">contáctanos</a> y crearemos una solución a tu medida.
            </p>
        </section>

        <hr class="opacity-20">

        {{-- ¡Empieza ya! --}}
        <section id="empieza-ya">
            <h2 class="text-4xl font-semibold mb-4">¡Empieza ya!</h2>
            <ol class="list-decimal list-inside text-gray-100 space-y-2">
                <li>Regístrate en dos minutos.</li>
                <li>Crea tu primer QR.</li>
                <li>Comparte y recibe tus primeros pedidos al instante.</li>
            </ol>
        </section>

        <hr class="opacity-20">

        {{-- Contacto --}}
        <section id="contacto">
            <h2 class="text-4xl font-semibold mb-4">Contacto</h2>
            <p class="text-gray-100">Escríbenos a: <a class="underline text-blue-300 hover:text-blue-400" href="mailto:sergio@ksergiocom">sergio@ksergiocom</a></p>
            <p class="text-gray-100"><a class="underline text-blue-300 hover:text-blue-400" href="/terminos">Términos y condiciones de uso</a></p>
        </section>

    </section>


@endsection
