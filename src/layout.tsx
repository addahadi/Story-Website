import { ReactNode, useEffect } from "react"
import Navbar from "./component/Navbar"
import { useUser } from "./context/UserCon";
import { useNavigate } from "react-router-dom";
import { StoryProvider } from "./context/StoryCon";


const LayouT = ({children} : {children: ReactNode}) => {
  const { currentUser } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
  }, [currentUser]);
  return (
    <StoryProvider>
        <div className='flex flex-col w-full'>
          <Navbar />
          <div className=" w-full">
            {children}
          </div>
        </div>   
    </StoryProvider>
  )
}

export default LayouT