import { useColorScheme } from "react-native"

import { Colors } from "@/shared/constants"

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme() ?? "light"
  const colorFromProps = props[theme]

  if (colorFromProps) {
    return colorFromProps
  }

  return Colors[theme][colorName]
}
