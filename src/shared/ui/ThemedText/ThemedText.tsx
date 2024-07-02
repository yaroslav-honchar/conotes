import React from "react"
import { Text } from "react-native"

import { useThemeColor } from "@/shared/hooks"

import { IThemedTextProps } from "./ThemedText.props"
import { themedTextStyles as styles } from "./ThemedText.styles"

export const ThemedText: React.FC<IThemedTextProps> = ({
  style,
  lightColor,
  darkColor,
  variant = "default",
  ...rest
}) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text")

  return (
    <Text
      style={[
        { color },
        variant === "default" ? styles.default : undefined,
        variant === "title" ? styles.title : undefined,
        variant === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        variant === "subtitle" ? styles.subtitle : undefined,
        variant === "link" ? styles.link : undefined,
        variant === "error" ? styles.error : undefined,
        style,
      ]}
      {...rest}
    />
  )
}
