import useFetch from "@/hooks/FetchProfileStr.tsx";
import {Link, useParams} from "react-router-dom";
import { useState} from "react";
import { useUser } from "@/context/UserCon";
import { Icon } from "@/component/ui/Icon.tsx";
import {motion} from "framer-motion";
import AlertCom from "@/component/ui/AlertCom.tsx";
const About = () => {
    const {profileId} = useParams()
    const {Data} = useFetch(profileId ? profileId : "" );
    const {currentUser} = useUser()
    const [color , setColor] = useState('#242424')
    const [storyId , setStoryId] = useState("");
    const [isdelete , setIsdelete] = useState(false)

    return (
        <div
            className=" flex-1 flex flex-col gap-8 max-lg:gap-5 max-md:gap-3">
            {Data ? Data.map((item, index) => {
                const truncatedStr = item.desc.length > 100 ? item.desc.slice(0, 150) + "..." : item.desc
                return (
                  <motion.div
                      initial={{scale : 0}}
                      animate={{scale : 1}}
                      transition={{delay:1.4}}
                      key={index} className=" relative w-full px-4 py-6  bg-white-3 flex flex-row gap-4 items-center max-lg:py-10" >
                    <img src={item.ImgUrl} width={150}  className=" rounded-md h-full max-sm:hidden"/>
                    <div className="flex flex-col gap-3 ">
                      <h1 className="text-lg font-bold text-black-2">
                        {item.title}
                      </h1>
                      <p className=" text-black-2 leading-6 max-w-[600px]" style = {{overflowWrap : "break-word"}}>
                        {truncatedStr}
                      </p>
                      <div className="mt-2 flex flex-wrap w-fit">
                        {item.tag.map((value: string) => {
                          return (
                            <span key={value} className="inline-block  bg-orange-2 border border-black-2  text-black-2 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                              {value}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                      {
                          currentUser?.uid == profileId &&
                              (<motion.div
                                  onClick={() => {
                                      setIsdelete(!isdelete)
                                      setStoryId(item.id)
                                  }}
                                  whileHover={{backgroundColor : "#8266c9"}}
                                  className="absolute right-2 top-2 cursor-pointer p-2 rounded-full">
                                  <img src="../../public/delete.svg" width={20}/>
                              </motion.div>)
                      }
                  </motion.div>
                );
            }) :
            <div className=" w-full h-[300px] flex justify-center items-center">
                <img src="../../public/person-sitting.png"  width={200} />
            </div>}
            {
                currentUser?.uid == profileId ? <Link to='/new' onMouseEnter={() => setColor("#fff")} onMouseLeave={() => setColor("#242424")} 
                className="flex justify-center py-10 items-center border-dashed border-2 p-4 border-black-2 w-full  hover:bg-orange-1 hover:border-none transition-colors duration-400 cursor-pointer">
                <Icon.plus classes="w-[100px]" Color={color} />
            </Link> : ""
            }
            <AlertCom storyId={storyId}  isdelete={isdelete} setIsdelete={setIsdelete}/>
        </div>
    )
}
export default About;