
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const useAccountButton = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        const userSession = sessionStorage.getItem("user");
      const userCookie = Cookies.get("loggedInUser");
      if (userSession || userCookie) {
          setIsLoggedIn(true);
        } else if (!userCookie) {
            setIsLoggedIn(false);
        }
    }, []);
    
    return {isLoggedIn};
};

export default useAccountButton;
