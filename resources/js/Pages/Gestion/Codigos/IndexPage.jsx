import React, { useState, useRef } from "react";
import GestionLayout from "../../Layout/GestionLayout";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Trash, Edit, Eye, HandPlatter, QrCode } from "lucide-react";
import { Link, router, usePage } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import OptionsButton from "@/components/OptionsButton";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { openQrFullScreen } from "@/lib/utils";
import Title from "@/components/Title";
import TitleDescription from "@/components/TitleDescription";

function CodigosPage(props) {

  const baseUrl = usePage().props.appUrl

  const [showConfirm, setShowConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  // Ref para guardar SVG por cada codigo, en este caso un objeto { [codigoId]: ref }
  const qrRefs = useRef({});

  const confirmDelete = (id) => {
    setIdToDelete(id);
    setShowConfirm(true);
  };

  const handleDelete = () => {
    if (idToDelete) {
      router.visit(`/gestion/codigos/${idToDelete}`, {
        method: "delete",
      });
    }
  };

  return (
    <div className="flex flex-col max-w-3xl">
      <Title>Listado de codigos</Title>
      <TitleDescription className="mt-2 sm:mt-5">
        Aquí se pueden gestionar las codigos disponibles; agregar, eliminar y ver
        el código QR asignado a cada codigo.
      </TitleDescription>

      <Link className="mt-8" href="/gestion/codigos/crear">
          <Button variant='outline' className="sm:w-fit w-full">
              {/* <CirclePlus /> */}
              <span>Agregar codigo</span>
          </Button>
      </Link>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {props.codigos.map((codigo) => {
          // Guardamos el ref para cada QR
          if (!qrRefs.current[codigo.id]) {
            qrRefs.current[codigo.id] = null;
          }

          const actions = [
            {
              label: "Ver",
              icon: Eye,
              disabled: true,
              href: `/gestion/codigos/${codigo.id}`,
            },
            {
              label: "Editar",
              icon: Edit,
              href: `/gestion/codigos/${codigo.id}/editar`,
            },
            {
              label: "Pedir",
              icon: HandPlatter,
              href: `/${codigo.id}`,
            },
            {
              label: "Imprimir",
              icon: QrCode,
              onClick: () => openQrFullScreen(codigo, qrRefs),
            },
            {
              label: "Eliminar",
              icon: Trash,
              onClick: () => confirmDelete(codigo.id),
              separatorBefore: true,
              variant: "destructive",
            },
          ];

          return (
              <AspectRatio key={codigo.id}  ratio={1 / 1}>
                <Card className="m-0 p-0 h-full w-full relative overflow-hidden">
            {/* <Link  href={`/gestion/codigos/${codigo.id}`}> */}
                  <div className="absolute inset-0 flex items-center justify-center">

                    <QRCodeSVG
                      value={`${baseUrl}/${codigo.id}`}
                      className="w-4/6 h-4/6"
                      ref={(el) => (qrRefs.current[codigo.id] = el)}
                    />
                  </div>
            {/* </Link> */}
                  <div className="absolute flex items-center top-1 right-1 z-10">
                    <OptionsButton entity={codigo} actions={actions} />
                  </div>
                  <h2 className="absolute bottom-3 inset-x-0 z-10 opacity-70 text-sm text-muted-foreground text-center">{codigo.nombre}</h2>
                </Card>
              </AspectRatio>

          );
        })}


      </div>
              {props.codigos.length < 1 ?
        <p className="text-lg opacity-30 tracking-tighter mt-5 w-full">No hay códigos QR registrados</p>:''}

      <ConfirmDialog
        title="¿Estás seguro?"
        description="¡Cuidado! Esta acción eliminará la codigo seleccionada. Esta operación no se puede deshacer."
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false);
          handleDelete();
        }}
      />
    </div>
  );
}

CodigosPage.layout = (page) => <GestionLayout children={page} title="Gestión de codigos" />;

export default CodigosPage;
