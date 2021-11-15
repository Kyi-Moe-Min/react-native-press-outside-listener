# react-native-press-outside-listener

## Description

press outside listener for react-native

## Installation

```npm
 npm i react-native-press-outside-listener
```

## Example

1. Add `PressOutsideProvider` to root component of the project

App.jsx

```jsx
import { PressOutsideProvider } from "react-native-press-outside-listener";

export default function App() {
  return (
    <PressOutsideProvider>
      <Component />
    </PressOutsideProvider>
  );
}
```

2. use `usePressOutsideListener` hook to add listeners as in below example.

Component.jsx

```jsx
import { useEffect, useRef } from "react";
import { Text, View } from "react-native";
import { usePressOutsideListener } from "react-native-press-outside-listener";

export function Component() {
  const ref = useRef();
  // pass the ref of the component to listen press outside event, it will return addListener function
  const addListener = usePressOutsideListener(ref);

  useEffect(() => {
    // add listener function will return removeListener function, remove the added listener in unmount
    const removeListener = addListener(pressOutside);
    // one or more listener can be added
    const removeListener2 = addListener(pressOutside2);

    return () => {
      // removeListener needs to be called in unmount or else it will lead to memory leaks
      removeListener();
      removeListener2();
    };
  }, []);

  function pressOutside() {
    console.log("press outside of the given component.");
  }

  function pressOutside2() {
    console.log("press outside 2nd listener is called");
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text ref={ref} style={{ borderWidth: 1, padding: 10 }}>
        press outside listener component
      </Text>
    </View>
  );
}
```

## API

### Component

| name                 | props | description                             |
| -------------------- | ----- | --------------------------------------- |
| PressOutsideProvider | style | Provider to use press outside listener. |

### Functions

| name                    | param      | return           | description                                                                                                                     |
| ----------------------- | ---------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| usePressOutsideListener | `ref`      | `addListener`    | A hook that return `addListener` function. It needs to be pass `ref` of the component that you want add press outside listener. |
| `addListener`           | `listener` | `removeListener` | A function to add a listener. That returns `removeListener` function.                                                           |
| `removeListener`        | -          | -                | A function to remove the listener that has been added.                                                                          |
