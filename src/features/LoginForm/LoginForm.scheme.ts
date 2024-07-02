import * as Yup from "yup"

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password is too short - should be 6 chars minimum.")
    .max(50, "Password is too long - should be 50 chars maximum.")
    .required("Required"),
})
