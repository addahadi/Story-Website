import { Button } from "./ui/button";

const FinalCTA = ( {
    setOpen
}: {
    setOpen: (open: boolean) => void;
}) => {
  return (
    <section className="relative py-20 bg-purple-300 ">
      <div className="max-w-5xl mx-auto px-6 text-center text-gray-900">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Start Creating Stories Today
        </h2>
        <p className="text-lg md:text-xl mb-10 text-gray-900 max-w-2xl mx-auto">
          Turn your ideas into full stories instantly. Try StoryGen free and
          bring your imagination to life.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Button onClick={() => setOpen(true)}  size={"lg"} className="bg-orange-1 text-white-1 hover:bg-purple-600 py-3">
             Get started for free
          </Button>
        </div>
      </div>

    </section>
  );
};

export default FinalCTA;
