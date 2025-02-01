import CenteredCom from "@/component/CenteredCom.tsx";
import {genreColors, getTextColor} from "@/utils/util.tsx";
import {GenreProps} from "@/utils/type.tsx";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";

const Browse = () => {
    const [categories , setCategories] = useState<GenreProps[]>(genreColors)
    useEffect(() => {
        setCategories(genreColors)
    },[])
    return (
        <CenteredCom>
            <motion.div
                initial={{ x : -100}}
                animate={{ x: 0 }} className=" w-full py-14   ">
                <div className=" flex flex-col gap-6">
                    <h1 className=" text-4xl text-black-2 font-semibold">
                        Browse
                    </h1>
                    <p className=" text-white-2 text-lg font-semibold">
                        Explore by genre, mood, or trending reads.
                    </p>
                </div>
                <div className=" grid grid-cols-3 gap-8 mt-24">
                    {
                        categories.length > 0 && categories.map((categorie : GenreProps , index : number) => {
                            const { genre , color , hoverColor} = categorie
                            const textColor = getTextColor(color)

                            return (
                                <motion.div whileHover={{ backgroundColor : hoverColor}} className={` cursor-pointer rounded-3xl w-[250]  p-6 h-52 `} style={{backgroundColor:color}}>
                                    <Link to={`/category/${genre.toLowerCase()}`} key={index} className="w-full h-full flex flex-col justify-end"  >
                                        <p style = {{color : textColor}} className=" text-2xl font-semibold  text-end ">
                                            {genre}
                                        </p>
                                    </Link>
                                </motion.div>
                            )
                        })
                    }
                </div>
            </motion.div>
        </CenteredCom>
    )
}

export default Browse