import { useUser } from "@/context/UserCon";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Popup from "@/component/Popup.tsx";
import { signOut } from "firebase/auth";
import { Auth } from "@/utils/FirebaseConfig";
import { Icon } from "./Icon";
import { ListenToNotification, UnReadNotifcation } from "@/utils/Notification";
import NotificationComp from "./NotificationComp";

const Navbar = () => {
    const { currentUser } = useUser();
    const [optOpen, setOptOpen] = useState<boolean>(false);
    const [optWrite, setOptWrite] = useState<boolean>(false);
    const [clicked, setClicked] = useState<boolean>(false);
    const [notification, setNotification] = useState<
        Array<Record<string, string | boolean>> | undefined
    >([]);
    const [unRead, setUnRead] = useState<number>(0);

    const navigate = useNavigate();

    async function handleClick() {
        await signOut(Auth)
            .then(() => {
                return;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function toggleNotification() {
        setClicked(!clicked);
    }

    useEffect(() => {
        const unsubscribe = ListenToNotification(currentUser, setNotification);
        return () => unsubscribe();
    }, [currentUser]);

    useEffect(() => {
        if (!currentUser) return;
        const unsubscribe = UnReadNotifcation(currentUser, setUnRead);
        return () => unsubscribe();
    }, [currentUser]);

    return (
        <div className=" sticky left-0 top-0 p-5 flex pt-4 pb-4 items-center border-b-2 z-20 bg-white-1 border-white-3 justify-between  w-full">
            <div className=" flex flex-row items-center gap-4">
                <Link to="/" className="flex flex-row items-center gap-3 pr-6 border-r-2 border-white-3">
                    <img src="../public/logo.svg" width={35}/>
                    <h1 className=" text-lg text-black-2">dz-story</h1>
                </Link>
                <div onClick={() => navigate("/browse")} className="  cursor-pointer text-black-2 p-2 hover:bg-orange-2 rounded-lg transition-colors">
                    <p>Browse</p>
                </div>
            </div>
            <div className="flex  gap-4 items-center">
                <div className="relative">
                    <div
                        onClick={toggleNotification}
                        className=" relative cursor-pointer"
                    >
                        {unRead != 0 && (
                            <span
                                className="absolute min-w-3 h-3  text-sm text-white-1 rounded-full p-1 py-2 -right-2 top-0 bg-red-500 flex justify-center items-center font-bold">
                {unRead}
              </span>
                        )}
                        <Icon.bell clicked={clicked} />
                    </div>
                    <NotificationComp
                        clicked={clicked}
                        setClicked={setClicked}
                        notification={notification}
                    />
                </div>
                <div
                    className="flex gap-1 relative items-center cursor-pointer"
                    onClick={() => {
                        setOptWrite(!optWrite);
                    }}
                >
                    <img src="../public/write.svg" width={30} />
                    <h1 className=" text-black-2">Write</h1>
                    <Popup open={optWrite}>
                        <ul className="flex flex-col gap-3 text-black-1 ">
                            <li
                                onClick={() => navigate(`/new`)}
                                className="border-b-2
                    hover:text-white-2 cursor-pointer w-max border-orange-1 pb-3"
                            >
                                <span>Write Story</span>
                            </li>
                            <li
                                onClick={handleClick}
                                className="cursor-pointer w-max hover:text-white-2"
                            >
                                <span>Generate Story</span>
                            </li>
                        </ul>
                    </Popup>
                </div>

                <div
                    onClick={() => setOptOpen(!optOpen)}
                    className="relative cursor-pointer flex h-fit items-center gap-3 border rounded-full pr-3 border-black-2"
                >
                    <img
                        src={currentUser?.photoURL ? currentUser?.photoURL : ""}
                        width={30}
                        className=" rounded-full"
                    />
                    <h1>{currentUser?.email?.split("@")[0]}</h1>
                    <Popup open={optOpen}>
                        <ul className="flex flex-col gap-3 text-black-1 ">
                            <li
                                onClick={() =>
                                    navigate(
                                        `/Profile/${currentUser ? currentUser.uid : ""}/about`
                                    )
                                }
                                className="border-b-2
                    hover:text-white-2 cursor-pointer border-white-3 pb-3"
                            >
                                <span>My Profile</span>
                            </li>
                            <li
                                onClick={handleClick}
                                className="cursor-pointer hover:text-white-2"
                            >
                                <span>Log_Out</span>
                            </li>
                        </ul>
                    </Popup>
                </div>
            </div>
        </div>
    );
};

export default Navbar;