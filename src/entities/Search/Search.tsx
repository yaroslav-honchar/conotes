import React from "react"
import { View } from "react-native"

import { ISearchProps } from "./Search.props"
import { searchStyles as styles } from "./Search.styles"

export const Search: React.FC<ISearchProps> = () => {
  return <View style={styles.container}></View>
}
