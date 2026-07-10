import { useEffect, useRef, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export function useNetworkStatus() {
  const [isConnected, setisConnected] = useState(true);
  const [restored, setRestored] = useState(false);

  const previousStatus = useRef<boolean | null>(null)

  useEffect(() => {
    const subscribed = NetInfo.addEventListener((state) => {
      const connected =
        state.isConnected === true &&
        state.isInternetReachable !== false
      

      if(previousStatus.current === false && connected){
        setRestored(true)

       setTimeout(() => {
          setRestored(false)
        }, 2500);
      }

      previousStatus.current = connected
      setisConnected(connected)
    });

    return subscribed;
    
  }, []);

  return {isConnected , restored}
}
