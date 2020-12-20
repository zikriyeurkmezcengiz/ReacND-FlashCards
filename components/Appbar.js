import * as React from "react";
import { Appbar } from "react-native-paper";
import { Colors } from "react-native-paper";

const AppBar = ({ menu, title, navigation }) => (
  <Appbar.Header>
    <Appbar.BackAction onPress={() => navigation.goBack(null)} />
    <Appbar.Content
      titleStyle={{
        fontWeight: "bold",
        fontSize: 20,
        alignItems: "center",
        color: Colors.red100,
      }}
      title={title}
      subtitle={null}
    />
  </Appbar.Header>
);

export default AppBar;
