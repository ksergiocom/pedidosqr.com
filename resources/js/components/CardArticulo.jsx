import React from "react";
import { Card } from "./ui/card";
import { Eye, Edit, Trash } from "lucide-react";
import { truncarTexto } from "@/lib/truncar";
import OptionsButton from "./OptionsButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

const CardArticulo = ({ art, confirmDelete, options = true, className = "" , children }) => {
  const actions = [
    {
      label: "Ver",
      icon: Eye,
      href: `/gestion/articulos/${art.id}`,
    },
    {
      label: "Editar",
      icon: Edit,
      href: `/gestion/articulos/${art.id}/editar`,
    },
    {
      label: "Eliminar",
      icon: Trash,
      onClick: () => confirmDelete(art.id),
      separatorBefore: true,
      variant: "destructive",
    },
  ];

  return (
    <Card className={`p-0 overflow-hidden h-full ${className}`}>
      <div className="flex flex-col sm:flex-row sm:h-full">
        <div className="sm:w-1/3 h-1/2 sm:h-full">
          <Dialog>
            <DialogTitle className="hidden">Descripcion imagen</DialogTitle>
            <DialogTrigger asChild>
              <img
                className="w-full h-full object-cover"
                src={art.image_url}
                alt={art.nombre}
              />
            </DialogTrigger>
            <DialogContent className='p-0 overflow-hidden'>
              <img
                className="w-full h-full object-cover"
                src={art.image_url}
                alt={art.nombre}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className={`relative w-auto sm:w-2/3 flex flex-col justify-between ${options ? 'py-4 px-5' : 'p-4'}`}>
          <div>
            {/* Contenedor título, precio y botón para pantallas pequeñas */}
<div className="flex justify-between items-center sm:hidden w-full">
  <h2 className="text-lg font-semibold flex items-center gap-3 max-w-[calc(100%-120px)] overflow-hidden whitespace-nowrap text-ellipsis">
    <span className="text-2xl truncate">{art.nombre}</span>
    <span className="font-normal flex-shrink-0">{art.precio}€</span>
  </h2>
  {options && (
    <OptionsButton entity={art} actions={actions} />
  )}
</div>

            {/* Contenedor título y precio para pantallas sm+ */}
            <div className="hidden sm:flex justify-start items-center gap-3">
              <h2 className="text-lg font-semibold flex items-center gap-3">
                <span className="text-2xl">{art.nombre}</span>
                <span className="font-normal">{art.precio}€</span>
              </h2>
            </div>

            <p className="text-muted-foreground text-sm mt-2">
              {truncarTexto(art.descripcion, 150)}
            </p>
            {children}
          </div>
        </div>

        {/* Botón opciones para pantallas sm+ */}
        {options && (
          <div className="hidden sm:flex justify-start m-2 sm:relative sm:bg-transparent rounded-lg">
            <OptionsButton entity={art} actions={actions} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default CardArticulo;
