import React from "react";
import { generateRandomId } from "./generateRandomId";
import { UserProps } from "../../properties/account";

interface RegisterUserProps {
  values: any;
  handleExistingEmail: () => void;
  handleSubmitting: (values: UserProps) => void;
  resetForm: () => void;
}

export const registerUser = ({
  values,
  handleExistingEmail,
  handleSubmitting,
  resetForm,
}: RegisterUserProps) => {
  console.log(values); // TEMP
  values.id = generateRandomId();
  const existingUsers = localStorage.getItem("users");
  let usersParsed = [];

  if (existingUsers) {
    usersParsed = JSON.parse(existingUsers);
    const emailExists = usersParsed.some((user:UserProps) => user.token === values.id);

    if (emailExists) {
      handleExistingEmail();
    } else {
      usersParsed.push(values);
      localStorage.setItem("users", JSON.stringify(usersParsed));
      handleSubmitting(values);
      resetForm();
    }
  } else {
    localStorage.setItem("users", JSON.stringify([values]));
    handleSubmitting(values);
    resetForm();
  }
};
