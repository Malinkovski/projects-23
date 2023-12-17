import Cookies from "js-cookie";
import React from "react";
import { UserProps } from "../../properties/account";

interface ValidateLoginProps {
  values: UserProps;
  resetForm: () => void;
  setShowErrorLogin: any;
  router: any;
}

export const validateLogin = ({
  values,
  resetForm,
  setShowErrorLogin,
  router,
}: ValidateLoginProps) => {
  const invalidLogin = () => {
    setShowErrorLogin(true);
    setTimeout(() => {
      setShowErrorLogin(false);
    }, 5000);
  };

  const handleLogin = () => {
    const usersStatus = localStorage.getItem("users");
    if (usersStatus) {
      const users = JSON.parse(usersStatus);
      const user = users.find(
        (user: UserProps) =>
          user.email === values.email && user.password === values.password
      );
      if (user) {
        if (values.rememberPassword) {
          Cookies.set("loggedInUser", JSON.stringify(user.id), {
            expires: 90,
          });
        }
        sessionStorage.setItem("user", JSON.stringify(user.id));
        resetForm();
        router.push("/account/profile");
      } else {
        invalidLogin();
      }
    } else {
      invalidLogin();
    }
  };

  return handleLogin();
};
