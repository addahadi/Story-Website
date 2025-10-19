
import {useEffect, useState} from "react";
import AuthPopup from "@/component/AuthPopup.tsx";
import {gsap} from "gsap"
import { SplitText } from "gsap/SplitText";
import { Button } from "@/component/ui/button";
import { BatteryChargingIcon } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HowItWork from "@/component/HowItWork";
import FinalCTA from "@/component/FinalCta";
import Footer from "@/component/Footer";
import { HashLink } from "react-router-hash-link";

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

      const featureAnimations = gsap.utils
        .toArray(".feature-text")
        .map((el : any, i) => {
          return gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              toggleActions: "play none none reverse",
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

      };
    }, []);

    return (
      <div className=" w-full  h-screen bg-white-1">
        <header className="max-w-[1200px] mx-auto pt-6 px-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex flex-row gap-2 items-center">
            <img src="/Story-Website/logo.svg" width={40} height={40} />
            <h1 className="text-xl sm:text-2xl font-bold text-black-2">
              Story Teller
            </h1>
          </div>

          {/* Nav (hidden on mobile, visible on md+) */}
          <nav className="hidden md:flex flex-row gap-6 text-gray-800 items-center font-semibold">
            <span className="hover:underline cursor-pointer">
              <HashLink smooth to="#how-it-works" className="no-underline">
                How it works
              </HashLink>
            </span>

            <span className="hover:underline cursor-pointer">
              <HashLink smooth to="#features" className="no-underline">
                Features
              </HashLink>
            </span>

            <span className="hover:underline cursor-pointer">
              <HashLink smooth to="#faq" className="no-underline">
                FAQ
              </HashLink>
            </span>
          </nav>

          {/* CTA Button */}
          <Button
            onClick={() => {
              setIsopen(true);
              setIsLogin(false);
            }}
            className="bg-orange-1 flex flex-row items-center gap-1 px-3 py-2 rounded-md"
          >
            <BatteryChargingIcon className="size-4" />
            <span className="text-white text-sm sm:text-base">Get Started</span>
          </Button>
        </header>

        <main className="min-h-screen mx-auto w-full max-w-[800px] flex justify-center items-center flex-col px-4">
          <div>
            <img
              src="/Story-Website/logo.svg"
              width={160}
              height={160}
              className="mx-auto"
            />
          </div>
          <div className="mt-8 sm:mt-12 flex flex-col items-center">
            <h1 className="paragraph w-full leading-relaxed text-3xl sm:text-5xl font-bold text-black-2 text-center">
              Story Teller AI-Powered Storytelling Platform
            </h1>
          </div>
        </main>

        <section id="features" className="py-20 bg-purple-300 ">
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

        <HowItWork />
        <FinalCTA setOpen={setIsopen} />
        <div className=" w-full -mt-1 bg-gradient-to-b  from-purple-300 to-gray-800   h-20  "></div>
        <Footer />
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
