import { createTheme } from "@mui/material/styles";

const outlined = "darkorange";
const focused = "orange";
const menuBG = "#003500";
const menuFocus = "#005000";

export const kongColors = {
  Donkey: "#f1c232",
  Diddy: "#ee0000",
  Lanky: "#4444ff",
  Tiny: "#9900ff",
  Chunky: "#009900"
};

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          width: "10rem",
          margin: "0 auto",
          padding: "0 1rem",
          fontSize: "2rem",
          color: "black",
          backgroundColor: outlined,
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: focused
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: "10px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          backgroundColor: menuBG
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "white",
          "&.Mui-checked": {
            color: outlined
          },
          "&.Mui-disabled": {
            color: "#212121"
          }
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: menuBG
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "2rem",
          color: outlined,
          "&.Mui-focused": {
            color: focused
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:disabled": {
            color: "gray"
          }
        }
      }
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          padding: "0"
        },
        paper: {
          maxHeight: "20rem"
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: menuBG,
          fontSize: "1.5rem",
          "&.Mui-selected": {
            backgroundColor: menuFocus,
            "&:hover": {
              backgroundColor: menuFocus
            }
          },
          "&:hover": {
            backgroundColor: menuFocus
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "white"
        },
        root: {
          margin: "10px 0",
          height: "4rem",
          fontSize: "2rem",
          ".MuiOutlinedInput-notchedOutline": {
            border: `2px solid ${outlined}`
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: focused
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: focused
          }
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "2rem"
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: "3rem",
          color: outlined,
          "&:hover, &.Mui-selected": {
            color: "yellow"
          }
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "yellow"
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          padding: "10px 0",
          width: "100%",
          ".MuiOutlinedInput-root": {
            height: "4rem",
            fontSize: "2rem",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: focused
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: focused
            }
          },
          ".MuiOutlinedInput-notchedOutline": {
            border: `2px solid ${outlined}`
          }
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1.5rem"
        }
      }
    }
  },
  palette: {
    text: {
      primary: "#fff"
    }
  },
  typography: {
    fontFamily: "Jersey10",
    h1: {
      fontSize: "3rem",
      fontWeight: "bold",
      margin: "0 auto",
      textAlign: "center"
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "bold"
    },
    h3: {
      fontSize: "2rem",
      fontWeight: "bold",
      margin: "auto",
      textAlign: "center"
    }
  },
  shape: {
    borderRadius: 4
  }
});
