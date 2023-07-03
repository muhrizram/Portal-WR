import { createTheme } from "@mui/material/styles";

let globalTheme = createTheme({
  palette: {
    primary: {
      main: "#0078D7",
    },
    secondary: {
      main: "#edf2ff",
    },
  },
  typography: {
    fontFamily: ["Poppins"],
    textDetail: {
      fontSize: ["40px"],
    },
    body2: {
      fontSize: ["28px"],
      fontWeight: [500],
      color: ["#0A0A0A"],
      letterSpacing: ["-0.021em"],
    },
    body3: {
      fontSize: ["14px"],
      color: ["rgba(0, 0, 0, 0.87)"],
      lineHeight: ["143%"],
      letterSpacing: ["0.17px"],
    },
    body4: {
      fontSize: ["14px"],
      color: ["#9E9E9E"],
      lineHeight: ["125%"],
    },
    primaryText: {
      fontSize: ["14px"],
      color: ["#3267E3"],
      lineHeight: ["143%"],
      letterSpacing: ["0.17px"],
    },
    headerCardMenu: {
      fontSize: ["30px"],
      color: ["#121926"],
      lineHeight: ["225%"],
      fontWeight: ["600"],
      paddingLeft: ["10px"],
    },
    searchTitleText: {
      fontSize: ["14px"],
      color: ["#272930"],
      lineHeight: ["21px"],
      fontWeight: ["500"],
    },
    employeeFormTitle: {
      color: ["text.secondary"],
      fontSize: ["12px"],
    },
    employeeDetail: {
      fontSize: ["16px"],
    },
    backlogDetail: {
      /* Text - 2 xl/24/Medium */
      color: ["#000000"],
      fontSize: ["24px"],
      fontFamily: ["Poppins"],
      fontWeight: ["500"],
      lineHeight: ["200%"],
    },
    drawerNameUser: {
      fontSize: ["16px"],
      color: ["#333"],
      fontWeight: ["600"],
      lineHeight: ["150%"],
    },
    drawerPostion: {
      fontSize: ["14px"],
      color: ["rgba(51, 51, 51, 0.9)"],
      lineHeight: ["125%"],
    },
  },
  // textfield: {
  //   textFieldEmployee: {
  //     width: ["100%"],
  //     paddingRight: ["10px"],
  //   },
  // },
  components: {
    MuiButton: {
      variants: [
        {
          props: {
            variant: "primaryButton",
            color: "primary",
          },
          style: {
            color: "#FFFFFF",
            border: "none",
            borderRadius: "4px",
            boxShadow:
              "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
            background: "#0078D7",
            padding: "6px 16px",
            "&:hover": {
              color: "rgba(0, 0, 0, 0.38)",
              backgroundColor: "rgba(0, 0, 0, 0.12)",
            },
            "&:active": {
              backgroundColor: "rgba(0, 0, 0, 0.12)",
              color: "rgba(0, 0, 0, 0.38)",
            },
          },
        },
      ],
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: ["14px !important"],
          color: "rgba(0, 0, 0, 0.87)",
        },
      },
    },
  },
});

globalTheme = createTheme(globalTheme, {
  palette: {
    info: {
      main: globalTheme.palette.secondary.main,
    },
  },
});

export default globalTheme;
