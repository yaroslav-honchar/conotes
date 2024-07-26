import React, { PropsWithChildren } from "react"
import { Keyboard, TouchableWithoutFeedback, View } from "react-native"

export const DismissKeyboardView: React.FC<PropsWithChildren> = ({ children }) => {
  return (
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => Keyboard.dismiss()}
        accessible={false}
      >
        <View style={{ flex: 1 }}>{children}</View>
      </TouchableWithoutFeedback>
  )
}
