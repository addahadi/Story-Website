import useFetch from "@/hooks/FetchProfileStr.tsx";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { useUser } from "@/context/UserCon";
import { Icon } from "@/component/Icon";


const About = () => {
    const {profileId} = useParams()
    const {Data} = useFetch(profileId ? profileId : "" );
    const {currentUser} = useUser()
    const [color , setColor] = useState('#242424')
    useEffect(() => {
        console.log(Data)
    }, [Data]);



    return (
        <div className=" flex-1 flex flex-col gap-12 ">
            {Data.map((item, index) => {
                const truncatedStr = item.desc.length > 100 ? item.desc.slice(0, 150) + "..." : item.desc
                return (
                  <div key={index} className=" w-full px-4 py-6 overflow-hidden bg-white-3 flex flex-row gap-4 items-center">
                    <img src={item.ImgUrl} width={150}  className=" rounded-md h-full"/>
                    <div className="flex flex-col gap-3 ">
                      <h1 className="text-lg font-bold text-black-2">
                        {item.title}
                      </h1>
                      <p className=" text-black-2 leading-6 w-[600px]">
                        {truncatedStr}
                      </p>
                      <div className="mt-2 flex flex-wrap w-fit">
                        {item.tag.map((value: string) => {
                          return (
                            <span className="inline-block  bg-orange-2 border border-black-2  text-black-2 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                              {value}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
            })}
            {
                currentUser?.uid == profileId ? <Link to='/new' onMouseEnter={() => setColor("#fff")} onMouseLeave={() => setColor("#242424")} 
                className="flex justify-center py-10 items-center border-dashed border-2 p-4 border-black-2 w-full  hover:bg-orange-1 hover:border-none transition-colors duration-400 cursor-pointer">
                <Icon.plus classes="w-[100px]" Color={color} />
            </Link> : ""
            }
            
        </div>
    )
}
export default About;