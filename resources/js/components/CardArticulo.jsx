import React from "react";
import { Card } from "./ui/card";
import { Eye, Edit, Trash } from "lucide-react";
import { truncarTexto } from "@/lib/truncar";
import OptionsButton from "./OptionsButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

const CardArticulo = ({ art, confirmDelete, options = true, className = "", children }) => {
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
        <div className={`w-auto sm:w-2/3 flex flex-col justify-between ${options? 'py-4 px-5' :'p-4'}`}>
          <div>
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">
                <span className="text-2xl mr-3">{art.nombre}</span>
                <span className="font-normal">{art.precio}€</span>
              </h2>
            </div>
            <p className={`text-muted-foreground text-sm mt-2`}>
              {truncarTexto(art.descripcion, 150)}
            </p>
            {children}
          </div>
        </div>
          {options && (
            <div className="flex justify-start m-2">
              <OptionsButton entity={art} actions={actions} />
            </div>
          )}
      </div>
    </Card>
  );
};

export default CardArticulo;
