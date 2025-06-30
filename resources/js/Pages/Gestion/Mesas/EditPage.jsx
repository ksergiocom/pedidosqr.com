import React from "react";
import GestionLayout from "../../Layout/GestionLayout";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoveLeft } from "lucide-react";

function CreatePage(props) {
  const { data, setData, put, processing, errors } = useForm({
    nombre:  props.mesa.nombre,
  });

    function submit(e) {
        e.preventDefault()
        put(`/gestion/mesas/${props.mesa.id}/editar`)
    }

  return (
    <div className="flex flex-col w-sm">
        <h1 className="text-4xl font-semibold">Actualizar Mesa</h1>
      <p className="mt-2">
        Actualiza los datos de tu mesa. Seguirá manteniendo su QR único.
      </p>

      <form onSubmit={submit} className="mt-8 max-w-sm">
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            type="text"
            id="nombre"
            name="nombre"
            value={data.nombre}
            onChange={(e) => setData("nombre", e.target.value)}
          />
          {errors.nombre && <small className="text-red-500">{errors.nombre}</small>}
          <p className="text-sm text-muted-foreground">
            Este nombre es para uso interno. Se mostrará en la sección de pedidos para identificar de qué mesa proviene cada pedido.
          </p>
        </div>

        <Button disabled={processing} className="w-full mt-10">
          Actualizar
        </Button>
      </form>
    </div>
  );
}

CreatePage.layout = (page) => <GestionLayout children={page} title="Crear Mesa" />;

export default CreatePage;
