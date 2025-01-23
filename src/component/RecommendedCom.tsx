import { db } from "@/utils/FirebaseConfig";
import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";
import StoryCard from "./StoryCard";
import { DetailsProp } from "@/utils/type";

async function RecommendedFilter(
  title: string,
  category: string,
  tags: string[],
  storyId: string | undefined
) {
  try {
    const query = db
      .collection("WrittenStories")
      .where("category", "==", category);
    const snapshots = await query.limit(5).get();
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

    const SortedStories = ScoredStories.sort((a, b) => {
      return b.score - a.score;
    });
    return SortedStories;
  } catch (error) {
    console.log(error);
  }
}

interface StoriesProps extends DetailsProp {
  score: string;
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
    const data = RecommendedFilter(title, category, tag, storyId).then(
      (r: any) => {
        setReStories(r);
      }
    );
  }, [Data]);

  return (
    <section className=" mt-12 flex flex-col gap-4 ">
      <div>
        <h1 className=" text-2xl text-black-2 font-semibold">
          You may also like
        </h1>
      </div>
      <div className=" flex gap-3 items-center p-4">
        {reStories &&
          reStories.map((value) => {
            const { title } = value;
            const truncatedStr =
              title.length > 30 ? title.slice(0, 30) + "..." : title;
            return <StoryCard items={value} truncatedStr={truncatedStr} />;
          })}
      </div>
    </section>
  );
};

export default RecommendedCom;
