import {
  createContext,
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { doc, getDoc, getFirestore, DocumentData } from "firebase/firestore";
import { useUserContext } from "./UserContext";
import { updateProfile } from "firebase/auth";

interface iCustomerContext {
  user: DocumentData | undefined | null;
  setUser: Dispatch<SetStateAction<null | DocumentData>>;
}

export const CustomerContext = createContext<iCustomerContext>({
  user: null,
  setUser: () => null,
});

export const CustomerProvider = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const [user, setUser] = useState<DocumentData | undefined | null>(null);
  const { currentUser, setIsLoading } = useUserContext();

  useEffect(() => {
    const fetchUserInfo = async () => {
      // setIsLoading(true);
      if (currentUser) {
        const userRef = doc(getFirestore(), "customers", currentUser?.uid);
        const data = await getDoc(userRef);
        const userData = data?.data();

        setUser(userData);
        console.log(userData);
      }
      // setIsLoading(false);
    };
    fetchUserInfo();
  }, [currentUser]);

  return (
    <CustomerContext.Provider value={{ user, setUser }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => useContext(CustomerContext);
