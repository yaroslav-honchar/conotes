import React, { PropsWithChildren } from "react"
import { Keyboard, ScrollView, TouchableWithoutFeedback } from "react-native"

export const DismissKeyboardView: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}
      >
        {children}
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}
