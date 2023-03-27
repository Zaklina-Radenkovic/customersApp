import { useCallback, useEffect, useRef } from "react";

export const useMounted = () => {
  const isMounted = useRef(false); //this means initial value for 'ref' which is 'isMounted.current=false'

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
};
