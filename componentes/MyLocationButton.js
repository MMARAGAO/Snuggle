import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "../styles/Styles";

const MyLocationButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.myLocationButton}>
    <MaterialIcons name="my-location" size={24} color="white" />
  </TouchableOpacity>
);

export default MyLocationButton;
