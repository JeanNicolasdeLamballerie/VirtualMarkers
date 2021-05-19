
// Possible values for font weight
type fontWeight = "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined

interface FontInterface {
  default: {
    regular: {
      fontFamily: "sans-serif",
      fontWeight:fontWeight,
    },
    medium: {
      fontFamily: "sans-serif-medium",
      fontWeight:fontWeight,

    },
    light: {
      fontFamily: "sans-serif-light",
      fontWeight:fontWeight,

    },
    thin: {
      fontFamily: "sans-serif-thin",
      fontWeight:fontWeight,
    }
  }
}



const fontConfig:FontInterface = {
  default: {
    regular: {
      fontFamily: "sans-serif",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "sans-serif-medium",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "sans-serif-light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "sans-serif-thin",
      fontWeight: "normal",
    },
  },
};
export default fontConfig;