import React from "react";
import GestionLayout from "../../Layout/GestionLayout";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { MoveLeft, Trash } from "lucide-react";

export default function EditPage({ articulo }) {
  const { data, setData, put, post, processing, errors } = useForm({
    nombre: articulo.nombre || "",
    precio: articulo.precio || "",
    descripcion: articulo.descripcion || "",
    image: null,            // para subir nueva imagen
    _method: 'put',
  });

  const submit = (e) => {
    e.preventDefault();
    post(`/gestion/articulos/${articulo.id}/editar`);
  };

  return (
    <form onSubmit={submit} encType="multipart/form-data">
      <Card>
        <CardHeader>
          <CardTitle>Editar Artículo</CardTitle>
          <CardDescription>Modifica los datos de tu artículo</CardDescription>
          <CardAction>
            <Link href="/gestion/articulos">
              <Button type="button" variant="ghost" size="icon">
                <MoveLeft />
              </Button>
            </Link>
          </CardAction>
        </CardHeader>

        <CardContent>
          {/* Nombre */}
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              type="text"
              id="nombre"
              name="nombre"
              value={data.nombre}
              onChange={(e) => setData("nombre", e.target.value)}
            />
            {errors.nombre && (
              <small className="text-red-500">{errors.nombre}</small>
            )}
          </div>

          {/* Precio */}
          <div className="grid w-full max-w-sm items-center gap-3 mt-5">
            <Label htmlFor="precio">Precio</Label>
            <Input
              type="number"
              id="precio"
              step="0.01"
              name="precio"
              value={data.precio}
              onChange={(e) => setData("precio", e.target.value)}
            />
            {errors.precio && (
              <small className="text-red-500">{errors.precio}</small>
            )}
          </div>

          {/* Descripción */}
          <div className="grid w-full max-w-sm items-center gap-3 mt-5">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              name="descripcion"
              placeholder="Opcional"
              value={data.descripcion}
              onChange={(e) => setData("descripcion", e.target.value)}
            />
            {errors.descripcion && (
              <small className="text-red-500">{errors.descripcion}</small>
            )}
          </div>

          {/* Imagen actual */}
          {articulo.image_url && (
            <div className="mt-5">
              <Label>Imagen actual</Label>
              <img
                src={articulo.image_url}
                alt={articulo.nombre}
                className="w-full max-w-xs h-auto mt-2 rounded"
              />
              <Button
                variant="destructive"
                className='mt-5 mb-7 w-full p-1'
                onClick={() => confirmDelete(art.id)}
              >
                <Trash className="w-4 h-4 mr-1" />
                Borrar imágen
              </Button>
            </div>
          )}

          {/* Campo para subir nueva imagen */}
          <div className="grid w-full max-w-sm items-center gap-3 mt-5">
            <Label htmlFor="image">Reemplazar imagen (opcional)</Label>
            <Input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => setData("image", e.target.files[0])}
            />
            {errors.image && (
              <small className="text-red-500">{errors.image}</small>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button disabled={processing} className="w-full">
            Guardar cambios
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

// Usa el mismo layout
EditPage.layout = (page) => (
  <GestionLayout children={page} title="Editar Artículo" />
);
