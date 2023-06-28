import React, { useState, useEffect } from "react";
import content from "../fileJson/api/db.json";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import CustomAlert from "../../Component/Alert";
import DataTable from "../../Component/DataTable";
import SideBar from "../../Component/Sidebar";
import { useNavigate } from "react-router";

const Employee = () => {
  // const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [Idnya, setIdnya] = useState("");

  const [data, setData] = useState({
    nip: '',
    // phonenumber: '',
    // address: ''
  })

  const onField = (nameObj, value) => {
    const temp = {
      ...data,
      [nameObj]: value
    }
    setData(temp)
    // setDataEdit({
    //   [nameObj]: value
    // })
  }
  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = async () => {
    try {
      const [open, setOpen] = useState(false);
      const [openAlert, setOpenAlert] = useState(false);
      const [Idnya, setIdnya] = useState("");
      const navigate = useNavigate();

      const response = await fetch("http://localhost:4000/content");
      const jsonData = await response.json();
      const updatedData = jsonData.map((item, index) => ({
        ...item,
        no: index + 1,
      }));
      setData(updatedData);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/content/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setOpenAlert(true);
        fetchData(); // Ambil data terbaru setelah berhasil menghapus
      } else {
        console.error("Failed to delete data");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
    handleClose();
  };

  const handleClickOpen = (id) => {
    console.log("IDNYA",id)
    setIdnya(id)
    console.log(Idnya)
    setOpen(true);
  };

  // const onDelete = () => {
  //   console.log("Idnya ",Idnya)
  //   setOpenAlert(true);
  //   handleClose()
  // }

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleDetail = (id) => {
    navigate("/masteremployee/detail");
  };

  const columns = [
    {
      field: "no",
      headerName: "No",
      flex: 1,
    },
    {
      field: "nip",
      headerName: "NIP",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={params.row.image}
              className="img-master-employee"
              alt="Profile Image"
            />
            <div style={{ marginLeft: "0.5rem" }}>
              <span className="text-name">{params.row.name}</span>
              <span className="text-position">{params.row.position}</span>
            </div>
          </div>
        );
      },
    },
    {
      field: "contract",
      headerName: "Contract Status",
      flex: 1,
    },
    {
      field: "assignment",
      headerName: "Assignment",
      flex: 1,
    },
    {
      field: "contractEnd",
      headerName: "Contract End Date",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Action",
      width: 150,
      renderCell: (data) => {
        return (
          <div>
            <IconButton href="/detail">
              <PreviewIcon />
            </IconButton>
            <IconButton onClick={() => handleClickOpen(data.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];
  // const data = content.content
  const handleChangeSearch = (event) => {
    console.log("value search: ", event.target.value);
  };

  const onAdd = () => {
    navigate("/masteremployee/create");
  };
  return (
    <div>
      <SideBar>
        <CustomAlert
          severity="warning"
          message="Deletion completed: The item has been successfully remove from the database"
          open={openAlert}
          onClose={handleCloseAlert}
        />

        <DataTable
          title="Employee"
          data={data}
          columns={columns}
          onAdd={() => onAdd()}
          handleChangeSearch={handleChangeSearch}
          onDetail={(id) => handleDetail(id)}
          onDelete={(id) => console.log("id delete: ", id)}
        />

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog-delete"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Data"}</DialogTitle>
          <DialogContent className="dialog-delete-content">
            <DialogContentText
              className="dialog-delete-text-content"
              id="alert-dialog-description"
            >
              Warning: Deleting this data is irreversible. Are you sure you want
              to proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialog-delete-actions">
            <Button
              onClick={handleClose}
              variant="outlined"
              className="button-text"
            >
              Cancel
            </Button>
            <Button onClick={onDelete} className="delete-button button-text">
              Delete Data
            </Button>
          </DialogActions>
        </Dialog>
      </SideBar>
    </div>
  );
};

export default Employee;
