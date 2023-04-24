import {
  SetStateAction,
  Dispatch,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { User } from "firebase/auth";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../lib/firebase";

interface iUserContext {
  currentUser: null | User;
  setCurrentUser: Dispatch<SetStateAction<null | User>>;
}

const UserContext = createContext<iUserContext>({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const value = {
    currentUser,
    setCurrentUser,
  };

  useEffect(() => {
    // @ts-ignore
    const unsubscribe = onAuthStateChangedListener((user: User) => {
      if (!user) return null;
      if (user) {
        // setIsLoading(false);

        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
      console.log(user);
      // setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
