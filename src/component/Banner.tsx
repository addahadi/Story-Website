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
    <section className="flex flex-col gap-5 w-full">
      <h1 className="text-3xl  text-black-2">
        Top <span className="text-orange-1">{Category}</span> Stories
      </h1>
      <Carousel>
        <CarouselContent className=" p-4 flex gap-4 ">
          {SortedData.map((items) => {
            const { title } = items;
            const truncatedStr =
              title.length > 30 ? title.slice(0, 30) + "..." : title;
            return <StoryCard items={items} truncatedStr={truncatedStr} />;
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default Banner;
