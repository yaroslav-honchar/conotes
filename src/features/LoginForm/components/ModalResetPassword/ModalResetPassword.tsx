import { Formik, FormikHelpers } from "formik"

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import React, { useRef } from "react"
import { Alert, Modal, TextInput, View } from "react-native"

import { IResetPasswordData } from "@/shared/types"
import { Button, DismissKeyboardView, ThemedText, ThemedTextInput } from "@/shared/ui"

import { RootView } from "@/entities/RootView"

import { loginFormStyles as styles } from "../../LoginForm.styles"

import { IModalResetPasswordProps } from "./ModalResetPassword.props"
import { ResetPasswordScheme } from "./ResetPassword.scheme"

export const ModalResetPassword: React.FC<IModalResetPasswordProps> = ({ onClose, ...rest }) => {
  const emailInputRef = useRef<TextInput>(null)

  const closeHandle = (): void => {
    onClose && onClose()
  }

  const submitHandle = async (
    { email }: IResetPasswordData,
    { setSubmitting }: FormikHelpers<IResetPasswordData>,
  ): Promise<void> => {
    try {
      await auth().sendPasswordResetEmail(email)

      Alert.alert("Done!", "We sent you recovery password link on email.", [
        {
          text: "Ok",
          onPress: (): void => {
            closeHandle()
          },
        },
      ])
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        (error as FirebaseAuthTypes.NativeFirebaseAuthError)?.code === "auth/internal-error"
      ) {
        Alert.alert("Wrong email or password!", "", [
          {
            text: "Try again",
            onPress: (): void => {
              emailInputRef.current?.focus()
            },
          },
        ])
        return
      }

      Alert.alert("Oops!", "Something went wrong! Try please later.", [
        {
          text: "Cancel",
          style: "cancel",
        },
      ])
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      presentationStyle={"fullScreen"}
      animationType={"fade"}
      {...rest}
    >
      <DismissKeyboardView>
        <RootView>
          <Button
            variant={"withIcon"}
            icon={"left"}
            onPress={closeHandle}
          >
            Go back
          </Button>
          <Formik<IResetPasswordData>
            initialValues={{ email: "" }}
            validationSchema={ResetPasswordScheme}
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
                    ref={emailInputRef}
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
      </DismissKeyboardView>
    </Modal>
  )
}
