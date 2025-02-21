import Hero from "@/component/Hero";
import Banner from "@/component/Banner.tsx";


const Feed = () => {
  
  return (
    <div className=" w-full mx-auto flex flex-col  gap-24 ">
        <div className="w-full shadow-xl">
            <Hero/>
        </div>
        <div className=" max-w-[1000px] w-full  mx-auto flex flex-col gap-20 px-4 ">
            <Banner Category="adventure" />
            <Banner Category="comedy"/>
        </div>

    </div>
  );
}

export default Feed