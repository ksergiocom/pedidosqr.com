import React from "react";
import { Link, useForm } from "@inertiajs/react";
import GestionLayout from "../../Layout/GestionLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";

export default function EditPage({ articulo }) {
  const { data, setData, post, processing, errors } = useForm({
    nombre: articulo.nombre || "",
    precio: articulo.precio || "",
    descripcion: articulo.descripcion || "",
    image: null,
    _method: "put",
  });

  function submit(e) {
    e.preventDefault();
    post(`/gestion/articulos/${articulo.id}/editar`);
  }

  function deleteImage() {
    if (confirm("¿Eliminar la imagen actual?")) {
      post(
        `/gestion/articulos/${articulo.id}/imagen/eliminar`,
        { _method: "delete" },
        { preserveScroll: true }
      );
    }
  }

  return (
    <div className="flex flex-col w-xl">
      <h1 className="text-4xl font-semibold">Editar Artículo</h1>
      <p className="mt-2">Modifica los datos de tu artículo existente</p>

      <form
        onSubmit={submit}
        encType="multipart/form-data"
        className="mt-8 max-w-sm flex flex-col gap-6"
      >
        {/* Nombre */}
        <div className="grid w-full items-center gap-3">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            type="text"
            name="nombre"
            value={data.nombre}
            onChange={(e) => setData("nombre", e.target.value)}
          />
          {errors.nombre && (
            <small className="text-red-500 text-sm">{errors.nombre}</small>
          )}
          <p className="text-sm text-muted-foreground">
            Este nombre será el que se muestre en el menú al cliente
          </p>
        </div>

        {/* Precio */}
        <div className="grid w-full items-center gap-3">
          <Label htmlFor="precio">Precio</Label>
          <Input
            id="precio"
            type="number"
            step="0.01"
            name="precio"
            value={data.precio}
            onChange={(e) => setData("precio", e.target.value)}
          />
          {errors.precio && (
            <small className="text-red-500 text-sm">{errors.precio}</small>
          )}
          <p className="text-sm text-muted-foreground">
            Este será el precio mostrado en el menú al cliente. Se guardará siempre con 2 decimales.
          </p>
        </div>

        {/* Descripción */}
        <div className="grid w-full items-center gap-3">
          <Label htmlFor="descripcion">Descripción</Label>
          <Textarea
            id="descripcion"
            name="descripcion"
            placeholder="Opcional"
            value={data.descripcion}
            onChange={(e) => setData("descripcion", e.target.value)}
          />
          {errors.descripcion && (
            <small className="text-red-500 text-sm">{errors.descripcion}</small>
          )}
          <p className="text-sm text-muted-foreground">
            La descripción es opcional pero recomendable. En el menú se mantiene oculta dentro de la sección desplegable hasta que el cliente la despliega.
          </p>
        </div>

        <Separator className="my-5" />

        {/* Imagen actual y borrar */}
        {articulo.image_url && (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">
              Esta es la imagen actualmente guardada para el artículo.
            </p>
            <img
              src={articulo.image_url}
              alt={articulo.nombre}
              className="w-full h-auto rounded"
            />
            <Button
              variant="destructive"
              onClick={deleteImage}
              className="w-full"
            >
              <Trash className="w-4 h-4 mr-1" />
              Borrar imagen
            </Button>
          </div>
        )}

        <Separator className="my-5" />

        {/* Reemplazar imagen */}
        <div className="grid w-full items-center gap-3">
          <Label htmlFor="image">Reemplazar imagen (opcional)</Label>
          <Input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setData("image", e.target.files[0])}
          />
          {errors.image && (
            <small className="text-red-500 text-sm">{errors.image}</small>
          )}
          <p className="text-sm text-muted-foreground">
            Puedes subir una nueva imagen para reemplazar la actual. Si no eliges ninguna, se mantendrá la existente.
          </p>
        </div>

        {/* Botón Guardar */}
        <div className="flex flex-col gap-3 mt-10">
          <Button disabled={processing} type="submit" className="w-full">
            Guardar cambios
          </Button>
        </div>
      </form>
    </div>
  );
}

EditPage.layout = (page) => (
  <GestionLayout children={page} title="Editar Artículo" />
);
