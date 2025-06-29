import React from "react";

const CustomFooter = () => {
    return <footer className="pt-8 text-sm text-muted-foreground">
        <div className="text-muted-foreground *:[a]:hover:text-primary text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 mt-2">
            Puedes consultar nuestros <a href="#">Términos de servicio</a> y <a href="#">Política de privacidad</a>.
        </div>
    </footer>
}

export default CustomFooter;