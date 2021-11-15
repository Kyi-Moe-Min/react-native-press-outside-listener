// main index.js

import { requireNativeComponent } from "react-native";

const PressOutsideListener = requireNativeComponent(
  "PressOutsideListener",
  // @ts-ignore
  null
);

export * from "./pressOutsideContext";
export default PressOutsideListener;
