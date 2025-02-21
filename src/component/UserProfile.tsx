import {ProfileAttributes} from "@/utils/util.tsx";
import Panel from "@/component/Panel.tsx";
import firebase from "firebase/compat/app";
import DocumentData = firebase.firestore.DocumentData;


const UserProfile = ({Data , FollowersCount} : {Data : DocumentData | undefined, FollowersCount : number}) => {
    return (
        <div className=" w-full flex flex-col items-center  px-6 gap-5 max-lg:gap-8">

            {
                Data?.PhotoUrl ?
                    (<img
                        src={Data.PhotoUrl}
                        className="rounded-full lg:width-[80px] max-lg:width-[100px] max-md:width-[80px]"
                    />)
                    :
                    (
                        <img
                            src="/Story-Website/user.svg" width={120}
                            className="rounded-full lg:width-[40px] max-lg:width-[60px] max-md:width-[50px]"
                        />
                    )
            }
            <h1 className="text-black-2 font-semibold text-center max-lg:text-xl max-md:text-lg">
                <span>{Data ? Data.name : ""}</span>
            </h1>
            <div className="flex flex-row gap-2 justify-center items-center">
                {ProfileAttributes.map((value, index) => {
                    if (!Data) return;
                    console.log(Data.PhotoUrl)
                    const data = index == 0 ? Data.likes : FollowersCount;
                    const attributes = {...value, data};
                    return (
                        <>
                            {index == 1 && (
                                <div key={index} className=" w-[3px] bg-black-2 h-full mr-2"></div>
                            )}
                            <Panel attributes={attributes}/>
                        </>
                    );
                })}
            </div>
        </div>
    )
}

export default UserProfile;