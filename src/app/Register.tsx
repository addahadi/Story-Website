
import {useEffect, useState} from "react";
import AuthPopup from "@/component/AuthPopup.tsx";
import {gsap} from "gsap"
import { SplitText } from "gsap/SplitText";
import { Button } from "@/component/ui/button";
import { BatteryChargingIcon } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText)
gsap.registerPlugin(ScrollTrigger)
const Register = () => {
    const [isopen , setIsopen] = useState(false);
    const [isLogin , setIsLogin] = useState(false);

    useEffect(() => {
      let split : SplitText | null = null;
      let featureAnimation : gsap.core.Tween | null = null;
      const runHeroAnimation = async () => {
        // revert previous split before creating a new one
        if (split) split.revert();

        split = new SplitText(".paragraph", { type: "words,chars" });

        // random borders
        

        // create GSAP tween
        await gsap.from(split.chars, {
          opacity: 0,
          yPercent: "random([-30,30])",
          rotation: "random([-90,90])",
          autoAlpha: 0,
          ease: "back.inOut",
          stagger: {
            from: "random",
            amount: 0.5,
            grid: "auto",
          },
          duration: 1.2, 
        });

        split.words.forEach((word) => {
          if (Math.random() < 0.3) {
            word.classList.add("underlineWords");
          } else {
            word.style.border = "none";
          }
        });

        gsap.to(" .underlineWords", {
          border: "4px solid #fb923c",
          ease: "back.inOut",
          duration:0.3,
        })
      };

      const circle = gsap.from(".circle" , {
        ease: "back.inOut",
        repeat:-1,
        yoyo:true,
        duration:2,
        y:400, 
        x:100
      })
      const rectangle = gsap.from(".rectangle", {
        ease: "back.inOut",
        repeat: -1,
        yoyo: true,
        rotate:"100%",
        duration: 2,
        x: -400,
      });
      const featureAnimations = gsap.utils
        .toArray(".feature-text")
        .map((el : any, i) => {
          return gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: "top 80%", // when element enters viewport
            },
            x: i % 2 === 0 ? -100 : 100, // alternate left/right
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          });
        });

      // Run immediately
      runHeroAnimation();

      // Repeat every 5 seconds
      const interval = setInterval(runHeroAnimation, 5000);

      return () => {
        clearInterval(interval);
        if (split) split.revert();
        if(featureAnimations) featureAnimations.map((anim : any) => anim.kill());
        if(circle) circle.kill()
        if(rectangle) rectangle.kill()
      };
    }, []);

    return (
      <div className=" w-full  h-screen bg-white-1">
        <header className=" max-w-[1200px] m-auto pt-8 flex justify-between">
          <div className="flex flex-row gap-2 items-center">
            <img src="/Story-Website/logo.svg" width={50} height={50} />
            <h1 className="text-2xl font-bold text-black-2">Story Teller</h1>
          </div>
          <div
            className=" flex flex-row gap-6 text-gray-800 items-center
          font-semibold 
          
          "
          >
            <span className="hover:underline cursor-pointer">About Us</span>
            <span className="hover:underline cursor-pointer">Features</span>
            <span className="hover:underline cursor-pointer">Contact</span>
          </div>
          <Button className=" bg-orange-1 flex flex-row items-center">
            <BatteryChargingIcon className="  size-4" />
            <span className="text-white">Get Started</span>
          </Button>
        </header>
        <main className="min-h-screen  m-auto w-[800px] flex justify-center items-center flex-col">
          <div>
            <img src="/Story-Website/logo.svg" width={200} height={400} />
          </div>
          <div className=" mt-12 flex flex-col items-center">
            <h1 className=" paragraph w-full  leading-relaxed text-5xl font-bold text-black-2 text-center ">
              Story Teller AI-Powered Storytelling Platform
            </h1>
          </div>
        </main>
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="  max-w-6xl mx-auto px-6 space-y-20">
            <div className=" feature-text grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  AI Story Generation
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Instantly generate unique and engaging stories with our
                  AI-powered engine. Save hours of writing and focus on
                  creativity.
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  src="/images/ai-story.png"
                  alt="AI Story Generation"
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>

            {/* feature-text 2 (reversed) */}
            <div className="feature-text grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 flex justify-center">
                <img
                  src="/images/multiple-formats.png"
                  alt="Multiple Formats"
                  className="rounded-2xl shadow-lg"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Multiple Formats
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  From novels and short stories to scripts and marketing content
                  — create in any format you need.
                </p>
              </div>
            </div>

            {/* feature-text 3 */}
            <div className=" feature-text grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Personalized Style
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Customize tone, style, and genre to match your storytelling
                  voice. Your story, your way.
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  src="/images/personalized-style.png"
                  alt="Personalized Style"
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
        <section className=" bg-purple-300">
          <div className="  rounded-full w-24 h-24 bg-orange-1 circle"></div>
          <div className="py-20 ">
            <div className="max-w-6xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-gray-50 dark:text-gray-100 mb-12">
                How It Works
              </h2>

              <div className="  grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Step 1 */}
                <div className="bg-white-1 p-4 rounded-xl  how-step flex flex-col items-center">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-2xl font-bold mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Enter Your Idea
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Start with a simple prompt — a theme, topic, or character
                    you want to write about.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-white-1 p-4 rounded-xl  how-step flex flex-col items-center">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-2xl font-bold mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    AI Generates Your Story
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Our AI instantly crafts a story draft with engaging
                    characters and plots.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-white-1 p-4 rounded-xl  how-step flex flex-col items-center">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-2xl font-bold mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Customize & Publish
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Refine the tone, style, and details — then share your story
                    with the world.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-row-reverse">
            <div className=" mr-16 rounded-lg w-28 h-28 bg-orange-1 rectangle"></div>

          </div>
        </section>

        <AuthPopup
          isopen={isopen}
          setIsLogin={setIsLogin}
          setIsopen={setIsopen}
          isLogin={isLogin}
        />
      </div>
    );
};

export default Register;
