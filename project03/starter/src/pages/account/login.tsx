import React, { useState } from "react";
import Head from "next/head";
import AccountWrapper from "../../components/Account/AccountWrapper";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { valSchemaLogin } from "../../utilities/validation-schema";
import FormField from "../../components/Forms/FormField";
import ButtonSubmitAccount from "../../components/Buttons/Account/ButtonSubmitAccount";
import ButtonAltRegister from "../../components/Buttons/Account/ButtonAltRegister";
import Link from "next/link";
import PasswordField from "../../components/Forms/PasswordField";
import GoogleSvg from "/public/images/Icons/google.svg";
import FacebookSvg from "/public/images/Icons/facebook.svg";
import CheckboxField from "../../components/Forms/CheckboxField";
import { useRouter } from "next/router";
import PassResetReqModal from "../../components/Modals/Account/PassResetReqModal";
import ButtonSmallAccount from "../../components/Buttons/Account/ButtonSmallAccount";
import ButtonPasswordReset from "../../components/Buttons/Account/ButtonPasswordReset";
import Separator from "../../components/Account/Misc/Separator";
import { validateLogin } from "../../utilities/account/validate-login";
import useRedirect from "../../customhooks/accounthooks/useRedirect";
import { UserProps } from "../../properties/account";
import WrongInput from "../../components/Account/Misc/WrongInput";

interface LoginProps {
  email: string;
  password: string;
  rememberPassword: boolean;
}

const initialValues: LoginProps = {
  email: "",
  password: "",
  rememberPassword: false,
};

const RegisterPage: NextPage = () => {
  const router = useRouter();

  const [showErrorLogin, setShowErrorLogin] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const showPasswordResetModal = () => setForgotPassword(true);
  const hidePasswordResetModal = () => setForgotPassword(false);

  useRedirect();
  return (
    <>
      <Head>
        <title>{`Игралиште - Login`}</title>
        <meta name="login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccountWrapper>
        <div className="login-container">
          <Formik
            initialValues={initialValues}
            validationSchema={valSchemaLogin}
            onSubmit={(values: any, { resetForm }) => {
              validateLogin({ router, values, setShowErrorLogin, resetForm });
            }}
          >
            {(formik) => (
              <Form>
                <FormField
                  label="Емаил адреса"
                  name="email"
                  id="email"
                  fieldClassName={`${
                    (formik.errors.email && formik.touched.email) ||
                    showErrorLogin
                      ? "error-input"
                      : ""
                  }`}
                />
                <PasswordField
                  label="Лозинка"
                  name="password"
                  id="password"
                  fieldClassName={`${
                    (formik.errors.email && formik.touched.email) ||
                    showErrorLogin
                      ? "error-input"
                      : ""
                  }`}
                />
                <CheckboxField
                  name="rememberPassword"
                  id="rememberPassword"
                  label="Запамти лозинка"
                />
                <ButtonPasswordReset
                  title="Ја заборави лозинката?"
                  handleShow={showPasswordResetModal}
                />
                {forgotPassword && (
                  <PassResetReqModal
                    handleCloseModal={hidePasswordResetModal}
                  />
                )}

                <div className="form-buttons">
                  <ButtonSubmitAccount text="Најави се" type="submit" />
                  {showErrorLogin && (
                    <WrongInput text="Погрешно внесен емаил или лозинка." />
                  )}
                </div>
              </Form>
            )}
          </Formik>
          <Separator />
          <div className="">
            <ButtonAltRegister
              text="Најави се преку Google"
              type="submit"
              className="button-alt-register"
              svgIcon={<GoogleSvg />}
            />
            <ButtonAltRegister
              text="Најави се преку Facebook"
              type="submit"
              className="button-alt-register"
              svgIcon={<FacebookSvg />}
            />
          </div>
          <ButtonSmallAccount
            link="/register"
            text="Немаш профил?"
            linkText="Регистрирај се"
          />
        </div>
      </AccountWrapper>
    </>
  );
};

export default RegisterPage;
