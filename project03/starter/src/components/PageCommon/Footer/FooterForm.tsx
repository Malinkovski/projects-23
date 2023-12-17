import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FooterValidationSchema,
  validEmail,
} from "../../../utilities/validation-schema";
import { useState } from "react";
import { Placeholder } from "react-bootstrap";

interface FormValues {
  email: string;
}

const FooterForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={(values, { resetForm }) => {
        console.log(values); //!TEMP
        resetForm();
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      }}
      validationSchema={FooterValidationSchema}
    >
      {(formik) => (
        <Form className="footer-form">
          <div className="form">
            <label htmlFor="email-footer">E-mail адреса:</label>
            <Field
              autoComplete="email"
              type="email"
              id="email-footer"
              name="email"
              placeholder={`${isSubmitted ? "Успешно зачленети!" : ""}`}
              className={`${
                formik.errors.email && formik.touched.email ? "error-input" : ""
              }`}
            />
            <ErrorMessage
              className="error-message"
              name="email"
              component="span"
            />
          </div>
          <button className="button-gold" type="submit">
            Зачлени се!
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FooterForm;
