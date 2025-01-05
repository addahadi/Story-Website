import Card from "./Card"
import { useUser } from "@/context/UserCon"
import useFetch from "@/hooks/FetchProfileStr.tsx";
import StoryCard from "@/component/StoryCard.tsx";
import {DetailsProp} from "@/utils/type.tsx";
import {useNavigate} from "react-router-dom";
import { Icon } from "./Icon";
import { useState } from "react";



const Hero = () => {
  const {currentUser} = useUser()
  const {Data} = useFetch(currentUser ? currentUser.uid : "")
  const [color , setColor] = useState("#242424")
  const navigate = useNavigate()
    return (
      <div className=" flex flex-col gap-10 py-10 pb-14 max-w-[1000px] w-[1000px] mx-auto">
        <div className="flex flex-col gap-3">
          <h1 className=" text-4xl ">Your Stories</h1>
          <p className=" text-lg  text-white-2 ">
            Feel free to add more stories
          </p>
        </div>
        <div className="flex flex-row gap-1 flex-wrap h-fit px-4">
          <Card
            Classname=" flex justify-center items-center border-dashed border-2 border-black-2 rounded-md
          w-[220px] mt-3 h-[230px] hover:bg-orange-1 hover:border-none transition-colors duration-200 hover:text-white-1 cursor-pointer "
            onClick={() => {
              navigate("/new");
            }}
            onMouseEnter={() => setColor("#fff")}
            onMouseLeave={() => setColor("#242424")}
          >
            <Icon.plus Color={color} classes="w-[100px]" />
          </Card>
          {Data.map((value, index) => {
            const { title } = value;
            const truncatedStr =
              title.length > 30 ? title.slice(0, 30) + "..." : title;
            return (
              <StoryCard
                key={index}
                items={value as DetailsProp}
                truncatedStr={truncatedStr}
              />
            );
          })}
        </div>
      </div>
    );
}

export default Hero