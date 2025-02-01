import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import {db} from "@/utils/FirebaseConfig.tsx";
import {toast} from "@/hooks/use-toast.ts";
import {AlertProps} from "@/utils/type.tsx";




const AlertCom = ({storyId , isdelete , setIsdelete} : AlertProps) => {

    async function handleDelete(){
        if(!storyId) return
        try {
            const Parts = await db.collection("Parts").where("storyId" , "==" , storyId).get()
            Parts.forEach(async (part)  => {
                await db.collection("Parts").doc(part.id).delete()
            })
            await db.collection("WrittenStories").doc(storyId).delete()
        }
        catch (e) {
            toast({
                variant: "destructive",
                title:"Uh oh! Something went wrong",
                description:"There was a problem with your request."
            })
            console.log(e)
        }
    }

    return(
        <AlertDialog open={isdelete} onOpenChange={setIsdelete}>
            <AlertDialogContent className=" bg-white-1">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                        Yes , delete the story
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertCom