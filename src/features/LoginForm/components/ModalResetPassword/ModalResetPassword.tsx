import { Formik } from "formik"

import React from "react"
import { Keyboard, Modal, TouchableWithoutFeedback, View } from "react-native"

import { ILoginData } from "@/shared/types"
import { Button, ThemedText, ThemedTextInput } from "@/shared/ui"

import { RootView } from "@/entities/RootView"

import { LoginSchema } from "@/features/LoginForm/LoginForm.scheme"

import { loginFormStyles as styles } from "../../LoginForm.styles"

import { IModalResetPasswordProps } from "./ModalResetPassword.props"

export const ModalResetPassword: React.FC<IModalResetPasswordProps> = ({ onClose, ...rest }) => {
  const submitHandle = (): void => {}

  const closeHandle = (): void => {
    onClose && onClose()
  }

  return (
    <Modal
      presentationStyle={"fullScreen"}
      animationType={"slide"}
      {...rest}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <RootView>
          <Button onPress={closeHandle}>Go back</Button>
          <Formik<ILoginData>
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={submitHandle}
          >
            {({ handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting }) => (
              <View style={styles.view}>
                <ThemedText
                  variant={"title"}
                  style={styles.title}
                >
                  Reset password
                </ThemedText>

                <View>
                  <ThemedTextInput
                    placeholder={"Email"}
                    keyboardType={"email-address"}
                    textContentType={"emailAddress"}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    onSubmitEditing={(): void => {
                      handleSubmit()
                    }}
                  />
                  {errors.email && touched.email ? (
                    <ThemedText
                      variant={"error"}
                      style={styles.error}
                    >
                      {errors.email}
                    </ThemedText>
                  ) : null}
                </View>
                <Button
                  isLoading={isSubmitting}
                  onPress={() => handleSubmit()}
                >
                  Reset password
                </Button>
              </View>
            )}
          </Formik>
        </RootView>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
