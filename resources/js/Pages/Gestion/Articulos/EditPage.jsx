import React, { useState } from "react";
import { Link, useForm, router } from "@inertiajs/react";
import GestionLayout from "../../Layout/GestionLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ImageOff, Trash } from "lucide-react";
import Title from "@/components/Title";
import TitleDescription from "@/components/TitleDescription";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function EditPage({ articulo }) {
  const { data, setData, post, processing, errors } = useForm({
    nombre: articulo.nombre || "",
    precio: articulo.precio || "",
    descripcion: articulo.descripcion || "",
    image: null,
    _method: "put",
  });

  const [showConfirmImageDelete, setShowConfirmImageDelete] = useState(false);

  function submit(e) {
    e.preventDefault();
    post(`/gestion/articulos/${articulo.id}/editar`);
  }

  function confirmDeleteImage() {
    setShowConfirmImageDelete(true);
  }

  function handleDeleteImage() {
    router.delete(
      `/gestion/articulos/${articulo.id}/imagen/eliminar`,
      { preserveScroll: true }
    );
    setShowConfirmImageDelete(false);
  }

  return (
    <div className="flex flex-col max-w-xl">
      <Title>Editar Artículo</Title>
      <TitleDescription className="mt-2">
        Modifica los datos de tu artículo existente
      </TitleDescription>

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
            La descripción es opcional, pero muy recomendable. Aunque ya no aparece en un menú desplegable, sigue siendo muy importante escribir una descripción atractiva y bien cuidada: ayuda a informar mejor al cliente y aumenta las posibilidades de concretar la venta.
          </p>
        </div>

        <Separator className="my-5" />

        {/* Imagen actual y borrar */}
        {articulo.image_url ? (
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
              type="button"
              onClick={confirmDeleteImage}
              className="w-full"
            >
              <Trash className="w-4 h-4 mr-1" />
              Borrar imagen
            </Button>
          </div>
        ) :
          (
            <div className="w-full min-h-[30vh] h-full bg-gray-200 flex items-center justify-center">
              <div className="flex flex-col gap-3 justify-center ites-center text-center">
              <ImageOff className="mx-auto w-12 h-12 text-white opacity-80" />
              <p className="mx-auto text-gray-400">Sin imágen</p>
              </div>
            </div>
          )}

        <Separator className="my-5" />

        {/* Reemplazar imagen */}
        <div className="grid w-full items-center gap-3">
          <Label htmlFor="image">Reemplazar imagen (opcional)</Label>
          <input
            id="image"
            type="file"
            name="image"
            className="border rounded-sm p-1 px-2 text-gray-400"
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
        <Button disabled={processing} type="submit" className="w-full mt-9 mb-6">
          Actualizar
        </Button>
      </form>

      <ConfirmDialog
        title="¿Eliminar imagen?"
        description="Esta acción eliminará la imagen actual del artículo. No podrá deshacerse. ¿Quieres continuar?"
        open={showConfirmImageDelete}
        onCancel={() => setShowConfirmImageDelete(false)}
        onConfirm={handleDeleteImage}
      />
    </div>
  );
}

EditPage.layout = (page) => (
  <GestionLayout children={page} title="Editar Artículo" />
);
