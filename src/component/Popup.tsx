import { PopupProp } from "@/utils/type";
import React from "react";
import  cn  from "classnames";
const Popup = React.forwardRef<HTMLDivElement,PopupProp<boolean>>(({children , open , ...props }) => {
    
  return (
      <div className={cn("absolute  top-10 left-0",{
          " hidden": !open
      })}>
          <div className="relative">
              <div className=" z-50 shadow-custom-equal w-full px-4 py-2 bg-white-1 rounded-md" {...props}>
                  {children}
              </div>
          </div>

      </div>
  )
});

export default Popup