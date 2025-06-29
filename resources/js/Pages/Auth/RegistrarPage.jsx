import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AuthLayout from "../Layout/AuthLayout";

const RegistrarPage = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    password_confirmation: "",
  });

  function submit(e) {
    e.preventDefault();
    post("/auth/registrar");
  }

  return (
    <div className="flex flex-col gap-6 p-6 w-full max-w-md mx-auto">
      <h1 className="text-3xl font-semibold">Regístrate en tu cuenta</h1>
      <p className="text-muted-foreground">
        Introduce tu correo electrónico y contraseña para crear tu cuenta
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
            onChange={(e) => setData("password", e.target.value)}
          />
          {errors.password && (
            <small className="text-red-500 text-sm">{errors.password}</small>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirm-password">Repetir contraseña</Label>
          <Input
            id="confirm-password"
            type="password"
            required
            value={data.password_confirmation}
            onChange={(e) =>
              setData("password_confirmation", e.target.value)
            }
          />
          {errors.password_confirmation && (
            <small className="text-red-500 text-sm">
              {errors.password_confirmation}
            </small>
          )}
        </div>

        {/* Botones */}
        <div className="flex flex-col gap-3 mt-2">
          <Button disabled={processing} type="submit" className="w-full">
            Registrarse
          </Button>
          <Button variant="outline" disabled className="w-full">
            Registrarse con Google
          </Button>
        </div>
      </form>

      {/* Ya registrado */}
      <p className="text-sm text-muted-foreground text-center mt-4">
        ¿Ya estás registrado?{" "}
        <Link
          className="text-black font-medium underline-offset-4 hover:underline"
          href="/auth/login"
        >
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
};

RegistrarPage.layout = (page) => (
  <AuthLayout children={page} title="Welcome" />
);

export default RegistrarPage;
