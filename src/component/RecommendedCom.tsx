import { db } from "@/utils/FirebaseConfig";
import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";
import StoryCard from "./StoryCard";
import { DetailsProp } from "@/utils/type";
import {Carousel, CarouselContent, CarouselNext, CarouselPrevious} from "@/component/ui/carousel.tsx";
import Autoplay from "embla-carousel-autoplay";



interface StoriesProps extends DetailsProp {
  score: string;
}


async function RecommendedFilter(
  title: string,
  category: string,
  tags: string[],
  storyId: string | undefined
) : Promise<StoriesProps[] | undefined> {
  try {
    const query = db
      .collection("WrittenStories")
      .where("category", "==", category);
    const snapshots = await query.limit(10).get();
    const stories = snapshots.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    const ScoredStories = stories
      .filter((story) => {
        return story.id != storyId;
      })
      .map((story: firebase.firestore.DocumentData) => {
        let score = 0;
        score += 2;

        const targetstory = story.tag.filter((tAg: string) => {
          return tags.includes(tAg);
        });

        score += targetstory.length;

        if (story.title.toLowerCase().includes(title.toLowerCase())) {
          score += 0.5;
        }

        return { ...story, score };
      });

    const SortedStories : unknown = ScoredStories.sort((a, b) => {
      return b.score - a.score;
    });
    return SortedStories as StoriesProps[];
  } catch (error) {
    console.log(error);
  }
}


const RecommendedCom = ({
  Data,
  storyId,
}: {
  Data: firebase.firestore.DocumentData | undefined;
  storyId: string | undefined;
}) => {
  const [reStories, setReStories] = useState<Array<StoriesProps>>([]);

  useEffect(() => {
    if (!Data) return;
    const { tag, title, category } = Data;
    RecommendedFilter(title, category, tag, storyId).then(
      (r) => {
        if(r){
        setReStories(r);
        }
      }
    );
  }, [Data , storyId]);

  return (
    <div className=" mt-12 flex flex-col gap-4 px-4">
      <div>
        <h1 className=" text-2xl text-black-2 font-semibold">
          You may also like
        </h1>
      </div>
      <Carousel plugins={[Autoplay({delay:2000})]}
                opts={{loop:true}}>
        <CarouselContent className=" flex gap-4 max-md:gap-1 max-sm:gap-0 items-center p-4">
          {reStories &&
            reStories.map((value) => {
              const { title } = value;
              const truncatedStr =
                title.length > 30 ? title.slice(0, 30) + "..." : title;
              return <StoryCard key={value.id} items={value} truncatedStr={truncatedStr}  searchItem={false}/>;
            })}
        </CarouselContent>
        <CarouselPrevious className=" max-lg:hidden"/>
        <CarouselNext className="max-lg:hidden"/>
      </Carousel>
    </div>
  );
};

export default RecommendedCom;
