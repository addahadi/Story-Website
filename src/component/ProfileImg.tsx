import useAuthor from "@/hooks/useAuthor"
import { Link } from "react-router-dom"


const ProfileImg = ({
    senderId
} : {senderId : string}) => {
    const {author} = useAuthor(senderId)
  return (
    <Link to={`/profile/${senderId}/about`}>
        <img src={author?.PhotoUrl} width={60} className=" rounded-full max-md:w-[40px]" />
    </Link>
  )
}

export default ProfileImg