import auth from "@react-native-firebase/auth"
import { View } from "react-native"

import { Button, ThemedText } from "@/shared/ui"

import { RootView } from "@/entities/RootView"

export default function IndexPage() {
  return (
    <RootView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <ThemedText
          variant={"title"}
          style={{
            marginBottom: 40,
          }}
        >
          Settings page
        </ThemedText>
        <Button
          onPress={async (): Promise<void> => {
            await auth().signOut()
          }}
        >
          Log Out
        </Button>
      </View>
    </RootView>
  )
}
