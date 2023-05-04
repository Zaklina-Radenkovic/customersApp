import { createContext, useState, useEffect, useContext } from "react";

import { doc, getDoc, getFirestore, DocumentData } from "firebase/firestore";
import { useUserContext } from "./UserContext";

export const CustomerContext = createContext({});

export const CustomerProvider = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const [user, setUser] = useState<DocumentData | undefined | null>(null);
  const [isLogin, setIsLogin] = useState(false);
  const { currentUser, setIsLoading } = useUserContext();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (currentUser) {
        setIsLoading(true);
        const userRef = doc(getFirestore(), "customers", currentUser?.uid);
        const data = await getDoc(userRef);
        const userData = data.data();
        console.log(userData);
        setUser(userData);
      }
      setIsLoading(false);
    };
    fetchUserInfo();
  }, [currentUser, setIsLoading]);

  return (
    <CustomerContext.Provider value={{ user, setUser, isLogin, setIsLogin }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => useContext(CustomerContext);
