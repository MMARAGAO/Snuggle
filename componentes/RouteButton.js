import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "../styles/Styles";

const RouteButton = ({ onPress }) => (
  <TouchableOpacity style={styles.routeButton} onPress={onPress}>
    <MaterialIcons name="directions" size={24} color="white" />
  </TouchableOpacity>
);

export default RouteButton;
