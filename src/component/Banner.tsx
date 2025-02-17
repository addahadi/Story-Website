import { useEffect, useState } from "react";
import { db } from "@/utils/FirebaseConfig";
import { DetailsProp } from "@/utils/type.tsx";
import StoryCard from "@/component/StoryCard.tsx";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/component/ui/carousel"
import Autoplay from "embla-carousel-autoplay";

const useSpecificFetch = (Category: string) => {
  const [Data, setData] = useState<DetailsProp[]>([]);

  useEffect(() => {
    async function Fetch() {
      try {
        const querySnapshot = await db
          .collection("WrittenStories")
          .where("category", "==", Category).limit(10).get();
        const docs = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        return docs;
      } catch (error) {
        console.log(error);
      }
    }
    Fetch().then((result) => {
      setData(result as DetailsProp[]);
    });
  }, [Category]);

  return {
    Data,
    setData,
  };
};

const Banner = ({ Category }: { Category: string }) => {
  const { Data } = useSpecificFetch(Category);
  const [SortedData, setSortedData] = useState<DetailsProp[]>([]);
  useEffect(() => {
    const SSdarr = Data?.sort((a, b) => {
      return b.likes - a.likes;
    })
    setSortedData(SSdarr);
  }, [Data]);
  return (
    <div className="flex flex-col gap-5   w-full ">
      <h1 className="text-3xl  text-black-2 max-lg:text-2xl max-lg:font-semibold max-sm:text-xl max-sm:font-semibold">
        Top <span className="text-orange-1">{Category}</span> Stories
      </h1>
      <Carousel  className=" w-full" plugins={[Autoplay({delay:2000})]}
                 opts={{loop:true}}>
        <CarouselContent className=" p-4 flex gap-4 max-md:gap-0" >
          {SortedData.map((items) => {
            const { title } = items;
            const truncatedStr =
              title.length > 30 ? title.slice(0, 30) + "..." : title;
            return <StoryCard key={items.id} items={items} truncatedStr={truncatedStr} searchItem={true}/>;
          })}
        </CarouselContent>
        <CarouselPrevious className=" max-lg:hidden"/>
        <CarouselNext  className=" max-lg:hidden"/>
      </Carousel>
    </div>
  );
};

export default Banner;
