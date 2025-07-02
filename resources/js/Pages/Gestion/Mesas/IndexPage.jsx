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

function MesasPage(props) {

  const baseUrl = usePage().props.appUrl

  const [showConfirm, setShowConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  // Ref para guardar SVG por cada mesa, en este caso un objeto { [mesaId]: ref }
  const qrRefs = useRef({});

  const confirmDelete = (id) => {
    setIdToDelete(id);
    setShowConfirm(true);
  };

  const handleDelete = () => {
    if (idToDelete) {
      router.visit(`/gestion/mesas/${idToDelete}`, {
        method: "delete",
      });
    }
  };

  return (
    <div className="flex flex-col max-w-3xl">
      <Title>Listado de mesas</Title>
      <TitleDescription className="mt-2 sm:mt-5">
        Aquí se pueden gestionar las mesas disponibles; agregar, eliminar y ver
        el código QR asignado a cada mesa.
      </TitleDescription>

      <Link className="mt-8" href="/gestion/mesas/crear">
          <Button variant='outline' className="sm:w-fit w-full">
              {/* <CirclePlus /> */}
              <span>Agregar mesa</span>
          </Button>
      </Link>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {props.mesas.map((mesa) => {
          // Guardamos el ref para cada QR
          if (!qrRefs.current[mesa.id]) {
            qrRefs.current[mesa.id] = null;
          }

          const actions = [
            {
              label: "Ver",
              icon: Eye,
              href: `/gestion/mesas/${mesa.id}`,
            },
            {
              label: "Editar",
              icon: Edit,
              href: `/gestion/mesas/${mesa.id}/editar`,
            },
            {
              label: "Pedir",
              icon: HandPlatter,
              href: `/${mesa.id}`,
            },
            {
              label: "Imprimir",
              icon: QrCode,
              onClick: () => openQrFullScreen(mesa, qrRefs),
            },
            {
              label: "Eliminar",
              icon: Trash,
              onClick: () => confirmDelete(mesa.id),
              separatorBefore: true,
              variant: "destructive",
            },
          ];

          return (
            <Link key={mesa.id} href={`/gestion/mesas/${mesa.id}`}>
              <AspectRatio  ratio={1 / 1}>
                <Card className="m-0 p-0 h-full w-full relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <QRCodeSVG
                      value={`${baseUrl}/${mesa.id}`}
                      className="w-4/6 h-4/6"
                      ref={(el) => (qrRefs.current[mesa.id] = el)}
                    />
                  </div>
                  <div className="absolute flex items-center top-1 right-1 z-10">
                    <OptionsButton entity={mesa} actions={actions} />
                  </div>
                  <h2 className="absolute bottom-3 inset-x-0 z-10 opacity-70 text-sm text-muted-foreground text-center">{mesa.nombre}</h2>
                </Card>
              </AspectRatio>
            </Link>
          );
        })}
      </div>

      <ConfirmDialog
        title="¿Estás seguro?"
        description="¡Cuidado! Esta acción eliminará la mesa seleccionada. Esta operación no se puede deshacer."
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

MesasPage.layout = (page) => <GestionLayout children={page} title="Gestión de mesas" />;

export default MesasPage;
