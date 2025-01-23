import { useEffect, useState } from "react";
import { db } from "@/utils/FirebaseConfig";
import { UserType } from "@/utils/type.tsx";
import { toast } from "./use-toast";

const useFollow = (profileId: string | undefined, currentUser: UserType) => {
  const [isFollow, setIsFollow] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);
  useEffect(() => {
    async function fetchFollowStatus() {
      if (!currentUser || !profileId || currentUser.uid === profileId) return;

      try {
        const { uid } = currentUser;
        const followDoc = await db
          .collection("user")
          .doc(profileId)
          .collection("Followers")
          .doc(uid)
          .get();

        setIsFollow(followDoc.exists);
      } catch (err) {
        console.error("Error fetching follow status:", err);
      }
    }

    fetchFollowStatus();
  }, [profileId, currentUser]);

  async function toggleFollow() {
    if (!currentUser || !profileId) return;
    if (currentUser.uid === profileId) {
      console.warn("You cannot follow yourself.");
      return; // Prevent following yourself
    }
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      const { uid } = currentUser;
      if (isFollow) {
        // Unfollow
        await db
          .collection("user")
          .doc(profileId)
          .collection("Followers")
          .doc(uid)
          .delete();

        await db
          .collection("user")
          .doc(uid)
          .collection("Following")
          .doc(profileId)
          .delete();

        toast({
          title: "Unfollow",
          description: `You unfollowed ${currentUser?.email?.split("@")[0]}`,
          variant: "destructive",
        });
        setIsFollow(false);
      } else {
        // Follow
        await db
          .collection("user")
          .doc(profileId)
          .collection("Followers")
          .doc(uid)
          .set({ followedAt: new Date() });
        await db
          .collection("user")
          .doc(uid)
          .collection("Following")
          .doc(profileId)
          .set({ followedAt: new Date() });
        toast({
          title: "Follow",
          description: `You followed ${currentUser?.email?.split("@")[0]}`,
          variant: "destructive",
        });
        setIsFollow(true);
      }
    } catch (err) {
      console.error("Error toggling follow state:", err);
    } finally {
      setIsProcessing(false);
    }
  }

  return {
    toggleFollow,
    isFollow,
    isProcessing,
  };
};

export default useFollow;
