import { StyleSheet } from "react-native"

import { Colors } from "@/shared/constants"

export const themedTextInputStyles = StyleSheet.create({
  base: {
    height: 48,
    width: "100%",
  },
  primary: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: Colors.light.textSecondary,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: Colors.light.accent,
  },
  light: {
    color: Colors.light.text,
  },
  dark: {
    color: Colors.dark.text,
  },
})
