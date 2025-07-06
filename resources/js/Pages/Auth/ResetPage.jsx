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
import { Eye, EyeOff } from "lucide-react";

const handleGoogleLogin = () => {
    window.location.href = '/auth/google/redirect';
};

const ResetPage = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    function submit(e) {
        e.preventDefault();
        post("/recuperar-pass");
    }

    const [showPassword, setShowPassword] = React.useState(false);


    return (
        <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
            <h1 className="text-3xl font-semibold">Recuperar mi contraseña</h1>
            <p className="text-muted-foreground text-sm">
                Introduce tu correo electrónico para que te enviemos un enlace para recuperar tu contraseña
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

                {/* Botones */}
                <div className="flex flex-col gap-3 mt-2">
                    <Button disabled={processing} type="submit" className="w-full">
                        Recuperar
                    </Button>
                </div>
            </form>

            {/* Registro */}
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

ResetPage.layout = (page) => <AuthLayout children={page} title="Welcome" />;

export default ResetPage;
