import React, { useState, useEffect, useContext } from "react";
import client from "../../global/client";
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Button,
  CircularProgress,
} from "@mui/material";
import DataTable from "../../Component/DataTable";
import SideBar from "../../Component/Sidebar";
import { AlertContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { ChipComponent } from "../../Component/Chip";
import { convertBase64 } from "../../global/convertBase64";

const Employee = () => {
  const [open, setOpen] = useState(false);
  const { setDataAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [synchroniseMessage, setSynchroniseMessage] = useState("");
  const [synchroniseData, setSynchroniseData] = useState([]);
  const [synchroniseLoading, setSynchroniseLoading] = useState(false);
  const [totalData, setTotalData] = useState();
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: "firstName",
    sortType: "asc",
    search: "",
  });
  const navigate = useNavigate();

  const columns = [
    {
      field: "no",
      headerName: "No",
      sortable: false,
    },
    {
      field: "nip",
      headerName: "NIP",
      flex: 0.5,
    },
    {
      field: "firstName",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => {
        const urlMinio = params.row.image
          ? convertBase64(params.row.image)
          : "";
        let newData = synchroniseData.attributes
          ? synchroniseData.attributes.newSync.length > 0
            ? synchroniseData.attributes.newSync.some((data) => {
                return data.nip === params.row.nip;
              })
            : false
          : false;
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
              position: "relative",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={urlMinio}
                className="img-master-employee"
                alt="Profile Image"
              />
              <div style={{ marginLeft: "0.5rem" }}>
                <span className="text-name">{params.row.firstName}</span>
                <span className="text-position">{params.row.position}</span>
              </div>
            </div>
            {newData && (
              <div style={{ position: "absolute", right: 0 }}>
                <ChipComponent label="New" sx={{ fontWeight: 500 }} />
              </div>
            )}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Work Email",
      flex: 1,
    },
    {
      field: "departement",
      headerName: "Departement",
      flex: 1,
    },
  ];

  useEffect(() => {
    getData();
  }, [filter]);

  const getData = async () => {
    setLoading(true);
    const res = await client.requestAPI({
      method: "GET",
      endpoint: `/users?page=${filter.page}&size=${filter.size}&search=${filter.search}&sort=${filter.sortName},${filter.sortType}`,
    });
    if (!res.isError) {
      rebuildData(res);
    } else {
      setDataAlert({
        severity: "error",
        message: res.error.detail,
        open: true,
      });
    }
    setLoading(false);
  };

  const rebuildData = (resData) => {
    let temp = [];
    let number = filter.page * filter.size;
    temp = resData.data.map((value, index) => {
      return {
        no: number + (index + 1),
        id: value.id,
        nip: value.attributes.nip,
        firstName: value.attributes.fullName,
        position: value.attributes.position,
        image: value.attributes.photoProfile,
        email: value.attributes.email !== "false" ? value.attributes.email : "",
        departement: value.attributes.department,
      };
    });
    setData([...temp]);
    setTotalData(resData.meta.page.totalElements);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    getData();
  };

  const handleChangeSearch = (event) => {
    setFilter({
      ...filter,
      search: event.target.value,
    });
  };

  const RenderSyncMessage = () => {
    if (synchroniseMessage.length < 1) return;
    const usersTotal = synchroniseMessage.match(/\d+/g);
    return (
      <React.Fragment>
        <b>{usersTotal[2]} </b>users have been successfully synchronized.{" "}
        <b>{usersTotal[1]} </b>new users added. <b>{usersTotal[0]} </b>user are
        out of sync.
      </React.Fragment>
    );
  };

  const onSync = async () => {
    setOpen(true);
    setSynchroniseLoading(true);

    const res = await client.requestAPI({
      method: "POST",
      endpoint: "/syncWithOdoo",
    });
    if (!res.isError) {
      setSynchroniseMessage(res.data.meta.message);
      setSynchroniseData(res.data);
      setSynchroniseLoading(false);
    } else {
      setDataAlert({
        severity: "error",
        message: res.error.detail,
        open: true,
      });
    }
  };

  const onFilter = (dataFilter) => {
    setFilter({
      page: dataFilter.page,
      size: dataFilter.pageSize,
      sortName:
        dataFilter.sorting.field !== ""
          ? dataFilter.sorting[0].field
          : "firstName",
      sortType:
        dataFilter.sorting.sort !== "" ? dataFilter.sorting[0].sort : "asc",
      search: filter.search,
    });
  };

  const redirectDetail = (id) => {
    navigate("/masteremployee/detail", { state: { userId: id } });
  };

  return (
    <div>
      <SideBar>
        <DataTable
          title="Employee"
          data={data}
          columns={columns}
          placeSearch="Name, NIP, etc"
          searchTitle="Search By"
          onEmployee={() => onSync()}
          onFilter={(dataFilter) => onFilter(dataFilter)}
          handleChangeSearch={handleChangeSearch}
          totalData={totalData}
          loading={loading}
          onDetail={(id) => redirectDetail(id)}
        />
      </SideBar>
      <Dialog
        open={open}
        onClose={synchroniseLoading ? () => {} : handleCloseDialog}
        className="dialog-info"
      >
        <DialogTitle id="alert-dialog-info" className="dialog-info-header">
          Data Synchronise
        </DialogTitle>
        {synchroniseLoading ? (
          <DialogContent className="dialog-info-content">
            <CircularProgress />
          </DialogContent>
        ) : (
          <React.Fragment>
            <DialogContent className="dialog-info-content">
              <DialogContentText
                id="alert-dialog-text"
                className="dialog-info-text-content"
              >
                Synchronization Successful!
              </DialogContentText>
              <DialogContentText className="dialog-info-text-content">
                Data synchronization has been completed successfully.
              </DialogContentText>
              <DialogContentText className="dialog-info-text-content">
                <RenderSyncMessage />
              </DialogContentText>
            </DialogContent>
            <DialogActions className="dialog-info-actions">
              <Button
                variant="outlined"
                className="button-text"
                onClick={handleCloseDialog}
                aria-labelledby="alert-dialog-info"
              >
                OK
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
      </Dialog>
    </div>
  );
};

export default Employee;
