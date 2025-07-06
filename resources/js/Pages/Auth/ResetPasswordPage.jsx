import React from "react";
import { useForm, Link } from "@inertiajs/react";
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

export default function ResetPasswordPage({ token, email: initialEmail }) {
  const { data, setData, post, processing, errors } = useForm({
    token,
    email: initialEmail || "",
    password: "",
    password_confirmation: "",
  });

  function submit(e) {
    e.preventDefault();
    post(`/recuperar-pass/${token}`);
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
      <h1 className="text-3xl font-semibold">Restablecer contraseña</h1>
      <p className="text-muted-foreground text-sm">
        Introduce tu nueva contraseña abajo. Si no solicitaste este cambio, puedes{" "}
        <Link
          href={route("auth.login")}
          className="text-black font-medium underline-offset-4 hover:underline"
        >
          volver al login
        </Link>.
      </p>

      <form onSubmit={submit} className="flex flex-col gap-5">
        {/* Nueva contraseña */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Nueva contraseña</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            value={data.password}
            onChange={(e) => setData("password", e.target.value)}
          />
          {errors.password && (
            <small className="text-red-500 text-sm">{errors.password}</small>
          )}
        </div>

        {/* Confirmación */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
          <Input
            id="password_confirmation"
            type="password"
            placeholder="********"
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

        <div className="mt-4">
          <Button disabled={processing} type="submit" className="w-full">
            Cambiar contraseña
          </Button>
        </div>
      </form>

      <p className="text-sm text-muted-foreground text-center mt-4">
        ¿Recordaste tu contraseña?{" "}
        <Link
          href={route("auth.login")}
          className="text-black font-medium underline-offset-4 hover:underline"
        >
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
}

ResetPasswordPage.layout = (page) => (
  <AuthLayout children={page} title="Restablecer contraseña" />
);
