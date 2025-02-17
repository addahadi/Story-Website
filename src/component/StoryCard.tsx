import {DetailsProp} from "@/utils/type.tsx";
import useAuthor from "@/hooks/useAuthor.tsx";
import { useNavigate} from "react-router-dom";
import {AnimatePresence , motion} from "framer-motion"
import cn from "classnames"
const  StoryCard = ({items , truncatedStr, searchItem} : {items : DetailsProp,truncatedStr:string , searchItem : boolean}) => {
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

                    <img src={ImgUrl} alt={title}
                         className={cn("h-[230px] rounded-md shadow-md w-[220px] shadow-black-2" , {
                             "max-md:w-[200px] max-md:h-[210px] max-sm:h-[190px] max-sm:w-[180px]" : searchItem
                         })}/>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-black-2 font-semibold max-sm:text-sm">
                            {truncatedStr}
                        </h1>
                        <h2 className={cn("text-white-2 font-bold break-words w-[220px] " , {
                            "max-md:w-[200px] max-sm:w-[180px] max-sm:text-sm" : searchItem
                        })}>
                            {author ? author.name : ""}
                        </h2>
                    </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default StoryCard;