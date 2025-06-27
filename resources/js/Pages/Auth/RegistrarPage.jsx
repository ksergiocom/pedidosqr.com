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
import { Separator } from "@/components/ui/separator";

import AuthLayout from "../Layout/AuthLayout";

const RegistrarPage = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    password_confirmation: '',
  });

  function submit(e) {
    e.preventDefault();
    post('/auth/registrar');
  }

  return (
    <Card className="w-full max-w-md h-fit m-5 self-center">
      <CardHeader>
        <CardTitle>Regístrate en tu cuenta</CardTitle>
        <CardDescription>
          Introduce tu correo electrónico y contraseña para crear tu cuenta
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={submit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="ejemplo@correo.com"
                required
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
              />
              {errors.email && (
                <small className="text-red-500">{errors.email}</small>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                required
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
              />
              {errors.password && (
                <small className="text-red-500">{errors.password}</small>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Repetir contraseña</Label>
              <Input
                id="confirm-password"
                type="password"
                required
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
              />
              {errors.password_confirmation && (
                <small className="text-red-500">{errors.password_confirmation}</small>
              )}
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-5">
        <Button
          type="submit"
          className="w-full"
          disabled={processing}
          onClick={submit}
        >
          Registrarse
        </Button>

        <Button variant="outline" className="w-full" disabled>
          Registrarse con Google
        </Button>

        {/* <Separator className="mt-7 mx-auto" /> */}

        <p className="inline-block text-sm text-muted-foreground text-sm font-thin">
          ¿Ya estás registrado?{" "}
          <Link
            className="underline-offset-4 hover:underline text-black font-normal"
            href="/auth/login"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

RegistrarPage.layout = page => <AuthLayout children={page} title="Welcome" />


export default RegistrarPage;