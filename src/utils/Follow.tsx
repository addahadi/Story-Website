import { db } from "./FirebaseConfig";
import { UserType } from "./type";

export const getFollower = async (currentUser: UserType) => {
  try {
    const followRef = await db
      .collection("user")
      .doc(currentUser?.uid)
      .collection("Followers")
      .get();
    const followers = followRef.docs.map((doc) => doc.id);
    return followers;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const ListenToFollowers = (
  currentUser: UserType,
  setFollowersCount: React.Dispatch<React.SetStateAction<number>>
) => {
  const notificationRef = db
    .collection("user")
    .doc(currentUser?.uid)
    .collection("Following");

  const followers = notificationRef.onSnapshot((docs) => {
    setFollowersCount(docs.size);
  });

  return followers;
};
