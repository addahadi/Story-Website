import { CardProps } from "@/utils/type";
import React from "react"

const Card = React.forwardRef<HTMLDivElement,CardProps>(({Classname = '' , children , ...props}) => {
  return (
    <div {...props} className={` ${Classname} `}>
      {children}
    </div>
  );
});

export default Card