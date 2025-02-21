
import {Button} from "@/component/ui/button.tsx";
import {useState} from "react";
import AuthPopup from "@/component/AuthPopup.tsx";
const Register = () => {
    const [isopen , setIsopen] = useState(false);
    const [isLogin , setIsLogin] = useState(false);


    return (

    <div className=" w-full  h-screen bg-orange-2">
      <header className="w-full px-5 py-3 border-b border-white-2 ">
        <ul className=" w-full flex flex-row justify-between items-center">
          <img  src="/Story-Website/logo.svg" width={35}/>
          <p  className="text-black-2 cursor-pointer font-semibold hover:text-white-2" onClick={() => {setIsopen(true) ; setIsLogin(true)}}>LogIn</p>
        </ul>
      </header>
      <main className=" max-w-[1200px] mx-auto px-8">
        <div className="flex flex-row gap-20 max-xl:gap-14 max-lg:gap-10 py-32 items-center">
          <section className="flex flex-col gap-10 w-full max-lg:text-center max-lg:items-center">
            <h1 className="text-4xl max-xl:text-3xl text-black-1 font-semibold leading-[80px]">Hey there! Welcome to my story world</h1>
            <p className=" text-black-2 text-lg leading-10 w-[650px] max-xl:w-[550px] max-lg:w-full">
              Hey there! 😊 Welcome to my story corner—a place where heartfelt
              tales come alive with a dash of digital magic. Here,
              every narrative is crafted with passion and a sprinkle of wonder,
              inviting you to explore worlds that spark your imagination.
              Dive in, and let’s embark on this storytelling adventure together! 📖✨
            </p>
            <Button onClick={() => {setIsLogin(false) ; setIsopen(true)}} size="lg" className=" w-fit bg-orange-1 text-white-1 hover:border hover:border-orange-1 hover:bg-orange-2 hover:text-black-2 max-md:w-full" >
              Start now
            </Button>
          </section>
          <section className=" max-lg:hidden">
            <img src="/Story-Website/flipped_image.png" width={600}/>
          </section>
        </div>
      </main>
        <AuthPopup isopen={isopen} setIsLogin={setIsLogin} setIsopen={setIsopen} isLogin={isLogin}/>
    </div>
  );
};

export default Register;
