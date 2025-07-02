import React from "react";
import { Card } from "./ui/card";
import { Eye, Edit, Trash } from "lucide-react";
import { truncarTexto } from "@/lib/truncar";
import OptionsButton from "./OptionsButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const CardArticulo = ({
  art,
  confirmDelete,
  options = true,
  className = "",
  children,
}) => {
  const actions = [
    { label: "Ver", icon: Eye, href: `/gestion/articulos/${art.id}` },
    { label: "Editar", icon: Edit, href: `/gestion/articulos/${art.id}/editar` },
    {
      label: "Eliminar",
      icon: Trash,
      onClick: () => confirmDelete(art.id),
      separatorBefore: true,
      variant: "destructive",
    },
  ];

  const limite = 150;
  const estaTruncada = art.descripcion.length > limite;
  const descTrunc = truncarTexto(art.descripcion, limite);

  return (
    <Card className={`p-0 overflow-hidden h-full ${className}`}>
      <div className="flex flex-col sm:flex-row h-full min-h-0">
        {/* IMAGEN: siempre full height */}
        <div className="w-full sm:w-1/3 h-full">
          <Dialog>
            <DialogTitle className="hidden">Descripción imagen</DialogTitle>
            <DialogTrigger asChild>
              <img
                src={art.image_url}
                alt={art.nombre}
                className="w-full h-full object-cover"
              />
            </DialogTrigger>
            <DialogContent className="p-0 overflow-hidden">
              <img
                src={art.image_url}
                alt={art.nombre}
                className="w-full h-auto object-cover"
              />
              <p className="p-4">{art.descripcion}</p>
            </DialogContent>
          </Dialog>
        </div>

        {/* TEXTO */}
        <div
          className={`w-full sm:w-2/3 flex flex-col justify-between ${
            options ? "py-4 px-5" : "p-4"
          }`}
        >
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-semibold truncate">
                {art.nombre}
              </h2>
              {options && <OptionsButton entity={art} actions={actions} />}
            </div>

            {estaTruncada ? (
              <Accordion type="single" collapsible className="mt-2">
                <AccordionItem value="desc">
                  <AccordionTrigger className="p-0 text-sm font-medium text-muted-foreground text-left">
                    {descTrunc}
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 text-sm text-muted-foreground">
                    {art.descripcion}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <p className="text-sm text-muted-foreground">
                {art.descripcion}
              </p>
            )}
          </div>

          {children}
        </div>
      </div>
    </Card>
  );
};

export default CardArticulo;
