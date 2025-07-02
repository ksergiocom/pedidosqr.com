import React from "react";

const CustomFooter = (props) => {
    return <footer className={"mt-5 text-sm text-muted-foreground "+props.className}>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-xs text-balance">
            © 2025 <a className="no-underline" href="/">PedidosQR</a> Todos los derechos reservados.<br></br> Puedes consultar nuestros <a className="underline underline-offset-4" href="#">Términos de servicio</a> y <a className="underline underline-offset-4" href="#">Política de privacidad</a>.
        </div>
    </footer>
}

export default CustomFooter;