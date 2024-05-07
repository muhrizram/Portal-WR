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
      color: ["rgba(0, 0, 0, 0.38)"],
      fontSize: ["12px"],
      fontFamily: ["Poppins"],
      fontStyle: ["normal"],
      fontWeight: ["400"],
      lineHeight: ["150%"],
    },
    labelHeaderDetail: {
      color: ["rgba(0, 0, 0, 0.60)"],
      fontSize: ["12px"],
      fontFamily: ["Poppins"],
      fontStyle: ["normal"],
      fontWeight: ["400"],
      lineHeight: ["150%"],
    },
    inputDetail: {
      color: ["rgba(0, 0, 0, 0.87)"],
      fontSize: ["16px"],
      fontFamily: ["Poppins"],
      fontStyle: ["normal"],
      fontWeight: ["400"],
      lineHeight: ["150%"],
    },
    taskWorking: {
      color: ["#212121"],
      fontSize: ["16px"],
      fontFamily: ["Poppins"],
      fontStyle: ["normal"],
      fontWeight: ["600"],
      lineHeight: ["150%"],
    },
    TextBulankalender: {
      color: ["black"],
      fontSize: ["30px"],
      fontWeight: ["bold"],
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
