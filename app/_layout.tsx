import * as SplashScreen from "expo-splash-screen"
import { Stack, router } from "expo-router"

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { NativeStackNavigationOptions } from "@react-navigation/native-stack"
import { useEffect } from "react"
import { StatusBar } from "react-native"

import { Routes } from "@/shared/constants"
import { useColorScheme } from "@/shared/hooks"

SplashScreen.preventAutoHideAsync().then()

const commonStackScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
}

export default function RootLayout() {
  const colorScheme = useColorScheme()

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null): void => {
    if (user) {
      router.replace(Routes.Home)
    } else {
      router.replace(Routes.Login)
    }

    SplashScreen.hideAsync().then()
  }

  useEffect(() => {
    // TODO: Fix double re-renders of redirected screen

    return auth().onAuthStateChanged(onAuthStateChanged)
  }, [])
  console.log("Work")

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar barStyle={colorScheme === "light" ? "dark-content" : "light-content"} />
      <Stack>
        <Stack.Screen
          name={Routes.getPathForRoot("Home")}
          options={{
            ...commonStackScreenOptions,
            animation: "fade_from_bottom",
          }}
        />
        <Stack.Screen
          name={Routes.getPathForRoot("Login")}
          options={{
            ...commonStackScreenOptions,
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name={Routes.getPathForRoot("Register")}
          options={{
            ...commonStackScreenOptions,
            animation: "slide_from_left",
          }}
        />
      </Stack>
    </ThemeProvider>
  )
}
