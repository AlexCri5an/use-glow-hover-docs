export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx|mjs)$": ["babel-jest", { presets: ["@babel/preset-env"] }]
  },
  transformIgnorePatterns: [
    "/node_modules/(?!@rescui/.*|@rescui/use-glow-hover|@rescui/typography)"
  ],
  extensionsToTreatAsEsm: [".ts", ".tsx", ".jsx"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "mjs"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
};