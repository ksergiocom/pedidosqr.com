import React from "react";

const TitleDescription = ({children, className}) => {
    return <p className={"text-muted-foreground font-light text-sm sm:text-base "+className}>{children}</p>
}

export default TitleDescription