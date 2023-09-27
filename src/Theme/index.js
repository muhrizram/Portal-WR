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
    noDataTable: {
      fontSize: ["16px"],
      color: ["rgba(0, 0, 0, 0.60)"],
      lineHeight: ["150%"],
      fontWeight: ["500"],
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
    title: {
      fontSize: ["28px"],
      fontWeight: ["700"],
      color: ["#0A0A0A"],
      letterSpacing: ["-0.021em"],
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
      fontStyle: ["normal"],
      fontWeight: ["500"],
      lineHeight: ["200%"],
    },
    backlogDetailText: {
      fontSize: ["24px"],
      fontFamily: ["Poppins"],
      fontStyle: ["normal"],
      fontWeight: ["400"],
      lineHeight: ["133.4%"],
    },
    descBaklog: {
      fontSize: ["16px"],
      fontFamily: ["Poppins"],
      fontStyle: ["normal"],
      fontWeight: ["400"],
      lineHeight: ["24px"],
      letterSpacing: ["0.15px"],
    },
    titleDetailBacklog: {
      fontSize: ["12px"],
      fontFamily: ["Poppins"],
      fontStyle: ["normal"],
      fontWeight: ["400"],
      lineHeight: ["133.4%"],
    },
    attendanceHeader: {
      color: ["#4B465C"],
      fontSize: ["24px"],
      fontFamily: ["Poppins"],
      fontWeight: ["700"],
      lineHeight: ["200%"],
    },
    attendanceTrack: {
      color: ["#4B465C"],
      fontSize: ["16px"],
      fontFamily: ["Poppins"],
      fontWeight: ["400"],
      lineHeight: ["150%"],
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
    titleDetailPrivilege: {
      fontSize: ["18px"],
      fontFamily: ["Poppins"],
      fontStyle: ["normal"],
      fontWeight: ["600"],
      lineHeight: ["175%"],
    },
    titleTextWarningUpload: {
      color: ['rgba(0, 0, 0, 0.38)'],
      fontSize: ["12px"],
      fontFamily: ["Poppins"],
      fontStyle: ["normal"],
      fontWeight: ["400"],
      lineHeight: ["150%"],
    },
    labelHeaderDetail: {
      color: ['rgba(0, 0, 0, 0.60)'],
      fontSize: ["12px"],
      fontFamily: ["Poppins"],
      fontStyle: ["normal"],
      fontWeight: ["400"],
      lineHeight: ["150%"],
    },
    inputDetail: {
      color: ['rgba(0, 0, 0, 0.87)'],
      fontSize: ["16px"],
      fontFamily: ["Poppins"],
      fontStyle: ["normal"],
      fontWeight: ["400"],
      lineHeight: ["150%"],
    },
    taskWorking: {
      color: ['#212121'],
      fontSize: ["16px"],
      fontFamily: ["Poppins"],
      fontStyle: ["normal"],
      fontWeight: ["600"],
      lineHeight: ["150%"],
    },
    TextBulankalender: {
      color: ['black'],
      fontSize: ["30px"],
      fontWeight: ["bold"],
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
        {
          props: {
            variant: "outlined",
          },
          style: {
            textTransform: "none",
            // padding: "6px 16px",
            fontSize: "14px",
            lineHeight: "125%",
            // color: "#2196F3",         
            // justifyContent: "flex-start",
            // background: "#EECEB0",
            // borderColor: "#734011"
          },
        },        
        {
          props: {
            variant: "outlined-warning",
          },
          style: {
            textTransform: "none",
            width: "100%",
            padding: "6px 16px",
            fontSize: "14px",
            lineHeight: "125%",
            borderRadius: "6px",
            background: "#EECEB0",
            color: "#734011",
            borderColor: "#734011",            
          },          
        },
        {
          props: {
            variant: "outlined-holiday",
          },
          style: {
            textTransform: "none",
            // padding: "6px 16px",
            fontSize: "14px",
            // lineHeight: "125%",
            color: "#CB3A31",            
            background: "#FFF4F2",
            borderColor: "black",
            // marginRight: "10vh",
            marginTop: "4vh",
            // width: "40%", 
            // marginRight: "12vh", 
            // marginTop: "9vh"
          },          
        },
        {
          props: {
            variant: "outlined-task",
          },
          style: {
            textTransform: "none",
            width: "40%",
            // padding: "6px 16px",
            fontSize: "14px",
            lineHeight: "125%",
            borderRadius: "6px",
            borderColor: "#2196F3",
            background:'#B1C5F6',
            color: "#3267E3",
          },
        },
        {
          props: {
            variant: "outlined-attedance",
          },
          style: {
            marginTop:'-33px',
            // position: "absolute",
            textTransform: "none",
            width: "85%",
            padding: "6px 16px",
            fontSize: "14px",
            lineHeight: "125%",
            borderRadius: "6px",
            borderColor: "#2196F3",
            background:'#B1C5F6',
            color: "#3267E3",
          },
        },
        {
          props: {
            variant: "outlined-attedance-sick",
          },
          style: {
            marginTop:'-33px',
            // position: "absolute",
            textTransform: "none",
            width: "100%",
            padding: "6px 16px",
            fontSize: "14px",
            lineHeight: "125%",
            borderRadius: "6px",            
            background:'#FBE9E7',
            color: "#FF5722",
            borderColor: "black",
          },
        },
        {
          props: {
            variant: "outlined-attedance-cuti",
          },
          style: {
            marginTop:'-33px',
            // position: "absolute",
            textTransform: "none",
            width: "95%",
            padding: "6px 16px",
            fontSize: "14px",
            lineHeight: "125%",
            borderRadius: "6px",            
            background:'#E0F2F1',
            color: "#009688",
            borderColor: "black",
          },
        },
        {
          props: {
            variant: "outlined-attedance-off",
          },
          style: {
            marginTop:'-33px',
            // position: "absolute",
            textTransform: "none",
            width: "100%",
            padding: "6px 16px",
            fontSize: "14px",
            lineHeight: "125%",
            borderRadius: "6px",            
            background:'#FCE4EC',
            color: "#E91E63",
            borderColor: "black",
          },
        },
        {
          props: {
            variant: "outlined-attedance-today",
          },
          style: {
            marginTop:'-38px',
            // position: "absolute",
            textTransform: "none",
            width: "55%",
            padding: "6px 16px",
            fontSize: "14px",
            lineHeight: "125%",
            borderRadius: "6px",
            borderColor: "#2196F3",
            background:'#B1C5F6',
            color: "#3267E3",
            borderColor: "black",
          },
        },
        {
          props: {
            variant: "saveButton",
          },
          style: {
            color: "#FFFFFF",
            border: "none",
            borderRadius: "4px",
            padding: "6px 16px",
            boxShadow:
              "0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.20)",
            background: "#2196F3",
            textTransform: "none",
            fontSize: "14px",
            lineHeight: "125%",
            "&:hover": {
              backgroundColor: "#2c80c3",
            },
            "&:active": {
              backgroundColor: "#2c80c3",
            },
            "&:disabled": {
              color: "#00000061",
              boxShadow: "none",
              backgroundColor: "#0000001F",
            },
          },
        },
        {
          props: {
            variant: "cancelButton",
          },
          style: {
            color: "#ED6C02",
            border: "1px solid rgba(237, 108, 2, 0.50)",
            borderRadius: "4px",
            padding: "6px 16px",
            background: "transparant",
            textTransform: "none",
            fontSize: "14px",
            lineHeight: "125%",
            "&:hover": {
              backgroundColor: "#ED6C02",
              color: "#FFFFFF",
            },
            "&:active": {
              backgroundColor: "#ED6C02",
              color: "#FFFFFF",
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
