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
import { boolean } from "yup";

interface iUserContext {
  currentUser: null | User;
  setCurrentUser: Dispatch<SetStateAction<null | User>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<iUserContext>({
  currentUser: null,
  setCurrentUser: () => null,
  isLoading: true || false,
  setIsLoading: boolean,
});

export const UserProvider = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const value = {
    currentUser,
    setCurrentUser,
    isLoading,
    setIsLoading,
  };

  useEffect(() => {
    // @ts-ignore
    const unsubscribe = onAuthStateChangedListener((user: User) => {
      if (!user) return null;
      if (user) {
        setIsLoading(true);

        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
      console.log(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
