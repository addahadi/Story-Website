import Hero from "@/component/Hero";
import Banner from "@/component/Banner.tsx";


const Feed = () => {
  
  return (
    <div className=" mx-auto flex flex-col  gap-24">
        <div className="w-full shadow-xl">
            <Hero/>
        </div>
        <div className="w-[1000px] max-w-[1000px] mx-auto flex flex-col gap-20 ">
            <Banner Category="Adventure" />
            <Banner Category="Fantasy"/>
            <Banner Category="Romance"/>
        </div>

    </div>
  );
}

export default Feed