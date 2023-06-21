import React from 'react';
import datatempEmployee from './initjson.json'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DataTable from '../../Component/DataTable';
const CEmployee = () => {
  const columns = [
    {
      field: 'no',
      headerName: 'No',
      flex: 1 
    },
    {
      field: 'nip',
      headerName: 'NIP',
      flex: 1 
    },
    {
        field: 'name',
        headerName: 'Name',
        flex: 1 
    },
    {
        field: 'contract',
        headerName: 'Contract Status',
        flex: 1 
    },
    {
        field: 'assignment',
        headerName: 'Assignment',
        flex: 1 
    },
    {
        field: 'contractEnd',
        headerName: 'Contract End Date',
        flex: 1 
    },
    {
      field: 'actions',
      headerName: 'Action',
      width: 200,
      renderCell: () => {
        return (
          <div>
            <DriveFileRenameOutlineOutlinedIcon className="iconTable" />
            <DeleteOutlineOutlinedIcon className="iconTable" />
          </div>
        )
      }

    },
  ];
  const data = datatempEmployee.datatempEmployee
  const handleChangeSearch = (event) => {
    console.log('value search: ', event.target.value)
  }
  return (
      <DataTable
        title='Employee'
        data={data}
        columns={columns}
        handleChangeSearch={handleChangeSearch}
      />
  )
}

export default CEmployee

