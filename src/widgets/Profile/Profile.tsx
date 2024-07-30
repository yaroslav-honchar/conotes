import { router } from "expo-router"

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import React, { useRef } from "react"
import { Alert, ScrollView, View } from "react-native"

import { Routes } from "@/shared/constants"
import { Avatar, Button, ThemedText } from "@/shared/ui"

import { profileStyles as styles } from "./Profile.styles"

export const Profile: React.FC = () => {
  const user = useRef<FirebaseAuthTypes.User | null>(auth().currentUser).current
  if (!user) {
    router.push(Routes.Login)

    return <></>
  }

  const signOutHandle = async (): Promise<void> => {
    try {
      await auth().signOut()
      router.push(Routes.Login)
    } catch (error: unknown) {
      console.log(error)

      Alert.alert("Something went wrong :(", "", [
        {
          text: "Okay",
          onPress: (): void => {
            router.push(Routes.Login)
          },
        },
      ])
    }
  }

  const { displayName, photoURL } = user

  return (
    <ScrollView style={styles.container}>
      <View style={styles.head}>
        <Button
          variant={"withIcon"}
          icon={"edit"}
        />
        <Button
          variant={"withIcon"}
          icon={"logout"}
          onPress={signOutHandle}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.userInfo}>
          <Avatar
            avatarURL={photoURL}
            userName={user.displayName}
          />
          {displayName && <ThemedText>{displayName}</ThemedText>}
        </View>
      </View>
    </ScrollView>
  )
}
