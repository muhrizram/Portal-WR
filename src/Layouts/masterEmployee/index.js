import React from 'react';
import datatempEmployee from './initjson.json'
import DataTableEmployee from '../../Component/DataTable/employee';
import LongMenu from '../../Component/menu';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Employee = () => {
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
            <PreviewOutlinedIcon className="iconTable" />
            <DeleteOutlineOutlinedIcon className="iconTable" />
            {/* <LongMenu /> */}
          </div>
        )
      }

    },
  ];
  const options = [
    'Detail',
    'Delete'
  ]
  const data = datatempEmployee.datatempEmployee
  const handleChangeSearch = (event) => {
    console.log('value search: ', event.target.value)
  }
  return (
      <DataTableEmployee
        title='Employee'
        data={data}
        columns={columns}
        handleChangeSearch={handleChangeSearch}
      />
  )
}

export default Employee