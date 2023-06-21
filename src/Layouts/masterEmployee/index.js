import React from 'react';
import datatempEmployee from './initjson.json'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DataTable from '../../Component/DataTable';
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

export default Employee






// import React from 'react';
// import Grid from '@mui/material/Grid';
// import { Typography, Button, Tab } from '@mui/material';
// // import AddIcon from '@mui/icons-material/Add';
// import SearchEmployee from '../../Component/Searchbar/s_employee';
// import DownloadIcon from '@mui/icons-material/Download';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import TableEmployee from '../../Component/tabEmployee';
// import { DataGrid } from '@mui/x-data-grid';
// import Stack from '@mui/material/Stack';
// // import datatemp from './initjson.json'
// import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

// const Employee = () => {
//   const columns = [
//     {
//       field: 'name',
//       headerName: 'Name',
//       flex: 1 
//     },
//     {
//       field: 'status',
//       headerName: 'Status',
//       flex: 1 
//     },
//     {
//       field: 'actions',
//       headerName: '',
//       width: 200,
//       renderCell: () => {
//         return (
//           <div>
//             <DriveFileRenameOutlineOutlinedIcon className="iconTable" />
//             <DeleteOutlineOutlinedIcon className="iconTable" />
//           </div>
//         )
//       }

//     },
//   ];
// //   const data = datatemp.datatemp

//   const handleChangeSearch = (event) => {
//     console.log('value search: ', event.target.value)
//   }
//   return (
//       <Grid container rowSpacing={2.5}>
//         <Grid item xs={12}>
//           <Grid container>
//             <div className="dividerHeader" />
//             <Grid item xs={9.9}>
//               <Typography variant="headerCardMenu">Master Employee</Typography>
//             </Grid>
//             <Grid item />
//             <Grid item xs={2} alignSelf="center" textAlign="center">
//                 <div className="containerButton">
//                     <Button variant="contained" startIcon={<DownloadIcon />}>
//                         New Employee
//                     </Button>
//                     <Button variant="outlined" startIcon={<UploadFileIcon />}>
//                         Import Employee
//                     </Button>
//                 </div>  
//             </Grid>
//             <SearchEmployee />
//             <TableEmployee />
//           </Grid>
//         </Grid>
//       </Grid>
//   )
// }

// export default Employee