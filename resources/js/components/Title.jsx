import React from "react";

const Title = ({children, className}) => {
    return <h1 className={"text-2xl sm:text-4xl font-semibold "+className}>{children}</h1>
}

export default Title