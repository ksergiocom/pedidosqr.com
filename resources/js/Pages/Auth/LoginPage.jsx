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
    <Card className="w-full max-w-md m-5 self-center">
      <CardHeader className="space-y-2">
        <CardTitle>Inicia sesión en tu cuenta</CardTitle>
        <CardDescription>
          Introduce tu correo electrónico para acceder a tu cuenta
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={submit}>
          <div className="flex flex-col gap-2">
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
              <small
                className={`text-red-500 text-sm transition-opacity duration-300 ${
                  errors.email ? "opacity-100" : "opacity-0"
                }`}
              >
                {errors.email || "placeholder"}
              </small>
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
              <small
                className={`text-red-500 text-sm transition-opacity duration-300 ${
                  errors.password ? "opacity-100" : "opacity-0"
                }`}
              >
                {errors.password || "placeholder"}
              </small>
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <Button disabled={processing} onClick={submit} type="submit" className="w-full">
          Iniciar sesión
        </Button>
        <Button disabled variant="outline" className="w-full">
          Iniciar sesión con Google
        </Button>
        <p className="text-sm text-muted-foreground font-thin text-center mt-5">
          ¿Aún no estás registrado?{" "}
          <Link
            className="underline-offset-4 hover:underline text-black font-normal"
            href="/auth/registrar"
          >
            Regístrate aquí
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

LoginPage.layout = (page) => <AuthLayout children={page} title="Welcome" />;

export default LoginPage;
