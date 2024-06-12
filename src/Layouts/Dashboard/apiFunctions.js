import client from "../../global/client";

export const getCountEmployeeCheckIn = async (
  setEmployeeCheckIn,
  setEmployeeNotCheckIn,
  setDataAlert
) => {
  const res = await client.requestAPI({
    method: "GET",
    endpoint: "/dashboard/count-check-in",
  });
  if (!res.isError) {
    setEmployeeCheckIn(res.employeeCheckIn);
    setEmployeeNotCheckIn(res.employeeNotCheckIn);
  } else {
    setDataAlert({
      open: true,
      message: "Failed to get data",
      severity: "error",
    });
  }
};

export const getEmployeeCheckIn = async (rebuildData, setDataAlert, filter) => {
  const res = await client.requestAPI({
    method: "GET",
    endpoint: `/dashboard/employee-check-in?page=${filter.page}&size=${filter.size}`,
  });
  if (!res.isError) {
    rebuildData(res);
  } else {
    setDataAlert({
      open: true,
      message: "Failed to get data",
      severity: "error",
    });
  }
};

export const getEmployeeNotCheckIn = async (
  rebuildData,
  setDataAlert,
  filter
) => {
  const res = await client.requestAPI({
    method: "GET",
    endpoint: `/dashboard/employee-not-check-in?page=${filter.page}&size=${filter.size}`,
  });
  if (!res.isError) {
    rebuildData(res);
  } else {
    setDataAlert({
      open: true,
      message: "Failed to get data",
      severity: "error",
    });
  }
};
