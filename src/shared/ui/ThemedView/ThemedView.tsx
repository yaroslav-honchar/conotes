import React from "react"
import { View } from "react-native"

import { useThemeColor } from "@/shared/hooks"

import { IThemedViewProps } from "./ThemedView.props"

export const ThemedView: React.FC<IThemedViewProps> = ({
  style,
  lightColor,
  darkColor,
  ...otherProps
}) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "blockBackground")

  return (
    <View
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  )
}
