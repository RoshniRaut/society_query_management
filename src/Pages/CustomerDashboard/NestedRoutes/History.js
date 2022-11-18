import { CircularProgress, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react'
import Time from 'react-time/lib/Time';
import TimeAgo from 'timeago-react';
import { useCurrentProfile } from '../../../Context/currentprofile.context';
import { useProfile } from '../../../Context/profile.context';
import { auth } from '../../../firebase';
import { BarChart } from '../../Common/BarChart';

export const History = () => {
    const {loading,queries,count}=useCurrentProfile();
    const {events}=useProfile();
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  
  return (loading?<Container sx={{display:'flex',justifyContent:'center', alignItems:'center',height:'80vh'}}>
  <CircularProgress />
</Container>:
<div>
  <Typography variant="h4" textAlign={"center"} margin={3}>
          Welcome {auth.currentUser.displayName}
          {console.log(count)}
  </Typography>
  <Grid container spacing={3}>
  {/* Graph that represents query status */}
  <Grid item xs={6}>
    <Paper sx={{p:2}}>
      <div style={{maxWidth:'70vh'}}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
         Status of Queries
        </Typography>
        <BarChart count={count}/>
      </div>
    </Paper>
  </Grid>
    {/* Recent event */}
    <Grid item sx={6}>
    <Paper sx={{p:2, mt:1}}>
      <Grid item xs={12}>
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Upcoming Events
    </Typography>
      <Table size="small">
        <TableHead>
          <TableRow >
            <TableCell sx={{fontWeight:"bold"}}>Subject</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.length>0 && events.filter((row)=>row.start>new Date()).filter((row,i)=> i<4).map((row,id) => (
            <TableRow key={id}>
              <TableCell sx={{width:'70px',height:'10px',whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}}>
                {row.title} at <Time value={row.start} format="HH:mm"  />
                </TableCell>
              <TableCell><Time value={row.start} format="DD-MM-YYYY"/></TableCell>
              {/*
              <TableCell><TimeAgo datetime={row.createdAt.toDate()}/></TableCell>*/}
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </Grid>
    </Paper>
    </Grid>
    </Grid>
      {/* Recent Queries */}
      <Paper sx={{p:2, mt:1}}>
      <Grid item xs={12}>
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Recent Query
    </Typography>
      <Table size="small">
        <TableHead>
          <TableRow >
            <TableCell sx={{fontWeight:"bold"}}>Subject</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Status</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {queries.length>0 && queries.filter((row,i)=> i<5).map((row,id) => (
            <TableRow key={id}>
              <TableCell>{row.subject}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell><TimeAgo datetime={row.createdAt.toDate()}/></TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </Grid>
    </Paper>
  </div>
  )
}
