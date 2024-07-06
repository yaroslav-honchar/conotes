import { ReactNode } from "react"
import { PressableProps, StyleProp, ViewStyle } from "react-native"

export interface IButtonProps extends PressableProps {
  variant?: "primary" | "withIcon"
  style?: StyleProp<ViewStyle>
  isLoading?: boolean
  children: ReactNode
}
