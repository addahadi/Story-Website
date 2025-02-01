import { PopupProp } from "@/utils/type";
import React from "react";
import  cn  from "classnames";
import {AnimatePresence , motion} from "framer-motion";
const Popup = React.forwardRef<HTMLDivElement,PopupProp<boolean>>(({children , open , ...props }) => {
    
  return (
      <AnimatePresence>
          {open && (
              <motion.div
                  initial={{ opacity: 0}}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={cn("absolute  top-10 left-0")}>
                <div className=" z-50 shadow-custom-equal w-full px-4 py-2 bg-white-1 rounded-md" {...props}>
                    {children}
                </div>
              </motion.div>
          )}
      </AnimatePresence>

  )
});

export default Popup