import { StyleSheet } from "react-native"

import { Colors } from "@/shared/constants"

export const themedTextStyles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: Colors.light.accent,
  },
  error: {
    fontSize: 14,
    color: Colors.light.error,
  },
})
