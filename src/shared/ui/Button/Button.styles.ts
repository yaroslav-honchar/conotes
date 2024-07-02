import { StyleSheet } from "react-native"

import { Colors } from "@/shared/constants"

export const buttonStyles = StyleSheet.create({
  base: {
    width: "100%",
    height: 48,
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: Colors.light.buttonPrimary,
  },
  primary: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  primaryText: {
    flex: 1,
    color: Colors.light.text,
    fontSize: 16,
    lineHeight: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  loading: {
    opacity: 0.75,
  },
})
