import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const LoginScreen = ({ navigation }) => {
  const handleLogin = () => {
    // Navegue para a tela principal
    navigation.navigate("MainTabs");
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Username" style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
  },
});

export default LoginScreen;
