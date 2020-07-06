import "react-native";
import "jest-enzyme";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";

/**
 * Set up Enzyme to mount to DOM, simulate events,
 * and inspect the DOM in tests.
 */
Enzyme.configure({ adapter: new Adapter() });

/**
 * Ignore some expected warnings
 * see: https://jestjs.io/docs/en/tutorial-react.html#snapshot-testing-with-mocks-enzyme-and-react-16
 * see https://github.com/Root-App/react-native-mock-render/issues/6
 */

const originalConsoleError = console.error; // eslint-disable-line
// eslint-disable-next-line
console.error = (message) => {
  if (message.startsWith("Warning:")) {
    return;
  }

  originalConsoleError(message);
};

const originalConsoleLog = console.log; // eslint-disable-line
// eslint-disable-next-line
console.log = (descriptor, message) => {
  if (
    descriptor.startsWith("Warning:") ||
    ((typeof message === "string" || message instanceof String) && message.startsWith("Warning:"))
  ) {
    return;
  }

  if (
    descriptor.startsWith("TypeError:") ||
    ((typeof message === "string" || message instanceof String) && message.startsWith("TypeError:"))
  ) {
    return;
  }

  originalConsoleLog(message);
};
