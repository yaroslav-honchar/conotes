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
  withIcon: {
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: 48,
  },
  primaryText: {
    flex: 1,
    color: Colors.light.text,
    fontSize: 16,
    lineHeight: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    color: Colors.light.text,
  },
  loading: {
    opacity: 0.75,
  },
  spinner: {
    width: 28,
    height: 28,
    margin: "auto",
    borderRadius: 20,
    borderColor: Colors.light.text,
    borderWidth: 4,
    borderEndWidth: 0,
  },
})
