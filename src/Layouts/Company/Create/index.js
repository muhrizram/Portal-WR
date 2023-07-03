import React, { useState } from 'react';
import Grid from "@mui/material/Grid";
import SideBar from '../../../Component/Sidebar';
import Breadcrumbs from "../../../Component/BreadCumb";
import Header from '../../../Component/Header'
import { Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import '../../../App.css'
import { useNavigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from "react-hook-form";
import FormInputText from '../../../Component/FormInputText';
import schemacompany from '../shema';
import client from '../../../global/client';
const CreateCompany = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [isSave, setIsSave] = useState(false)
  const dataBread = [
    {
      href: "/dashboard",
      title: "Dashboard",
      current: false,
    },
    {
      href: "/master-company",
      title: "Master Company",
      current: false,
    },
    {
      href: "/master-company/create",
      title: "Create New Company",
      current: true,
    },
  ];

  const cancelData = () => {
    console.log('cancel data')
    setIsSave(false)
    setOpen(true)
  }

  const confirmSave = async (data) => {
    console.log('data: ', data)
    // setIsSave(true)
    // setOpen(true)
    const res = await client.requestAPI({
      method: 'POST',
      endpoint: '/company/addCompany',
      data
    })
    console.log('res: ', res)
  }

  const methods = useForm({
    resolver: yupResolver(schemacompany),
    defaultValues: {
      companyName: '',
      companyEmail: '',
      npwp: '',
      address: '',
      picName: '',
      picPhone: undefined,
      picEmail: ''
    }
  })

  const handleClose = () => {
    if (!isSave) {
      navigate('/master-company')
    }
    setOpen(false)
  }
  const onSave = () => {
    setOpen(false)
    // console.log('data save: ', dataCompany)
  }

  return (
    <SideBar>
      <Breadcrumbs breadcrumbs={dataBread} />
        <Grid container>
          <Grid item xs={12} pb={2}>
            <Header judul='Create New Company' />
          </Grid>
          <Grid item xs={12}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(confirmSave)}>
                <div className='card-container'>
                    <Grid 
                      item 
                      container 
                      columnSpacing={3.79}
                      rowSpacing={3.79}
                      xs={12}
                    >
                      <Grid item xs={6}>
                        <FormInputText
                          focused
                          name='companyName'
                          className='input-field-crud'
                          placeholder='e.g PT. ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                          label='Company Name'
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormInputText
                          focused
                          name='companyEmail'
                          className='input-field-crud'
                          placeholder='e.g PT. company@mail.com'
                          label='Company Email'
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormInputText
                          focused
                          name='npwp'
                          className='input-field-crud'
                          placeholder='e.g PT. XX.XXX.XXX.X-XXX.XXX'
                          label='Company NPWP'
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormInputText
                          focused
                          name='address'
                          className='input-field-crud'
                          placeholder='e.g PT. Jalan Gatot Subroto no 122'
                          label='Company Address'
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormInputText
                          focused
                          name='picName'
                          className='input-field-crud'
                          placeholder='e.g Steven White'
                          label='PIC Name'
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormInputText
                          focused
                          name='picPhone'
                          className='input-field-crud'
                          placeholder='e.g 08*********'
                          label='PIC Phone'
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormInputText
                          focused
                          name='picEmail'
                          className='input-field-crud'
                          placeholder='e.g pic@mail.com'
                          label='PIC Email'
                        />
                      </Grid>
                    </Grid>
                  <Grid
                    item 
                    container 
                    xs={12}
                    justifyContent='end'
                  >
                    <Grid item xs={9} />
                    <Grid item xs textAlign='right'>
                      <Button
                        style={{ marginRight: '16px' }} 
                        variant='cancelButton'
                        onClick={() => cancelData()}
                      >
                        Cancel Data
                      </Button>
                      <Button
                        variant='saveButton'
                        type='submit'
                      >
                        Save Data
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </form>
            </FormProvider>
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

export default CreateCompany