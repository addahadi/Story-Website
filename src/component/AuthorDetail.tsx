import useAuthor from "@/hooks/useAuthor.tsx";


const AuthorDetail = ({owner} : {owner : string}) => {
    const {author} = useAuthor(owner)
    return (
        <div className="flex  items-center gap-3">
            <img src={author ? author.PhotoUrl : ""} alt="profile" width="50px" className=" rounded-full"/>
            <h1 className=" text-lg text-black-2">{author ? author.name : ""}</h1>
        </div>
    )

}
export default AuthorDetail