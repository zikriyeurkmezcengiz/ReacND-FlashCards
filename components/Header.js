import React from "react";
import { View, Text } from "react-native";
import { white, orange } from "../utils/colors";

const Header = ({ title }) => {
  return (
    <Text
      style={{
        textAlign: "center",
        fontSize: 32,
        fontWeight: "bold",
        color: white,
        backgroundColor: orange,
        marginVertical: 32,
      }}
    >
      {title}
    </Text>
  );
};

export default Header;
