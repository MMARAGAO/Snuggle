// faça uma tela azul

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DonateScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Donate Screen</Text>
    </View>
  );
};

export default DonateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00f",
    alignItems: "center",
    justifyContent: "center",
  },
});

// Path: screens\ProfileScreen.js
