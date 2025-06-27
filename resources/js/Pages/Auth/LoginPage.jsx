import React from "react";

import { Link } from "@inertiajs/react";
import { useForm } from '@inertiajs/react'

import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import AuthLayout from "../Layout/AuthLayout";

const LoginPage =() => {

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    })

    function submit(e) {
        e.preventDefault()
        post('/auth/login')
    }

    return (
        <Card className="w-full max-w-md h-fit m-5 self-center">
            <CardHeader>
                <CardTitle>Inicia sesión en tu cuenta</CardTitle>
                <CardDescription>
                    Introduce tu correo electrónico para acceder a tu cuenta
                </CardDescription>
                {/* <CardAction>
                    <Link href="/auth/registrar">
                        <Button variant="link">Regístrate</Button>
                    </Link>
                </CardAction> */}
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
                                value={data.email} onChange={e => setData('email', e.target.value)}
                            />
                            {errors.email && <small className="text-red-500">{errors.email}</small>}
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Contraseña</Label>
                                {/* <a
                                    href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    ¿Olvidaste tu contraseña?
                                </a> */}
                            </div>
                            <Input id="password" type="password" required  value={data.password} onChange={e => setData('password', e.target.value)}/>
                             {errors.password && <small className="text-red-500">{errors.password}</small>}
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-5">
                <Button disabled={processing} onClick={submit} type="submit" className="w-full">
                    Iniciar sesión
                </Button>
                <Button disabled variant="outline" className="w-full">
                    Iniciar sesión con Google
                </Button>
                {/* <Separator className="mt-7 mx-auto"/> */}
        <p className="inline-block text-sm text-muted-foreground text-sm font-thin">¿Aún no estás registrado? <Link className="underline-offset-4 hover:underline text-black font-normal" href="/auth/registrar">Regístrate aquí</Link></p>
            </CardFooter>
        </Card>
    )
}


LoginPage.layout = page => <AuthLayout children={page} title="Welcome" />


export default LoginPage;