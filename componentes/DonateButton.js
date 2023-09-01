import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import styles from "../styles/Styles";

const DonateButton = ({ onPress }) => (
  <TouchableOpacity style={styles.donateButton} onPress={onPress}>
    <FontAwesome5 name="donate" size={24} color="white" />
  </TouchableOpacity>
);

export default DonateButton;
