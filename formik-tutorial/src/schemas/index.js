import * as yup from "yup";

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$/;

export const basicSchema = yup.object().shape({
  email: yup.string().email("Email is not valid").required("Required"),
  age: yup.number().positive().integer().required("Required"),
  password: yup
    .string()
    .min(6)
    .matches(passwordRegex, {
      message:
        "Password is not valid, It should atleast contain: 1 uppercase, 1 lowercase, one digit and one special character",
    })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords does not match")
    .required("Required"),
});
