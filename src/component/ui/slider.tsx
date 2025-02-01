
import {motion , useScroll} from "framer-motion";

const Slider = ({isliding} : {isliding : boolean}) => {
    const { scrollYProgress } = useScroll()
    return (
        <>
            {
                isliding && (<motion.div  style={{scaleX: scrollYProgress, position: "sticky", top: 70, left: 0, right: 0, height: 10, originX: 0, backgroundColor: "#8266c9"}}></motion.div>)
            }
        </>
    )
}


export default Slider