import React from "react";
import { View, Text } from "react-native";
import { lightPurple, white } from "../utils/colors";

const Header = ({ title }) => {
  return (
    <Text
      style={{
        textAlign: "center",
        fontSize: 32,
        fontWeight: "bold",
        color: white,
        backgroundColor: lightPurple,
        marginVertical: 32,
      }}
    >
      {title}
    </Text>
  );
};

export default Header;
