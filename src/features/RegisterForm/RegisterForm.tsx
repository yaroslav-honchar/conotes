// TODO: Simplify the component

import { Formik, FormikHelpers } from "formik"

import { router } from "expo-router"

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import React, { useRef } from "react"
import { Alert, Keyboard, TextInput, TouchableWithoutFeedback, View } from "react-native"

import { Routes } from "@/shared/constants"
import { IRegisterData } from "@/shared/types"
import { Button, RootLink, ThemedText, ThemedTextInput } from "@/shared/ui"

import { RegisterSchema } from "./RegisterForm.scheme"
import { registerFormStyles as styles } from "./RegisterForm.styles"

export const RegisterForm: React.FC = () => {
  const passwordInputRef = useRef<TextInput>(null)
  const submitPasswordInputRef = useRef<TextInput>(null)

  const submitHandle = async (
    { email, password }: IRegisterData,
    { setSubmitting }: FormikHelpers<IRegisterData>,
  ): Promise<void> => {
    try {
      const userCredentials = await auth().createUserWithEmailAndPassword(email, password)

      console.log(userCredentials)
      // Save user to global state

      router.push(Routes.Home)
    } catch (error: unknown) {
      if (error instanceof Error &&
        (error as FirebaseAuthTypes.NativeFirebaseAuthError)?.code === "auth/email-already-in-use") {
        Alert.alert(
          "Wrong email!",
          "That email address is already in use. Would you like to sign in?",
          [
            {
              text: "Sign in",
              onPress: () => router.push(Routes.Login),
            },
            {
              text: "Cancel",
              style: "cancel",
            },
          ],
        )
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Formik<IRegisterData>
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={RegisterSchema}
        onSubmit={submitHandle}
      >
        {({ handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting }) => (
          <View style={styles.view}>
            <ThemedText
              variant={"title"}
              style={styles.title}
            >
              Sign up
            </ThemedText>

            <View>
              <ThemedTextInput
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
                  submitPasswordInputRef.current?.focus()
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
            </View>
            <View>
              <ThemedTextInput
                ref={submitPasswordInputRef}
                textContentType="oneTimeCode"
                secureTextEntry={true}
                placeholder={"Confirm password"}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                blurOnSubmit={false}
                onSubmitEditing={(): void => {
                  Keyboard.dismiss()
                  !isSubmitting && handleSubmit()
                }}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <ThemedText
                  variant={"error"}
                  style={styles.error}
                >
                  {errors.confirmPassword}
                </ThemedText>
              ) : null}
            </View>
            <Button
              isLoading={isSubmitting}
              onPress={() => handleSubmit()}
            >
              Sign up
            </Button>
            <ThemedText>
              Already have an account?{" "}
              <RootLink
                replace
                href={Routes.Login}
              >
                <ThemedText variant={"link"}>Sign in</ThemedText>
              </RootLink>
            </ThemedText>
          </View>
        )}
      </Formik>
    </TouchableWithoutFeedback>
  )
}
