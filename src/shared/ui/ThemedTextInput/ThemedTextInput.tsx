import React, { forwardRef } from "react"
import { TextInput } from "react-native"

import { Colors } from "@/shared/constants"
import { useColorScheme } from "@/shared/hooks"

import { IThemedTextInputProps } from "./ThemedTextInput.props"
import { themedTextInputStyles as styles } from "./ThemedTextInput.styles"

export const ThemedTextInput = forwardRef<TextInput, IThemedTextInputProps>(
  ({ style, variant = "primary", ...rest }, ref) => {
    const themeScheme = useColorScheme()

    return (
      <TextInput
        ref={ref}
        style={[styles.base, styles[variant], styles[themeScheme], style]}
        autoCapitalize={"none"}
        autoCorrect={false}
        placeholderTextColor={Colors[themeScheme].placeholder}
        {...rest}
      />
    )
  },
)

ThemedTextInput.displayName = "ThemedTextInput"
