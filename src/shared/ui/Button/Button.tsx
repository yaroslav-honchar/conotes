import React, { useEffect, useRef } from "react"
import { Animated, Easing, GestureResponderEvent, Pressable, Text, View } from "react-native"

import { Colors } from "@/shared/constants"
import { useColorScheme } from "@/shared/hooks"

import AntDesign from "@expo/vector-icons/AntDesign"

import { IButtonProps } from "./Button.props"
import { buttonStyles as styles } from "./Button.styles"

const Spinner = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current

  useEffect((): (() => void) => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()

    return (): void => {}
  }, [rotateAnim])

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  return (
    <View>
      <Animated.View
        style={[
          {
            transform: [{ rotate: spin }],
          },
        ]}
      >
        <AntDesign
          name="loading1"
          size={28}
          style={styles.icon}
        />
      </Animated.View>
    </View>
  )
}

export const Button: React.FC<IButtonProps> = ({
  variant = "primary",
  icon,
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
    <View style={[styles.base, styles.wrapper, variant === "withIcon" ? styles.withIcon : null]}>
      <Pressable
        style={[styles.base, styles[variant], style, isLoading ? styles.loading : null]}
        android_ripple={{
          color: Colors[themeScheme].buttonPressEffect,
          radius: styles.wrapper.borderRadius,
        }}
        onPress={pressHandle}
        {...rest}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {variant !== "withIcon" ? (
              <Text style={styles[`${variant}Text`]}>{children}</Text>
            ) : (
              <AntDesign
                style={styles.icon}
                name={icon}
                size={24}
              />
            )}
          </>
        )}
      </Pressable>
    </View>
  )
}
