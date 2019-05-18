import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Route from '../api/route';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@material-ui/core/CircularProgress';

const user = []

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      width: '100%',
    },progress: {
      margin: theme.spacing.unit * 2,
    }
  });
  
  



class UserList extends Component {
  state = {
    open: false,  
    value: 'Male',
    allUser:[],
    completed:false
  };
  
  componentDidMount(){
    let record = {}
    //  this.setState({allUser:this.props.data})
     
      Route(record, "get", "/get/allUsers").then(response => response.json()).then((json) => {
       
          let detail = json.content;
          console.log('detail', detail)
          user.length = 0;
          for (var key in detail) {
              
              user.push({
                  userID: detail[key].userID,
                  firstName: detail[key].firstName,
                  lastName: detail[key].lastName,
                  emailAddress: detail[key].emailAddress,
                  phone:detail[key].phone,
                  gender:detail[key].gender
                  
  
              })  
          }
          this.setState({allUser:user,completed:true})
        }).catch((err) => {
          toast("Failed", err)
        })
  
  }
  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
    
    render() {
      const { classes } = this.props;
        return (
            <div style={{ marginTop:0, width:'95%', marginLeft:'0%' }} >
            <ToastContainer />
            {this.state.completed === !true ?
             <CircularProgress className={classes.progress} style={{marginTop:'30%',marginLeft:'50%', }} size={100} />:
               <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead  >
          <TableRow style={{backgroundColor:"#2143b7"}} >
            <TableCell style={{fontFamily:'Times', color:'White', fontSize:20 }} >First Name</TableCell>
            <TableCell style={{fontFamily:'Times', color:'White', fontSize:20 }}>Last Name</TableCell>
            <TableCell style={{fontFamily:'Times', color:'White', fontSize:20 }} >Email</TableCell>
            <TableCell style={{fontFamily:'Times', color:'White', fontSize:20 }} >Mobile</TableCell>
            <TableCell style={{fontFamily:'Times', color:'White', fontSize:20 }}>Gender</TableCell>
            
            
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.allUser.map((data, index) => {
            return (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {data.firstName}
                </TableCell>
                <TableCell>{data.lastName}</TableCell>
                 <TableCell >{data.emailAddress}</TableCell>
                <TableCell >{data.phone}</TableCell>
                <TableCell>{data.gender}</TableCell>
                
                
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
            }
            </div>
        );
    }
}

UserList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(UserList);