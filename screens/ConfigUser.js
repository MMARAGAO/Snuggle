import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const UserProfileScreen = () => {
  const [user] = useState({
    username: "usuario123",
    email: "usuario@example.com",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Perfil do Usuário</Text>
      <Text style={styles.label}>Nome de usuário:</Text>
      <Text style={styles.text}>{user.username}</Text>
      <Text style={styles.label}>E-mail:</Text>
      <Text style={styles.text}>{user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
  },
});

export default UserProfileScreen;
