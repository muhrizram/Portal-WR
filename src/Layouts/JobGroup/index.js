import React from 'react';
import datatemp from './initjson.json'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DataTable from '../../Component/DataTable';
const Jobgroup = () => {
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1 
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1 
    },
    {
      field: 'actions',
      headerName: '',
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
  const data = datatemp.datatemp

  const handleChangeSearch = (event) => {
    console.log('value search: ', event.target.value)
  }
  

  const handleAdd = () => {
    console.log('add')
  }
  return (
      <DataTable
        title='Group'
        data={data}
        columns={columns}
        placeSearch="project"
        searchTitle="Search By"
        onButtonClick={() => handleAdd()}
        handleChangeSearch={handleChangeSearch}
      />
  )
}

export default Jobgroup