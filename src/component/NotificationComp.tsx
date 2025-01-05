import { Dialog, DialogContent, DialogDescription, DialogTitle  } from "@radix-ui/react-dialog"
import { useEffect, useState } from "react";
import ProfileImg from "./ProfileImg";
import { Timestamp } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { MarkAsRead } from "@/utils/Notification";
import { useUser } from "@/context/UserCon";




const NotificationComp = ({
  notification,
  clicked,
  setClicked,
}: {
  notification: Record<string, string | boolean | Timestamp>[] | undefined;
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [notifications, setNotifications] = useState<Record<string, string | boolean | Timestamp>[] | undefined>([]);
  const navigate = useNavigate()
  const {currentUser} = useUser()
  useEffect(() => {
    setNotifications(notification)
  },[notification])


  async function handleClick(PartId : string, notificationId:string){
    try{
      navigate(`/read/${PartId}`)
      await MarkAsRead(currentUser , notificationId)
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <Dialog open={clicked} onOpenChange={setClicked}>
      <DialogContent className="absolute top-10 z-50 bg-white-1 right-0 shadow-custom-equal rounded-md ">
        <DialogTitle className=" p-3 border-b border-black-2 ">
          Notification
        </DialogTitle>
        <DialogDescription className=" p-3 w-[450px]">
          {notifications?.map((not) => {
            const timestamp = not.createdAt as Timestamp;
            const date = timestamp.toDate();
            const hours = date.getHours();
            return (
              <div className="flex flex-row gap-3 p-3 rounded-md items-center cursor-pointer w-full hover:bg-orange-2">
                <ProfileImg senderId={not.senderId as  string} />
                <div className="flex flex-col flex-1 gap-2" onClick={() => handleClick(not.PartId as string  , not.id as string )}>
                  <span className=" text-black-2">
                    {not?.message as string}
                  </span>
                  <span className=" text-sm font-semibold text-white-2">
                    {hours} hours ago
                  </span>
                </div>
              </div>
            );
          })}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationComp