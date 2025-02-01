import {DetailsProp} from "@/utils/type.tsx";
import useAuthor from "@/hooks/useAuthor.tsx";
import { useNavigate} from "react-router-dom";
import {AnimatePresence , motion} from "framer-motion"

const  StoryCard = ({items , truncatedStr} : {items : DetailsProp,truncatedStr:string}) => {
    const {title , ImgUrl,id} = items
    const {author} = useAuthor(items.author);
    const navigate = useNavigate()
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{delay: 1.4}}
                onClick={() => navigate(`/story/${id}`)} className=" p-3 w-fit flex flex-col gap-2 hover:bg-orange-2 transition-colors cursor-pointer rounded-md">

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
            </motion.div>
        </AnimatePresence>
    )
}

export default StoryCard;