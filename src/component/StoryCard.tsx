import {DetailsProp} from "@/utils/type.tsx";
import useAuthor from "@/hooks/useAuthor.tsx";
import {Link} from "react-router-dom";


const  StoryCard = ({items , truncatedStr} : {items : DetailsProp,truncatedStr:string}) => {
    const {title , ImgUrl,id} = items
    const {author} = useAuthor(items.author);
    return (
        <Link to={`/story/${id}`} className=" p-3 w-fit flex flex-col gap-2 hover:bg-white-4 rounded-md">
            <img src={ImgUrl} alt={title} width={220}
                 className="h-[230px] rounded-md shadow-md max-w-[220px] shadow-black-2"/>
            <div className="flex flex-col gap-2">
                <h1 className="text-black-2 font-semibold">
                    {truncatedStr}
                </h1>
                <h2 className="text-white-2 font-bold break-words max-w-[220px]">
                    {author ? author.name : ""}
                </h2>
            </div>
        </Link>
    )
}

export default StoryCard;