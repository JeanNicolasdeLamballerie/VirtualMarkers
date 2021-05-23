module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          // "test/*": ["./src/test/"],
          "@components": ["./src/components/"],
          "@database": ["./src/database/"],
          "@screens": ["./src/screens/"],
          "@stores": ["./src/stores/"],
          "@utils": ["./src/app/utils/"],
          "@services": ["./src/services/"],
          "STYLE": ["./src/style/"],
          "@assets": ["./assets/"],
          "@constants": ["./src/constants/index"],
        }
      }
    ]
  ]
};
