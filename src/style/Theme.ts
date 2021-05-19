import React from "react";
import { configureFonts, DefaultTheme } from "react-native-paper";
import customFonts from "./Fonts";
declare global {
    namespace ReactNativePaper {
      interface ThemeColors {
        classic: string;
      }
  
      interface Theme {
        flexbox: {flex:number};
        flexColumnContainer: {
          flex:number,
            flexFlow: string,
            alignItems: string,
        };

      }
    }
  }
const theme = {
  ...DefaultTheme,
  fonts: configureFonts(customFonts),
  // roundness: 30,
  colors: {
    ...DefaultTheme.colors,
    primary: "#4169E1",
    accent: "#f1c40f",
    classic:"black",
    cancelButton: "#a4c639",
    greyed: "#808080",
  },
  flexbox:{
      flex:1,
  },
  flexColumnContainer : {
      flex:1,
    //  flexDirection:"column",
      flexFlow: "column wrap",
      alignItems: "center",
  }
};

export default theme;