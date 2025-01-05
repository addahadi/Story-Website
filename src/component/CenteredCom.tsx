import React from "react";


const CenteredCom = ({children} : {children : React.ReactNode}) => {
    return (
        <div className=" max-w-[1000px] m-auto">
            {children}
        </div>
    )
}
export default CenteredCom