<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class InfoController extends Controller
{
    public function index(){
        return inertia('Info/IndexPage');
    }

    public function about(){
        return inertia('Info/AboutPage');
    }

    public function contacto(){
        return inertia('Info/ContactoPage');
    }
}
