import React from "react";

import GestionLayout from "../../Layout/GestionLayout";
import { QRCodeSVG } from "qrcode.react";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";

const QrPage = (props) => {
    return <>
        <Link href='/gestion/mesas' >
            <Button variant='ghost' size='icon' className="mb-7">
                <MoveLeft></MoveLeft>
            </Button>
        </Link>
        <QRCodeSVG value={`/${props.mesa.id}`}></QRCodeSVG>
    </>
}

QrPage.layout = page => <GestionLayout children={page} title="Welcome" />

export default  QrPage