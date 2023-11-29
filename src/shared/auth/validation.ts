import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().required("User id required."),
  password: Yup.string().required("Password is required."),
});
