import Card from "./Card"
import { useUser } from "@/context/UserCon"
import useFetch from "@/hooks/FetchProfileStr.tsx";
import StoryCard from "@/component/StoryCard.tsx";
import {DetailsProp} from "@/utils/type.tsx";
import {useNavigate} from "react-router-dom";
import { Icon } from "./ui/Icon.tsx";
import { useState } from "react";
import {Carousel, CarouselContent, CarouselNext, CarouselPrevious} from "@/component/ui/carousel.tsx";
import Autoplay from "embla-carousel-autoplay";



const Hero = () => {
  const {currentUser} = useUser()
  const {Data} = useFetch(currentUser ? currentUser.uid : "")
  const [color , setColor] = useState("#242424")
  const navigate = useNavigate()
    return (
      <div className=" flex flex-col gap-10 py-10 pb-14  max-w-[1200px]  mx-auto  px-4 md:px-10 max-md:gap-2 ">
        <div className="flex flex-col gap-3">
          <h1 className=" text-4xl  max-lg:text-3xl max-sm:text-2xl font-semibold">Your Stories</h1>
          <p className=" md:text-lg    text-white-2 ">
            your latest stories
          </p>
        </div>
        <Carousel  className=" w-full lg:hidden"
        plugins={[Autoplay({delay:2000})]}
        opts={{loop:true}}
        >
              <CarouselContent className=" p-4 flex gap-4 max-md:gap-0" >
                  {Data.map((value) => {
                          const { title } = value;
                          const truncatedStr =
                              title.length > 30 ? title.slice(0, 30) + "..." : title;
                          return (
                              <StoryCard
                                  key={value.id}
                                  items={value as DetailsProp}
                                  truncatedStr={truncatedStr}
                                  searchItem={true}
                              />
                          );
                  })}
              </CarouselContent>
              <CarouselPrevious className=" max-lg:hidden"/>
              <CarouselNext  className=" max-lg:hidden"/>
          </Carousel>


        <div className="flex flex-row gap-1 flex-wrap h-fit px-4 w-full overflow-hidden max-lg:hidden">
          <Card
            Classname=" flex justify-center items-center border-dashed border-2 border-black-2 rounded-md
          w-[220px] mt-3 h-[230px]  hover:bg-orange-1 hover:border-none transition-colors duration-200 hover:text-white-1 cursor-pointer "
            onClick={() => {
              navigate("/new");
            }}
            onMouseEnter={() => setColor("#fff")}
            onMouseLeave={() => setColor("#242424")}
          >
            <Icon.plus Color={color} classes="w-[100px]" />
          </Card>
          {Data.map((value, index) => {
              if(index < 3){
                const { title } = value;
                const truncatedStr =
                  title.length > 30 ? title.slice(0, 30) + "..." : title;

                return (
                  <StoryCard
                    key={value.id}
                    items={value as DetailsProp}
                    truncatedStr={truncatedStr}
                    searchItem={true}
                  />
                );
              }
          })}
        </div>
      </div>
    );
}

export default Hero