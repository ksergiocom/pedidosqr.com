import React from "react";
import { Link, useForm } from "@inertiajs/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AuthLayout from "../Layout/AuthLayout";

const handleGoogleLogin = () => {
    window.location.href = '/auth/google/redirect';
  };

const LoginPage = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
  });

  function submit(e) {
    e.preventDefault();
    post("/auth/login");
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
      <h1 className="text-3xl font-semibold">Inicia sesión</h1>
      <p className="text-muted-foreground">
        Introduce tu correo electrónico para acceder a tu cuenta
      </p>

      <form onSubmit={submit} className="flex flex-col gap-5">
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="ejemplo@correo.com"
            required
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
          />
          {errors.email && (
            <small className="text-red-500 text-sm">{errors.email}</small>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            required
            value={data.password}
            placeholder='*******'
            onChange={(e) => setData("password", e.target.value)}
          />
          {errors.password && (
            <small className="text-red-500 text-sm">{errors.password}</small>
          )}
        </div>

        {/* Botones */}
        <div className="flex flex-col gap-3 mt-2">
          <Button disabled={processing} type="submit" className="w-full">
            Iniciar sesión
          </Button>
          <Button type="button" onClick={handleGoogleLogin} variant="outline" className="w-full">
            Iniciar sesión con Google
          </Button>
        </div>
      </form>

      {/* Registro */}
      <p className="text-sm text-muted-foreground text-center mt-4">
        ¿Aún no estás registrado?{" "}
        <Link
          href="/auth/registrar"
          className="text-black font-medium underline-offset-4 hover:underline"
        >
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
};

LoginPage.layout = (page) => <AuthLayout children={page} title="Welcome" />;

export default LoginPage;
