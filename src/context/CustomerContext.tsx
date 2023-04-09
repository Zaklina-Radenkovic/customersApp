import { createContext, useState, useEffect, useContext } from "react";

import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useUserContext } from "./UserContext";

export const CustomerContext = createContext({});

export const CustomerProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const { currentUser } = useUserContext();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (currentUser) {
        const userRef = doc(getFirestore(), "customers", currentUser?.uid);
        const data = await getDoc(userRef);
        const userData = data.data();
        // console.log(userData);
        setUser(userData);
      }
    };
    fetchUserInfo();
  }, [currentUser]);

  return (
    <CustomerContext.Provider value={{ user, setUser, isLogin, setIsLogin }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => useContext(CustomerContext);
