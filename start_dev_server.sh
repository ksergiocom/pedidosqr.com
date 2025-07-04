#!/bin/bash

# Solucion temporal para arrancar los procesos necesarios en 4 terminales distintas.

gnome-terminal -- bash -c "php artisan serve; exec bash"
gnome-terminal -- bash -c "php artisan rever:start; exec bash"
gnome-terminal -- bash -c "php artisan queue:work; exec bash"
gnome-terminal -- bash -c "npm run dev; exec bash"
