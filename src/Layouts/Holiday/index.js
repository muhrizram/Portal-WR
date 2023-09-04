import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DataTable from "../../Component/DataTable";
import SideBar from '../../Component/Sidebar';
import { AlertContext } from "../../context";
import client from "../../global/client";
import CreateHoliday from "./Create";
import EditHoliday from "./Edit";
import UploadHoliday from "./Upload";

const MasterHoliday = () => {
  const columns = [
    {
      field: 'no',
      headerName: 'No',
      flex: 0.5,
      sortable:false,
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1
    },
    {
      field: 'day',
      headerName: 'Weekday',
      flex: 1,
    },
    {
      field: 'notes',
      headerName: 'Name',
      flex: 1
    }
  ];

  const CURRENT_YEAR = new Date().getFullYear().toString();
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState()
  const [openDelete, setOpenDelete] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openUpload, setOpenUpload] = useState(false)
  const [idHoliday, setIdHoliday] = useState(null)
  const { setDataAlert } = useContext(AlertContext)
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState({
    page: 0,
    size: 10,
    sortName: 'date',
    sortType: 'asc',
    month: null,
    year: CURRENT_YEAR,
  })

  const handleClickOpen = (id) => {
    setOpenDelete(true)
    setIdHoliday(id)
  };

  useEffect(() => {
    getData()
  }, [filter])

  const getData = async () => {
    let endpoint = `/holiday?page=${filter.page}&size=${filter.size}&sort=${filter.sortName},${filter.sortType}`;

    if (filter.month !== null) {
      endpoint += `&month=${filter.month}`;
    }

    if (filter.year !== null) {
      endpoint += `&year=${filter.year}`;
    }

    setLoading(true)
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: endpoint
    })
    if (!res.isError) {
      rebuildData(res)
    } else {
      setDataAlert({
        severity: 'error',
        message: res.error.detail,
        open: true
      })
    }
    setLoading(false)
  }

  const rebuildData = (resData) => {
    let temporary = []
    let number = filter.page * filter.size
    temporary = resData.data.map((value, index) => {
      return {
        no: number + (index + 1),
        id: value.id,
        date: value.attributes.date,
        day: value.attributes.weekdays,
        notes: value.attributes.notes
      }
    })
    setData([...temporary])
    setTotalData(resData.meta.page.totalElements)
  }

  const handleClose = () => {
    setOpenDelete(false);
    getData()
  };

  const handleAdd = () => {
    setOpenAdd(true)
  };

  const handleUpload = () => {
    setOpenUpload(true)
  }

  const handleSaveSuccess = () => {
    setOpenAdd(false);
    getData();
  };

  const handleUploadSuccess = () => {
    setOpenUpload(false);
    getData();
  };

  const handleEditSuccess = () => {
    setOpenEdit(false);
    getData();
  };

  const handleEdit = (id) => {
    setIdHoliday(id)
    setOpenEdit(true)
  }

  const handleMonthFilter = (month) => {
    setFilter({
      ...filter,
      month
    });
  }

  const handleYearFilter = (year) => {
    setFilter({
      ...filter,
      year
    });
  }

  const onFilter = (dataFilter) => {
    setFilter({
      page: dataFilter.page,
      size: dataFilter.pageSize,
      sortName: dataFilter.sorting.field !== '' ? dataFilter.sorting[0].field : 'date',
      sortType: dataFilter.sorting.sort !== '' ? dataFilter.sorting[0].sort : 'asc',
      month: filter.month,
      year: filter.year
    })
  }

  const onDelete = async () => {
    const res = await client.requestAPI({
      method: 'DELETE',
      endpoint: `/holiday/delete/${idHoliday}`
    })
    if (!res.isError) {
      setDataAlert({
        severity: 'warning',
        open: true,
        message: res.meta.message
      })
      handleClose();
    } else {
      setDataAlert({
        severity: 'error',
        message: res.error.detail,
        open: true
      })
      setOpenDelete(false)
    }
  };

  return (
    <div>
      <SideBar>
        <DataTable
          title="Holiday"
          data={data}
          loading={loading}
          totalData={totalData}
          columns={columns}
          onFilter={(dataFilter => onFilter(dataFilter))}
          handleChangeMonthFilter={(value) => value ? handleMonthFilter(value.format("MM")) : handleMonthFilter(null)}
          handleChangeYearFilter={(value) => value ? handleYearFilter(value.format("YYYY")) : handleYearFilter(null)}
          onAdd={() => handleAdd()}
          onUpload={() => handleUpload()}
          onEdit={(id) => handleEdit(id)}
          onDelete={(id) => handleClickOpen(id)}
        />
        <Dialog
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog-delete"
        >
          <DialogTitle id="alert-dialog-title" className="dialog-delete-header">
            {"Delete Data"}
          </DialogTitle>
          <DialogContent className="dialog-delete-content">
            <DialogContentText
              className="dialog-delete-text-content"
              id="alert-dialog-description"
            >
              Warning: Deleting this data is irreversible. Are you sure you want to proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialog-delete-actions">
            <Button
              onClick={() => setOpenDelete(false)}
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
      <CreateHoliday openAdd={openAdd} setOpenAdd={setOpenAdd} onSaveSuccess={handleSaveSuccess} />
      <UploadHoliday openUpload={openUpload} setOpenUpload={setOpenUpload} onSaveSuccess={handleUploadSuccess} />
      {idHoliday != null && (
        <EditHoliday openEdit={openEdit} setOpenEdit={setOpenEdit} onEditSuccess={handleEditSuccess} idHoliday={idHoliday} setIdHoliday={setIdHoliday} />
      )}
    </div>
  )
}

export default MasterHoliday