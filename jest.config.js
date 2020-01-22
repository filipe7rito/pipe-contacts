const path = require("path");

module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "\\.(js|jsx)?$": "babel-jest"
  },
  testEnvironment: "jest-environment-jsdom-fifteen",
  testPathIgnorePatterns: ["/node_modules/", "/public/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src",
    "\\.(css|less)$": "identity-obj-proxy"
  }
};
