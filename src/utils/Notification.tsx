import { db } from "./FirebaseConfig";
import { getFollower } from "./Follow";
import { UserType } from "./type";
import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;

export async function sendNewNotfication(
  currentUser: UserType,
  PartId: string
) {
  try {
    const followers = await getFollower(currentUser);

    if (followers) {
      followers.forEach((follower) => {
        const NotId = db
          .collection("user")
          .doc(follower)
          .collection("Notification")
          .doc().id;
        db.collection("user")
          .doc(follower)
          .collection("Notification")
          .doc(NotId)
          .set({
            senderId: currentUser?.uid,
            type: "New Story Part",
            read: false,
            createdAt: Timestamp.now(),
            PartId: PartId,
            message: `new story part  was published from ${
              currentUser?.email ? currentUser?.email.split("@")[0] : ""
            }`,
          });
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function ListenToNotification(
  currentUser: UserType,
  setNotification: React.Dispatch<
    React.SetStateAction<Array<Record<string, string | boolean>> | undefined>
  >
) {
  const notificationRef = db
    .collection("user")
    .doc(currentUser?.uid)
    .collection("Notification");

  const unsubscribe = notificationRef.onSnapshot((docs) => {
    const fetchedNotfication: Array<Record<string, string | boolean>> = [];
    docs.forEach((doc) => {
      const data = doc.data();
      fetchedNotfication.push({ id: doc.id, ...data });
    });
    setNotification(fetchedNotfication);
  });
  return unsubscribe;
}

export function UnReadNotifcation(
  currentUser: UserType,
  setUnRead: React.Dispatch<React.SetStateAction<number>>
) {
  const notificationRef = db
    .collection("user")
    .doc(currentUser?.uid)
    .collection("Notification");
  const unReadQuery = notificationRef.where("read", "==", false);
  const unsubscribe = unReadQuery.onSnapshot((snapShot) => {
    setUnRead(snapShot.size);
    console.log(snapShot.size);
  });

  return unsubscribe;
}

export async function MarkAsRead(
  currentUser: UserType,
  notificationId: string
) {
  if (!notificationId) return;
  try {
    await db
      .collection("user")
      .doc(currentUser?.uid)
      .collection("Notification")
      .doc(notificationId)
      .update({
        read: true,
      });
  } catch (error) {
    console.log(error);
  }
}
