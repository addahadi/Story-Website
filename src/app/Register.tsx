import { Auth, provider } from "@/utils/firebase";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
const Register = () => {
  const navigate = useNavigate()
  async function handleSignIn() {
   signInWithPopup(Auth,provider).then(()=>{
    navigate("/")
   }).catch((error)=>{
    console.log(error)
   })
  }
  
  return (
    <div className="flex justify-center items-center  h-screen">
      <div className="flex flex-col h-96 min-w-96 justify-center items-center bg-black-4">
        <img
          src="../public/icons/podcast-logo.svg"
          width={30}
          height={30}
          className="mb-10"
        />
        <h1 className=" text-white-1  text-xl mb-2">
          Sign in With <span className=" text-orange-1">Dz-Podcast</span>
        </h1>
        <h2 className="text-white-4 mb-12">
          Welcome back glad to see you again
        </h2>
        <button
          onClick={handleSignIn}
          className=" w-32 h-10 rounded-sm  flex justify-center items-center
        text-lg text-white-1 bg-orange-1 mb-4
        "
        >
          Sign in
        </button>
        <h3 className="text-white-4">Dont have a google account?</h3>
      </div>
    </div>
  );
}

export default Register