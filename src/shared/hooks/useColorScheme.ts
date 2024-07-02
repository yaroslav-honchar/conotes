import { useColorScheme as useColorSchemeNative } from "react-native"

export const useColorScheme = (): "light" | "dark" => {
  return useColorSchemeNative() || "light"
}
