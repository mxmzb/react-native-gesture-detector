module.exports = {
  verbose: true,
  preset: "react-native",
  transform: {
    "\\.jsx?$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
    "^.+\\.tsx?$": "ts-jest",
  },
  modulePaths: ["<rootDir>"],
  globals: {
    "ts-jest": {
      babelConfig: true,
      diagnostics: false,
    },
  },
  transformIgnorePatterns: ["node_modules/(?!react-native|react-native-gesture-handler)/"],
  modulePathIgnorePatterns: [
    "example/node_modules/react-native/",
    "example/node_modules/react-native-gesture-handler/",
  ],
  testPathIgnorePatterns: ["node_modules", "dist"],
  setupFilesAfterEnv: ["jest-enzyme", "<rootDir>/jest/setupEnzymeAfterEnv.js"],
  testEnvironment: "enzyme",
  cacheDirectory: ".jest/cache",
};
