import React, { useState , useEffect} from 'react';
// import Index from '../../Component/Header';
// import BreadCumbComp from '../../Component/BreadCumb';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
// import TabsMenu from '../../Component/menu/tabs';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Autocomplete from '@mui/material/Autocomplete';

const placement = [
  {
    value: 'wfo',
    label: 'WFO',
  },
  {
    value: 'wfh',
    label: 'WFH',
  },
]

const positions = [
  {
    value: 'ceo',
    label: 'Chief Executive Officer',
  },
  {
    value: 'coo',
    label: 'Chief Operation Officer',
  },
  {
    value: 'cco',
    label: 'Chief Customer Officer',
  },
]


const CBiodataEmployee = ({
  onCancel,
  data
  // onSave
}) => {

  // const [ssoId, setSsoId] = useState('');
const [nip, setNip] = useState('');
const [generation, setGeneration] = useState('');
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [npwp, setNPWP] = useState('');
const [email, setEmail] = useState('');
const [joinDate, setJoinDate] = useState('');
const [placementType, setPlacementType] = useState('');
const [contractStatus, setContractStatus] = useState('');
const [statusOnsite, setStatusOnsite] = useState('');
const [carrerStartDate, setCarrerStartDate] = useState('');
const [contractEndDate, setConntractEndDate] = useState('');
const [division, setDivision] = useState('');
const [position, setPosition] = useState('');



  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  // const handleNipChange = (event) => {
  //   setNip(event.target.value);
  // };
  
// useEffect(() => {
// console.log(nip)
// },[])

  const onSave = async () => {    
    const datacreate = {
      nip,
      generation,
      firstName,
      lastName,
      npwp,
      email,
      joinDate,
      placementType,
      contractStatus,
      statusOnsite,
      carrerStartDate,
      contractEndDate,
      division,
      position
    };
  
    //atribut
    // data.ssoId = '';
    // data.nip = '';
    // data.placementType = '';
    // data.group = '';
    try {
      console.log("ini NIP NYA :", datacreate)
      const response = await fetch('http://localhost:4000/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({datacreate}),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Data created successfully');
      } else {
        console.error('Failed to create data');
      }
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };



  return (
    <>
      <Grid container rowSpacing={3}>
        <Grid item xs container direction="column" spacing={2}>
          <Grid container className="containerHeader">

            <Grid>
              <Typography style={{ marginTop: 20, marginLeft: 30 }}>Profile Picture</Typography>
              <input type="file" accept=".png, .jpg" onChange={handleChange} />
              {/* <img src={file} /> */}
              {/* <Button variant="outlined" onClick={handleChange} style={{marginTop:10, marginLeft:30}}>Upload Image</Button> */}
              <Typography className="text" style={{ marginLeft: 30 }}>Single upload file should not be more 3MB. Only the .png/jpg file types are allowed</Typography>
            </Grid>

            <Grid container direction="row" style={{ padding: "20px" }}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-number"
                  style={{ width: "100%", paddingRight: "10px" }}
                  label="NIP"
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                  // onChange={handleNipChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-required"
                  style={{ width: "100%" }}
                  label="Generation"
                  value={generation}
                  onChange={(e) => setGeneration(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container direction="row" style={{ padding: "20px" }}>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-required"
                  style={{ width: "100%", paddingRight: "10px" }}
                  label="Employee First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-required"
                  style={{ width: "100%" }}
                  label="Employee Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container direction="row" style={{ padding: "20px" }}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-number"
                  style={{ width: "100%", paddingRight: "10px" }}
                  label="NPWP"
                  value={npwp}
                  onChange={(e) => setNPWP(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-required"
                  style={{ width: "100%" }}
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container direction="row" style={{ padding: "20px" }}>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Join Date"
                    sx={{
                      width: "100%", paddingRight: "10px"
                    }}
                    // value={joinDate}
                    // onChange={(e) => setJoinDate(e.target.value)}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  required
                  id="outlined-placement-type"
                  style={{ width: "100%" }}
                  options={placement}
                  renderInput={(params) => <TextField {...params} label="Placement Type" required />}
                  value={placementType}
                  onChange={(e) => setPlacementType(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container direction="row" style={{ padding: "20px" }}>
              <Grid item xs={6}>
                <Autocomplete
                  required
                  id="outlined-contract-status"
                  style={{ width: "100%", paddingRight: "10px" }}
                  options={placement}
                  renderInput={(params) => <TextField {...params} label="Contract Status" required />}
                  value={contractStatus}
                  onChange={(e) => setContractStatus(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  required
                  id="outlined-onsite-status"
                  style={{ width: "100%" }}
                  options={placement}
                  renderInput={(params) => <TextField {...params} label="Onsite Status" required />}
                  value={statusOnsite}
                  onChange={(e) => setStatusOnsite(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container direction="row" style={{ padding: "20px" }}>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}
                  style={{ width: "100%", paddingRight: "10px" }}>
                  <DatePicker
                    label="Contract Start Date"
                    sx={{
                      width: "100%", paddingRight: "10px"
                    }}
                    // value={carrerStartDate}
                    // onChange={(e) => setCarrerStartDate(e.target.value)}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker 
                    label="Contract End Date"
                    sx={{
                      width: "100%",
                    }}
                    // value={contractEndDate}
                    // onChange={(e) => setConntractEndDate(date)}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            <Grid container direction="row" style={{ padding: "20px" }}>
              <Grid item xs={6}>
                <Autocomplete
                  required
                  id="outlined-division-group"
                  style={{ width: "100%", paddingRight: "10px" }}
                  options={placement}
                  renderInput={(params) => <TextField {...params} label="Division Group" required />}
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Select Division Group First">
                  <Autocomplete
                    required
                    id="outlined-position"
                    style={{ width: "100%" }}
                    options={positions}
                    renderInput={(params) => <TextField {...params} label="Position" required />}
                    value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  />
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={11.5} alignSelf="center" textAlign="right">
        <Button variant="outlined" color="warning" style={{ marginRight: 3 }} onClick={() => onCancel()}>
          Cancel Data
        </Button>
        <Button variant="contained" onClick={() => onSave()}>
          Save Data
        </Button>
      </Grid>
    </>
  )
}

export default CBiodataEmployee

