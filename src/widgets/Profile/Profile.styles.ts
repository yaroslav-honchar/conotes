import { StyleSheet } from "react-native"

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 24,
    marginBottom: 24,
  },
  body: {
    gap: 24,
    flex: 1
  },
  userInfo: {
    gap: 12,
    alignItems: "center",
  }
})
