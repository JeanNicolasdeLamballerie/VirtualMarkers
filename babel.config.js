module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          "test/*": ["./src/test/"],
          "@components": ["./src/components"],
          "@screens": ["./src/screens"],
          "@stores": ["./src/stores"],
          "@utils": ["./src/utils"],
          "@services": ["./src/services"],
          "@assets": ["./assets"],
          "@constants": ["./src/constants"]
        }
      }
    ]
  ]
};
