import React, { useContext, useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import SideBar from '../../../Component/Sidebar';
import Breadcrumbs from "../../../Component/BreadCumb";
import Header from '../../../Component/Header'
import { Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, Avatar, IconButton } from '@mui/material';
import '../../../App.css'
import { useNavigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from "react-hook-form";
import FormInputText from '../../../Component/FormInputText';
import schemacompany from '../shema';
import client from '../../../global/client';
import uploadFile from '../../../global/uploadFile';
import TableNative from '../../../Component/DataTable/Native';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { AlertContext } from '../../../context';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import PreviewIcon from "@mui/icons-material/Preview";  

const DetailCompany = () => {
  const [dataProject, setDataProject] = useState([]) 
  const [loading, setLoading] = useState(false)
  
  const getDetailProject =  (id) => {
    setLoading(true)
    localStorage.setItem("projectId", id)
    navigate("/master-project/detail")
  }


  const columnsProject = [
    {
      field: "projectName",
      headerName: "Project Name",
      flex: 1,
      minWidth: 250,
    },
    {
      field: "projectType",
      headerName: "Project Type",
      flex: 1,
      minWidth: 150
    },
    {
      field: "projectDesc",
      headerName: "Detail Project",
      flex: 1,
      minWidth: 140,
      renderCell: (data) => {
        return(
          <div>
            <IconButton 
              onClick={(id) => getDetailProject(data.id)}>
              <PreviewIcon />
            </IconButton>
          </div>
        )
      }
    },
  ]

  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [sendData, setData] = useState({})
  const [isSave, setIsSave] = useState(false)
  const { setDataAlert } = useContext(AlertContext)
  const [file, setFile] = useState('')
  const [companyId, setCompanyId] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [dataDetail, setDataDetail] = useState({})
  const [filePath, setFilePath] = useState('')
  const dataBread = [
    {
      href: "/dashboard",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/master-company",
      title: "Company",
      current: false,
    },
    {
      href: "/master-company/detail",
      title: isEdit ? "Edit Company" : "Detail Company",
      current: true,
    },
  ];

  const cancelData = () => {
    setIsSave(false)
    setOpen(true)
  }

  const confirmSave = async (data) => {
    setIsSave(true)
    setOpen(true)
    setData(data)
  }


  let methods = useForm({
    resolver: yupResolver(schemacompany),
    defaultValues: {
      companyName: '',
      companyEmail: '',
      npwp: '',
      address: '',
    }
  })

  const [filter, setFilter] = useState({
    sortName: "projectName",
    sortType: "desc",
    search: "",
  });

  const onFilter = (dataFilter) => {
    setFilter({
      sortName:
        dataFilter.sorting.field !== ""
          ? dataFilter.sorting[0].field
          : "",
      sortType:
        dataFilter.sorting.sort !== "" ? dataFilter.sorting[0].sort : "desc",
      search: "",
    });
  };

  useEffect(() => {
    getDataDetail()
  }, [filter])

  const getDataDetail = async () => {
    const id = localStorage.getItem('companyId')
    setCompanyId(id)
    const res = await client.requestAPI({
      method: 'GET',
      endpoint: `/company/${id}`
    })
    if (res.data.attributes) {
      buildDataComp(res.data.attributes.projects)
      const temp = res.data.attributes
      delete temp.createdBy
      delete temp.createdOn
      delete temp.isActive
      delete temp.lastModifiedBy
      delete temp.lastModifiedOn
      for (const property in temp) {
        if (property === 'companyProfile') {
          const urlMinio = temp[property] ? `${process.env.REACT_APP_BASE_API}/${temp[property]}` : ''
          setFilePath(temp[property])
          setFile(urlMinio)
        } else {
          methods.setValue(`${property}`, `${temp[property]}`)
          setDataDetail(temp)
        }
      }
    }
  }

  const buildDataComp = (dataCom) => {
    let number = 0
    const temp = dataCom.map((value, index) => {
      return {
        no: number + (index + 1),
        id: value.projectId,
        ...value
      }
    })
    setDataProject(temp)

    // if (temp.length > 0) {
    //   setGetProjectId(temp[0].id);
    // }
  }

  const handleClose = () => {
    if (!isSave) {
      navigate('/master-company')
    }
    setOpen(false)
  }
  const onSave = async () => {
    if(!isSave){
      setOpen(false)
    } else{
      const data = {
        ...sendData,
        companyProfile: filePath,
        createdBy: parseInt(localStorage.getItem('userId')),
        lastModifiedBy: parseInt(localStorage.getItem('userId')),
      }
      const res = await client.requestAPI({
        method: 'PUT',
        endpoint: `/company/${companyId}`,
        data
      })
      if (!res.isError) {
        setDataAlert({
          severity: 'success',
          open: true,
          message: res.data.meta.message
        })
        navigate('/master-company')
      } else {
        setDataAlert({
          severity: 'error',
          message: res.error.detail,
          open: true
        })
      }
      setOpen(false)
    }
  }

  const MAX_SIZE_FILE = 3145728;

  const handleChange = async (e) => {
    if (e.target.files.length > 0) {
      const uploadedFile = e.target.files[0];
      if (uploadedFile.size <= MAX_SIZE_FILE) {
        if (
          uploadedFile.type === "image/jpg" ||
          uploadedFile.type === "image/jpeg" ||
          uploadedFile.type === "image/png"
        ) {
          const tempFilePath = await uploadFile(uploadedFile, 'company');
          setFilePath(tempFilePath);
          setFile(URL.createObjectURL(uploadedFile));
        } else {
          console.error("Tipe file tidak valid.");
          setDataAlert({
                severity: 'error',
                message: "Invalid type file",
                open: true
              })
        }
      } else {
        console.error("File terlalu besar.");
        setDataAlert({
          severity: 'error',
          message: "Company Image can't more than 3MB",
          open: true
        })
      }
    }
  }

  const handleProject = () => {
    // navigate('/masterProject')
    navigate('/master-project/create')
  }

  const clearPhoto = () => {
    setFilePath()
    setFile()
  }

  return (
    <SideBar>
      <Breadcrumbs breadcrumbs={dataBread} />
        <Grid container>
          <Grid item xs={12} sm={8}>
            <Header judul={isEdit ? 'Edit Company' : 'Detail Company'} />
          </Grid>
          {!isEdit && 
            <Grid item xs={12} sm={4} alignSelf='center' sx={{ textAlign: { xs:'start', sm:'end'}}}>
              <Button
                variant='outlined'
                className="button-text"
                startIcon={<EditOutlinedIcon />}
                onClick={() => setIsEdit(true)}
              >
                Edit Data Company
              </Button>
            </Grid>
          }
          <Grid item xs={12}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(confirmSave)}>
                <div className='card-container-detail'>
                    <Grid 
                      item 
                      container 
                      columnSpacing={3.79}
                      rowSpacing={3.79}
                      xs={12}
                    >
                      <Grid item xs={12} sm={2}>
                        <Typography>
                          Company Picture
                        </Typography>
                      </Grid>
                      <Grid item container xs={12}>
                        <Grid item mr={2}>
                          <Avatar src={file} className="image-upload" />
                        </Grid>
                        {isEdit &&
                          <Grid item xs={12} sm={6} mt={2} className='custom-file-upload'>
                            <label className='class-label-upload'>Upload Image</label>
                            <input
                              type="file"
                              accept=".png, .jpg"
                              className="custom-file-input"
                              onChange={handleChange}
                            />
                            {file !== '' ?
                            <IconButton
                              onClick={clearPhoto}>
                              <ClearOutlinedIcon  item xs={2} className='button-clear'
                                // style={{marginLeft: '50px'}}
                              />
                            </IconButton>
                            : ''}
                          </Grid>
                        }
                        {isEdit && 
                          <Grid item xs={12} mt={1}>
                            <Typography variant='titleTextWarningUpload'>
                              Single upload file should not be more 3MB. Only the .png/jpg file types are allowed
                            </Typography>
                          </Grid>
                        }
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {isEdit ? (
                          <FormInputText
                            focused
                            name='companyName'
                            className='input-field-crud'
                            placeholder='e.g PT. ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                            label='Company Name *'
                            inputProps={{
                              maxLength: 50,
                            }}
                          />
                        ) : (
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Typography variant='labelHeaderDetail'>Company Name</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant='inputDetail' style={{ wordBreak: 'break-word' }}>{dataDetail.companyName}</Typography>
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {isEdit ? (
                          <FormInputText
                            focused
                            name='companyEmail'
                            className='input-field-crud'
                            placeholder='e.g company@mail.com'
                            label='Company Email *'
                            inputProps={{
                              maxLength: 100,
                            }}
                          />
                        ) : (
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Typography variant='labelHeaderDetail'>Company Email</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant='inputDetail' style={{ wordBreak: 'break-word' }}>{dataDetail.companyEmail}</Typography>
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {isEdit ? (
                          <FormInputText
                            focused
                            name='npwp'
                            className='input-field-crud'
                            placeholder='e.g XX.XXX.XXX.X-XXX.XXX'
                            label='Company NPWP *'
                            inputProps={{
                              maxLength: 25,
                            }}
                          />
                        ) : (
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Typography variant='labelHeaderDetail'>Company NPWP</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant='inputDetail'>{dataDetail.npwp}</Typography>
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {isEdit ? (
                          <FormInputText
                            focused
                            name='address'
                            className='input-field-crud'
                            placeholder='e.g Jalan Gatot Subroto no 122'
                            label='Company Address *'
                            inputProps={{
                              maxLength: 100,
                            }}
                          />
                        ) : (
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Typography variant='labelHeaderDetail'>Company Address</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant='inputDetail' style={{ wordBreak: 'break-word' }}>{dataDetail.address}</Typography>
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  {isEdit && (
                    <Grid container spacing={2} justifyContent="flex-end" mt={3.5}>
                      <Grid item xs={12} sm={2} textAlign="right">
                        <Button
                          fullWidth
                          variant="cancelButton"
                          onClick={() => cancelData()}
                        >
                          Cancel Data
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={2} textAlign="right">
                        <Button 
                          fullWidth
                          variant="saveButton"
                          type="submit"
                        >
                          Save Data
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </div>
              </form>
            </FormProvider>
          </Grid>
          <Grid item container mt={2} xs={12}>
            <div className='card-container-detail'>
              <Grid item xs={12} mb={3} textAlign='end'>
                <Button
                  variant='outlined'
                  className="button-text"
                  startIcon={<EditOutlinedIcon />}
                  onClick={() => handleProject()}
                >
                  New Project
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TableNative data={dataProject} columns={columnsProject} onFilter={(dataFilter => onFilter(dataFilter))} />
              </Grid>
            </div>
          </Grid>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog-delete"
        >
          <DialogTitle id="alert-dialog-title" className='dialog-delete-header'>
            {isSave ? "Save Data" : 'Cancel Data'}
          </DialogTitle>
          <DialogContent className="dialog-delete-content">
            <DialogContentText className='dialog-delete-text-content' id="alert-dialog-description">
              {isSave ? 'Save your progress: Don\'t forget to save your data before leaving' : 'Warning: Canceling will result in data loss without saving!'}
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialog-delete-actions">
            <Button onClick={handleClose} variant='outlined' className="button-text">{isSave ? 'Back' : 'Cancel without saving'}</Button>
            <Button onClick={onSave} variant='saveButton'>{isSave ? 'Save Data' : 'Back'}</Button>
          </DialogActions>
        </Dialog>
    </SideBar>
  )

}

export default DetailCompany