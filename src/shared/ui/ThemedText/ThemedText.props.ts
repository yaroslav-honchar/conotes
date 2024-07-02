import { type TextProps } from "react-native"

export interface IThemedTextProps extends TextProps {
  lightColor?: string
  darkColor?: string
  variant?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link" | "error"
}
