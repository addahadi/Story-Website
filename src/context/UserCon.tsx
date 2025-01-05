import { UserContextType, UserType } from "@/utils/type";
import { ReactNode, useContext, useEffect, useState } from "react";
import {Auth, db} from "@/utils/firebase";
import { createContext } from "react";



const UserContext = createContext<UserContextType | undefined>(undefined);



export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserType>(null);

  useEffect(() => {
    const unsubscribe = Auth.onAuthStateChanged( async (user)  =>  {
      if (user) {
        setCurrentUser(user);
        const Id = user.uid
        const DocField = await db.collection("user").doc(Id).get()
        if(!DocField.exists){
          await db.collection("user").doc(Id).set({
            name : currentUser?.email ? currentUser.email.split("@")[0] : "",
            PhotoUrl : currentUser?.photoURL ? currentUser.photoURL : "",
            likes : 0,
            desc:'',
            score:0,
          })
        }

      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for accessing the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};