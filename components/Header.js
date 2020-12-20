import React from "react";
import { View, Text } from "react-native";
import { purple, white } from "../Util/colors";

const Header = ({ title }) => {
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 32,
          fontWeight: "bold",
          color: white,
          backgroundColor: purple,
          marginVertical: 32,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default Header;
