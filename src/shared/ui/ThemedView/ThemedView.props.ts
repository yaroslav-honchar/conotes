import { type ViewProps } from "react-native"

export interface IThemedViewProps extends ViewProps {
  lightColor?: string
  darkColor?: string
}
