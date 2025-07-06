@extends('layout')

@section('main')
    <section class="min-h-dvh">
        <section id="que-es">
            <h2>¿Qué es PedidosQR?</h2>
            <p>Una aplicación web <strong>completamente gratuita</strong> que te permite crear códigos QR personalizados.
                Cada vez que un cliente escanea o marca un artículo en el QR, su petición aparece al instante en tu panel de
                control, en tiempo real.</p>
            <a class="link-boton mt-7" href="/gestion">¡Pruébame!</a>
        </section>
        <hr>

        <section id="como-funciona">
            <h2>¿Cómo funciona?</h2>
            <ol>
                <li>Genera tu código QR con los productos o servicios que ofrezcas.</li>
                <li>Comparte el QR en tus mesas, escaparates o redes sociales.</li>
                <li>El cliente marca lo que desea desde su móvil.</li>
                <li>Tú recibes el pedido instantáneamente en tu dashboard.</li>
            </ol>
        </section>
        <hr>

        <section id="ventajas-clave">
            <h2>Ventajas clave</h2>
            <ul>
                <li><strong>Sin descargas ni instalaciones</strong>: todo funciona en el navegador.</li>
                <li><strong>Tiempo real</strong>: recibe cada pedido al momento, gestiona de forma ágil.</li>
                <li><strong>Interfaz intuitiva</strong>: fácil de usar, sin curvas de aprendizaje.</li>
                <li><strong>100% gratis</strong>: sin suscripciones ocultas ni comisiones.</li>
            </ul>
        </section>
        <hr>

        <section id="necesitas-mas">
            <h2>¿Necesitas más?</h2>
            <p>Aunque el uso básico es gratuito, ofrecemos servicios de personalización para negocios que buscan un extra:
            </p>
            <ul>
                <li>Diseño propio de tus códigos QR y dashboard.</li>
                <li>Integración con tu sistema de TPV.</li>
                <li>Conexión con otras herramientas que ya utilices (CRM, sistemas de inventario, etc.).</li>
            </ul>
            <p>Para estas opciones avanzadas, <a href="#contacto">contáctanos</a> y crearemos una solución a tu medida.</p>
        </section>
        <hr>

        <section id="empieza-ya">
            <h2>¡Empieza ya!</h2>
            <ol>
                <li>Regístrate en dos minutos.</li>
                <li>Crea tu primer QR.</li>
                <li>Comparte y recibe tus primeros pedidos al instante.</li>
            </ol>
        </section>

        <hr>

        <section id="contacto">
            <h2>Contacto</h2>
            <p>Escríbenos a: <a href="mailto:sergio@ksergiocom">sergio@ksergiocom</a></p>
            <p><a href="/terminos">Términos y condiciones de uso</a></p>
        </section>

    </section>
@endsection