import * as Yup from "yup"

export const ResetPasswordScheme = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
})
