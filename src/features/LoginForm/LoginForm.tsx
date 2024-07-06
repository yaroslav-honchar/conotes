// TODO: Simplify the component
import { Formik, FormikHelpers } from "formik"

import { router } from "expo-router"

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import React, { useRef, useState } from "react"
import { Alert, Keyboard, Pressable, TextInput, TouchableWithoutFeedback, View } from "react-native"

import { Routes } from "@/shared/constants"
import { ILoginData } from "@/shared/types/login-data.interface"
import { Button, RootLink, ThemedText, ThemedTextInput } from "@/shared/ui"

import { LoginSchema } from "./LoginForm.scheme"
import { loginFormStyles as styles } from "./LoginForm.styles"
import { ModalResetPassword } from "./components"

export const LoginForm: React.FC = () => {
  const [isResetModal, setIsResetModal] = useState<boolean>(false)
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)

  const submitHandle = async (
    { email, password }: ILoginData,
    { setSubmitting }: FormikHelpers<ILoginData>,
  ): Promise<void> => {
    try {
      const userCredentials = await auth().signInWithEmailAndPassword(email, password)

      console.log(userCredentials)
      router.push(Routes.Home)
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

  const resetPasswordHandle = (): void => {
    setIsResetModal(true)
    // auth()
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                Sign in
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
                    passwordInputRef.current?.focus()
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
              <View>
                <ThemedTextInput
                  ref={passwordInputRef}
                  placeholder={"Password"}
                  textContentType="oneTimeCode"
                  secureTextEntry={true}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  blurOnSubmit={false}
                  onSubmitEditing={(): void => {
                    Keyboard.dismiss()
                    !isSubmitting && handleSubmit()
                  }}
                />
                {errors.password && touched.password ? (
                  <ThemedText
                    variant={"error"}
                    style={styles.error}
                  >
                    {errors.password}
                  </ThemedText>
                ) : null}
                <Pressable
                  style={{ marginTop: 4, marginRight: "auto" }}
                  onPress={resetPasswordHandle}
                >
                  <ThemedText variant={"link"}>Forgot password?</ThemedText>
                </Pressable>
              </View>
              <Button
                isLoading={isSubmitting}
                onPress={() => handleSubmit()}
              >
                Sign in
              </Button>
              <ThemedText>
                Don’t have an account?{" "}
                <RootLink
                  replace
                  href={Routes.Register}
                >
                  <ThemedText variant={"link"}>Sign up</ThemedText>
                </RootLink>
              </ThemedText>
            </View>
          )}
        </Formik>
      </TouchableWithoutFeedback>
      <ModalResetPassword visible={isResetModal} onClose={() => setIsResetModal(false)} />
    </>
  )
}
