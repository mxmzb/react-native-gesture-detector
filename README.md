<p align="center">
  <br />
  <img src="https://raw.githubusercontent.com/mxmzb/react-native-gesture-detector/master/img/logo-emoji.png" height="150" />
</p>

<h1 align="center">React Native Gesture Detector</h1>
<h3 align="center">Create and detect custom gestures on React Native.</h3>

<p align="center">
  <a href="https://npmjs.org/package/react-native-gesture-detector">
    <img src="https://img.shields.io/npm/v/react-native-gesture-detector" />
  </a>
  <a href="https://github.com/mxmzb/react-native-gesture-detector/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/react-native-gesture-detector" />
  </a>
  <a href="https://npmjs.org/package/react-native-gesture-detector">
    <img src="https://img.shields.io/bundlephobia/min/react-native-gesture-detector" />
  </a>
  <a href="https://circleci.com/gh/mxmzb/react-native-gesture-detector/">
    <img src="https://img.shields.io/circleci/build/github/mxmzb/react-native-gesture-detector" />
  </a>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" />
</p>

## Demos

<p>
  <img width="217" src="https://raw.githubusercontent.com/mxmzb/react-native-gesture-detector/master/example/assets/demo-coil.gif">
  <img width="217" src="https://raw.githubusercontent.com/mxmzb/react-native-gesture-detector/master/example/assets/demo-multiple-gestures.gif">
  <img width="217" src="https://raw.githubusercontent.com/mxmzb/react-native-gesture-detector/master/example/assets/demo-triangle.gif">
  <img width="217" src="https://raw.githubusercontent.com/mxmzb/react-native-gesture-detector/master/example/assets/demo-gesture-recorder.gif">
<p>

### Example app and usage

Feel free to test [Snack Expo demo](https://snack.expo.io/@mxmzb/react-native-gesture-detector) or run the included demo app locally:

```sh
$ git clone https://github.com/mxmzb/react-native-gesture-detector.git
$ cd react-native-gesture-detector/example
$ yarn
$ yarn start
```

Check [the code for the screens](https://github.com/mxmzb/react-native-gesture-detector/tree/master/example/src/Screen) to see how they are done!

## Intro

This package originated from a real life **need to detect custom gestures**. The idea for implementation originated from this [stellar answer](https://stackoverflow.com/questions/20821358/gesture-detection-algorithm-based-on-discrete-points) on StackOverflow. The result is not 100% foolproof, but rock solid, performant and extremely simple to use.

The package comes with another, insanely cool component `GestureRecorder`, which allows you to create gestures **on the fly**. Yep, just plug it in, paint the gesture and you will receive the coordinate data for your supercomplex, custom gesture. You can use it to just **use the data points as a predefined gesture** in your app, or **you can even let your app users create their own custom gestures**, if that fits your game plan!

Because the library significantly uses React hooks, you must use at least `react@16.8.0`.

## Installation

```sh
$ yarn add react-native-gesture-detector
$ yarn add react-native-gesture-handler lodash # install peer dependencies
```

## Quickstart

```jsx
import GestureDetector, {
  GestureRecorder,
  GesturePath,
  Cursor,
} from "react-native-gesture-detector";

const gestures = {
  // this will result in the gesture shown in the first demo give above
  Coil: [
    { x: 10, y: -30 }, // This is a coordinate object
    { x: 25, y: -15 },
    { x: 40, y: -10 },
    { x: 55, y: -15 },
    { x: 70, y: -30 },
    { x: 85, y: -45 },
    { x: 90, y: -65 },
    { x: 85, y: -85 },
    { x: 70, y: -100 },
    { x: 55, y: -115 },
    { x: 40, y: -130 },
    { x: 20, y: -130 },
    { x: 0, y: -130 },
    { x: -20, y: -130 },
    { x: -35, y: -115 },
    { x: -50, y: -100 },
    { x: -65, y: -85 },
    { x: -80, y: -70 },
    { x: -80, y: -55 },
    { x: -80, y: -30 },
    { x: -80, y: -15 },
    { x: -80, y: 0 },
    { x: -65, y: 15 },
    { x: -50, y: 30 },
    { x: -35, y: 45 },
    { x: -20, y: 60 },
    { x: 0, y: 65 },
    { x: 20, y: 70 },
    { x: 40, y: 70 },
  ],
};

const CoilExample = () => (
  <GestureDetector
    onGestureFinish={gesture => console.log(`Gesture "${gesture}" finished!`)}
    onProgress={({ gesture, progress }) => {
      console.log(`Gesture: ${gesture}, progress: ${progress}`);
    }}
    onPanRelease={() => {
      console.log("User released finger!");
    }}
    gestures={gestures}
    slopRadius={35}
  >
    {({ coordinate }) => (
      <View style={{ position: "relative", width: "100%", height: "100%" }}>
        <GesturePath path={gestures["Coil"]} color="green" slopRadius={35} />
        {coordinate && <Cursor {...coordinate} />}
      </View>
    )}
  </GestureDetector>
);

const RecordGestureExample = () => {
  // finishedGesture will look like gestures["Coil"] from the top
  const [finishedGesture, setFinishedGesture] = useState([]);

  return (
    <GestureRecorder onPanRelease={gesture => setFinishedGesture(gesture)}>
      {({ gesture }) => (
        <View style={{ position: "relative", width: "100%", height: "100%" }}>
          <GesturePath path={gesture} color="green" slopRadius={35} />
        </View>
      )}
    </GestureRecorder>
  );
};
```

## Documentation and API

### `GestureDetector`

`GestureDetector` is a render props component. The child function has the form `children({ coordinate: { x: number, y: number } })`

| Prop              |             Default             |                      Type                       | Description                                                                                                                                       |
| :---------------- | :-----------------------------: | :---------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `slopRadius`      |               50                |                    `number`                     | The radius in px from a coordinate. The resulting circle is the area in which the user can move the finger                                        |
| `gestures`        |              `{}`               | `{ [key: string]: [{ x: number, y: number }] }` | An object with one or more gestures. A gesture is an array of `{ x, y }` objects, which symbolize the exact coordinates you want the user to pass |
| `onProgress`      | `({ progress, gesture }) => {}` |                   `function`                    | A callback, which is called on each predefined gesture coordinate passed by the user.                                                             |
| `onGestureFinish` |        `(gesture) => {}`        |                   `function`                    | A callback, which is called when the user finishes a gesture. Receives the gesture key of the finished gesture.                                   |
| `onPanRelease`    |           `() => {}`            |                   `function`                    | Callback, when the user releases the finger. Receives no arguments.                                                                               |

### `GestureRecorder`

`GestureRecorder` is a render props component. The child function has the form `children({ gesture: [{ x: string, y: string }, { x: string, y: string }, ...], gestureDirectionHistory: [{ x: string, y: string }, { x: string, y: string }, ...], offset: { x: number, y: number } })`.

`gesture` is an array of coordinates. They are generated based on the `pointDistance` prop of the component.

`gestureDirectionHistory` will tell you accordingly to `gesture` which direction the gesture is moving there. This might give somewhat unreliable data currently. A direction object looks like `{ x: "left", y: "up" }`.

`offset` will artificially add an horizontal and vertical offset to the coordinates. This does not change the detection of the defined gesture at all. It's just a helper to use with the `GesturePath` component to paint the path where you actually draw. Check the [`GestureRecorder` example screen](https://github.com/mxmzb/react-native-gesture-detector/blob/master/example/src/Screen/CreateGesture.js) for more details on this.

| Prop            |      Default      |    Type    | Description                                                                                                                                                                                                                                                      |
| :-------------- | :---------------: | :--------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pointDistance` |        20         |  `number`  | The minimum distance between points that you want to be recorded. So default wise, every 20px (or more, usually depending on the phone hardware and the speed of the finger moving over the display) the component will add another point to the `gesture` array |
| `onCapture`     |    `() => {}`     | `function` | A callback, which is called every time the component is adding a coordinate to the `gesture` array                                                                                                                                                               |
| `onPanRelease`  | `(gesture) => {}` | `function` | Callback, when the user releases the finger. Receives the fully drawn gesture in form of a coordinate array.                                                                                                                                                     |

### `GesturePath`

`GesturePath` is a helper component, which paints a gesture visually in a container. The container should have `position: absolute;` set in its style property. `{ x, y }` is a coordinate object. An array of coordinate objects must be passed to paint the gesture on the screen. This component should be only used in development to define and refine gestures.

| Prop         | Default |   Type   | Description                                                                                                                                                                                                                                           |
| :----------- | :-----: | :------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `path`       |  `[]`   | `array`  | An array of coordinates to paint the gesture                                                                                                                                                                                                          |
| `slopRadius` |  `50`   | `number` | The radius around each coordinate, in which the user touch event will be associated with the gesture (or rather the radius of the circle being painted for each coordinate, as this whole component has no functionality really and is purely visual) |
| `color`      | `black` | `string` | A string of a valid CSS color property                                                                                                                                                                                                                |

### `Cursor`

Paints a black, round indicator at the passed coordinate. The only useful situation is in development and you probably will use it like this, where `coordinate` is passed from the [`GestureDetector`](#gesturedetector) render props function:

`{coordinate && <Cursor {...coordinate} />}`

| Prop         |                   Default                   |   Type   | Description                                                                                                                              |
| :----------- | :-----------------------------------------: | :------: | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `x`          |                     `0`                     | `number` | The coordinate of the absolute center of the cursor relatively to the parent container.                                                  |
| `y`          |                     `0`                     | `number` | The coordinate of the absolute center of the cursor relatively to the parent container.                                                  |
| `throttleMs` | `50` in dev build, `25` in production build | `number` | A performance optimization. Sets the time delay between each rerender of the repositioned cursor. You probably don't want to touch this. |

## License

`react-native-gesture-detector` is licensed under the [MIT](https://github.com/mxmzb/react-native-gesture-detector/blob/master/LICENSE).
