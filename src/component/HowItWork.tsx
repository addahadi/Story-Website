import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HowItWork = () => {
  useEffect(() => {
    gsap.utils.toArray(".timeline-step").forEach((el: any, i) => {
      gsap.set(el, { autoAlpha: 0, y: 100 });

      gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);

  const steps = [
    {
      num: "1",
      title: "Pick Your Genre",
      desc: "Fantasy, sci-fi, romance, or even a custom theme.",
      gif: "/step1.gif",
    },
    {
      num: "2",
      title: "Add Your Idea",
      desc: "Type a short prompt or describe your characters.",
      gif: "/step2.gif",
    },
    {
      num: "3",
      title: "Generate Your Story",
      desc: "Get a complete draft instantly with one click.",
      gif: "/step3.gif",
    },
    {
      num: "4",
      title: "Edit & Share",
      desc: "Refine your story, then export or share with friends.",
      gif: "/step4.gif",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 text-center">
          How StoryGen Works
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mt-4">
          Create unique stories in just a few simple steps.
        </p>

        {/* Timeline Line */}
        <div className="relative mt-16">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full border-l-2 border-dashed border-gray-400 dark:border-gray-600"></div>

          <div className="space-y-32">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`timeline-step relative grid md:grid-cols-2 gap-12 items-center ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Step Number on the timeline */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-6 bg-orange-1 text-white-1 w-12 h-12 flex items-center justify-center rounded-full shadow-lg font-bold text-lg z-10">
                  {step.num}
                </div>

                {/* Text Section */}
                <div
                  className={`${
                    i % 2 === 1 ? "md:col-start-2" : ""
                  } bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700`}
                >
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    {step.desc}
                  </p>
                </div>

                {/* GIF Section */}
                <div
                  className={`${
                    i % 2 === 1 ? "md:col-start-1" : ""
                  } rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700`}
                >
                  <img
                    src={step.gif}
                    alt={`${step.title} demo`}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWork;
