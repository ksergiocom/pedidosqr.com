import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AuthLayout from "../Layout/AuthLayout";
import { Eye, EyeOff } from "lucide-react";

const RegistrarPage = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);


  function submit(e) {
    e.preventDefault();
    post("/auth/registrar");
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
      <h1 className="text-3xl font-semibold">Regístrate</h1>
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
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={data.password}
              placeholder="*******"
              onChange={(e) => setData("password", e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              onClick={(e) => {
                setShowPassword(!showPassword);
              }}
              className={`absolute inset-y-0 right-0 mx-1 flex items-center text-muted-foreground transition ${data.password ? 'opacity-100' : 'opacity-0'}`}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
          </div>
          {errors.password && (
            <small className="text-red-500 text-sm">{errors.password}</small>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirm-password">Repetir contraseña</Label>
          <div className="relative">
            <Input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              required
              value={data.password_confirmation}
              placeholder="*******"
              onChange={(e) => setData("password_confirmation", e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              onClick={(e) => {
                setShowPassword(!showPassword);
              }}
              className={`absolute inset-y-0 right-0 mx-1 flex items-center text-muted-foreground transition ${data.password_confirmation ? 'opacity-100' : 'opacity-0'}`}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
          </div>
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
          <Button variant="outline" className="w-full">
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
