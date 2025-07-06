import React from "react";
import { Card } from "./ui/card";
import { Eye, Edit, Trash, ImageOff } from "lucide-react";
import OptionsButton from "./OptionsButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

const CardArticulo = ({
  art,
  confirmDelete,
  options = true,
  className = "",
  children,
}) => {
  const actions = [
    { label: "Ver", icon: Eye, href: `/gestion/articulos/${art.id}`, disabled: true },
    { label: "Editar", icon: Edit, href: `/gestion/articulos/${art.id}/editar` },
    {
      label: "Eliminar",
      icon: Trash,
      onClick: () => confirmDelete(art.id),
      separatorBefore: true,
      variant: "destructive",
    },
  ];

  const [imageError, setImageError] = React.useState(false);

  return (
    <Card className={`p-0 overflow-hidden ${className}`}>
      <div className="flex flex-col sm:flex-row h-full">
        {/* IMAGEN */}
        <div className="w-full sm:w-1/3 sm:aspect-square sm:overflow-hidden">
          {art.image_url && !imageError ? (
  <Dialog>
    <DialogTitle className="hidden">Descripción imagen</DialogTitle>
    <DialogTrigger asChild>
      <img
        src={art.image_url}
        alt={art.nombre}
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
      />
    </DialogTrigger>
    <DialogContent className="p-0 overflow-hidden">
      <img
        src={art.image_url}
        alt={art.nombre}
        className="w-full h-auto object-cover"
      />
    </DialogContent>
  </Dialog>
) : (
  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
    <ImageOff className="w-12 h-12 text-white opacity-80" />
  </div>
)}
        </div>

        {/* TEXTO */}
        <div
          className={`w-full sm:w-2/3 flex flex-col justify-between ${options ? "py-4 px-5" : "p-4"
            }`}
        >
          <div>
            <div className="flex justify-between mb-2">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold truncate">{art.nombre}</h2>
                <h3 className="text-2xl">{art.precio}€</h3>
              </div>
              {options && <OptionsButton entity={art} actions={actions} />}
            </div>

            {/* Descripción completa sin acordeón */}
            <p className="text-balance text-sm text-muted-foreground">
              {art.descripcion}
            </p>
          </div>

          {children}
        </div>
      </div>
    </Card>
  );
};

export default CardArticulo;
