// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
// };
module.exports = {
  presets: [
  'module:metro-react-native-babel-preset',
  ],
  plugins: [
  ["module-resolver", {
    "alias": {
      "components": "./app/components",
      "containers": "./app/containers",
      "store": "./app/store",
      "config": "./app/config",
      "hooks": "./app/hooks",
      "styles": "./app/styles",
      "root":"./app/root",
      "utils":"./app/utils"
    }
  }],

  ],
  };