import React, { PropsWithChildren } from "react"
import { SafeAreaView } from "react-native"

import { ThemedView } from "@/shared/ui"

import { rootViewStyles as styles } from "./RootView.styles"

export const RootView: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
    </ThemedView>
  )
}
