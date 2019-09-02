import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";

import MultipleGesturesScreen from "./src/Screen/MultipleGestures";
import TriangleScreen from "./src/Screen/Triangle";
import CoilScreen from "./src/Screen/Coil";

const DrawerNavigator = createDrawerNavigator(
  {
    MultipleGestures: {
      screen: MultipleGesturesScreen,
    },
    Triangle: {
      screen: TriangleScreen,
    },
    Coil: {
      screen: CoilScreen,
    },
  },
  {
    initialRouteName: "MultipleGestures",
  },
);

const App = createAppContainer(DrawerNavigator);

export default App;
