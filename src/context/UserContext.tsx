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
import { CUSTOMERS_DATA } from "../_fake-api__/customers";

interface iUserContext {
  currentUser: null | User;
  setCurrentUser: Dispatch<SetStateAction<null | User>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<iUserContext>({
  currentUser: null,
  setCurrentUser: () => null,
  isLoading: false,
  setIsLoading: () => true,
});

export const UserProvider = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // // this we add ONLY ONCE (the first time), because every time will add new sets of value
  // useEffect(() => {
  //   addCollectionAndDocuments("customers", CUSTOMERS_DATA);
  // });

  const value = {
    currentUser,
    setCurrentUser,
    isLoading,
    setIsLoading,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: User | null) => {
      if (!user) return null;
      if (user) {
        // setIsLoading(true);
        // createUserDocumentFromAuth(user);
        setCurrentUser(user);
      }
      // console.log(user);
      // setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
