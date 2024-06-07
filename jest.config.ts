export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    // process `*.tsx` files with `ts-jest`
  },
  transformIgnorePatterns: ["/node_modules/(?!(monaco-editor)).+\\.js$"],
  moduleNameMapper: {
    "^monaco-editor$": "<rootDir>/node_modules/@monaco-editor/react",
  },
  testMatch: ["<rootDir>/src/**/*.(test|spec).(ts|tsx)"],
  roots: ["<rootDir>/src"]
};
