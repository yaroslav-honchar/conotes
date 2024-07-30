import React from "react"
import { Image, Text, View } from "react-native"

import { IAvatarProps } from "./Avatar.props"
import { avatarStyles as styles } from "./Avatar.styles"

export const Avatar: React.FC<IAvatarProps> = ({ avatarURL, userName }) => {
  const Label: React.FC = () => {
    const label = userName!
      .split(" ")
      .map((word: string): string => {
        return word.charAt(0)
      })
      .join("")
      .toUpperCase()

    return <Text>{label}</Text>
  }

  return (
    <View style={styles.container}>
      {userName ? (
        <Label />
      ) : (
        <Image
          style={styles.image}
          source={avatarURL ? { uri: avatarURL } : require("#/assets/images/avatar-holder.png")}
        />
      )}
    </View>
  )
}
