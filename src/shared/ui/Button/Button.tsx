import React from "react"
import { GestureResponderEvent, Pressable, Text, View } from "react-native"

import { Colors } from "@/shared/constants"
import { useColorScheme } from "@/shared/hooks"

import { IButtonProps } from "./Button.props"
import { buttonStyles as styles } from "./Button.styles"

export const Button: React.FC<IButtonProps> = ({
  variant = "primary",
  style,
  children,
  isLoading,
  onPress,
  ...rest
}) => {
  const themeScheme = useColorScheme()

  const pressHandle = (event: GestureResponderEvent): void => {
    if (isLoading) {
      return
    }

    onPress && onPress(event)
  }

  return (
    <View style={[styles.base, styles.wrapper]}>
      <Pressable
        style={[styles.base, styles[variant], style, isLoading ? styles.loading : null]}
        android_ripple={{
          color: Colors[themeScheme].buttonPressEffect,
          radius: styles.wrapper.borderRadius,
        }}
        onPress={pressHandle}
        {...rest}
      >
        {!isLoading ? (
          <Text style={styles[`${variant}Text`]}>{children}</Text>
        ) : (
          <Text style={styles[`${variant}Text`]}>Loading...</Text>
        )}
      </Pressable>
    </View>
  )
}
