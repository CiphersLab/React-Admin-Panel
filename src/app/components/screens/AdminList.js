import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {FaEdit} from 'react-icons/fa';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Route from '../api/route';
import NumberFormat from 'react-number-format';

const user = []
const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      width: '100%',
    },
    progress: {
      margin: theme.spacing.unit * 2,
    },
  });
  
    
  
 


class AdminList extends Component {
  constructor(props){
    super(props);
  this.state = {
    open: false,  
    allUser:[],
    firstName:'',
    lastName:'',
    emailAddress:'',
    adminID:'',
    verified:true,
    phone:'',
    completed:false
  };
}
  
  componentDidMount(){
    let record = {}
    this.setState({allUser:this.props.data})
   
    Route(record, "get", "/get/allAdmins").then(response => response.json()).then((json) => {
        console.log('js', json)
        if(json.code === 200){
        let detail = json.content;
        console.log('detail', detail)
        user.length = 0;
        for (var key in detail) {
            
            user.push({
                adminID: detail[key].adminID,
                firstName: detail[key].firstName,
                lastName: detail[key].lastName,
                emailAddress: detail[key].emailAddress,
                phone:detail[key].phone


            })  
        }
         
        this.setState({allUser:user, completed:true})
      }
      }).catch((err) => {
        toast("Failed", err)
      })

  } 

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleClickOpen = (data) => {
    this.setState({ open: true });
    console.log('data user ', data.adminID)
    let record = {}
    let id = data.adminID;
   this.setState({completed:false})
    Route(record, "get", "/profile/admin/"+id).then(response => response.json()).then((json) => {
     
        let detail = json.data;
        let id = detail.adminID;
        let first = detail.firstName;
        let last = detail.lastName;
        let email = detail.emailAddress;
        let phones = detail.phone
        this.setState({adminID:id, firstName:first, lastName:last, emailAddress:email, phone:phones , completed:true})
      }).catch((err) => {
        toast("Failed", err)
        this.setState({completed:true})
      })

  };

  handleClose = () => {
    this.setState({ open: false,completed:true });
    
  };
  
  validate = (text) => {
    
    this.setState({emailAddress: text })
    let reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (reg.test(text) === true) {
      this.setState({verified:true})
    }
    else{
      this.setState({verified:false})
       
    }
  }
  Edit(){
  
    if(this.state.firstName === ""){
      toast("Please Fill First Name");
    }
    if(this.state.lastName === ""){
      toast("Please Fill Last Name");
    }
     
    if(this.state.verified === false  ){
      toast("Something Wrong Please Check Email");
    }
    if(this.state.phone === ""){
      toast("Please Enter Mobile Number")
    }
    if (this.state.firstName !== "" && this.state.lastName !== "" && this.state.emailAddress !== "" && this.state.verified === true && this.state.phone !== ""){
       this.setState({completed:false})
      let record = {}
    record.adminID = this.state.adminID;
    record.firstName = this.state.firstName;
    record.lastName = this.state.lastName;
    record.emailAddress = this.state.emailAddress;
    record.phone = this.state.phone;
    Route(record, "post", "/update/admin").then(json => { console.log('updated', json)
     
    Route(record, "get", "/get/allAdmins").then(response => response.json()).then((json) => {
     console.log(json)
      let detail = json.content;
      if(json.code === 200){
      user.length = 0;
      for (var key in detail) {
          
          user.push({
              adminID: detail[key].adminID,
              firstName: detail[key].firstName,
              lastName: detail[key].lastName,
              emailAddress: detail[key].emailAddress,
              phone:detail[key].phone


          })  
      }
      this.setState({allUser:user, completed:true})
    }else{
      toast('Something Wrong')
    }
    }).catch((err) => {
      toast("Failed", err)
      this.setState({completed:true})
    })
  
  
  
  
  }).catch(err => {
        toast("Itna sa tha bas", err)
        this.setState({completed:true})
      })
    }
    this.setState({ open: false, adminID:'', firstName:'', lastName:'', emailAddress:'', phone:'' });

  }
    render() {
      const { classes } = this.props;
      if(this.props.data.length > 0 ){
        var tableBody = this.props.data.map((data, index) => {
          return (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {data.firstName}
              </TableCell>
              <TableCell component="th" scope="row">
                {data.lastName}
              </TableCell>
              <TableCell >{data.emailAddress}</TableCell>
              <TableCell >{data.phone}</TableCell>
              
              <TableCell><Button color="primary" className={classes.button} onClick={() =>this.handleClickOpen(data)} >
      Edit
   
    <ListItemIcon><FaEdit size={20} color="#003cb3" style={{paddingLeft:'40%'}} /></ListItemIcon>
    </Button>
    </TableCell>
              
            </TableRow>
          );
        })
      }
      else if(this.state.allUser.length > 0){
       tableBody = this.state.allUser.map((data, index) => {
          return (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {data.firstName}
              </TableCell>
              <TableCell component="th" scope="row">
                {data.lastName}
              </TableCell>
              <TableCell >{data.emailAddress}</TableCell>
              <TableCell >{data.phone}</TableCell>
              
              <TableCell><Button color="primary" className={classes.button} onClick={ () =>this.handleClickOpen(data)} >
      Edit
   
    <ListItemIcon><FaEdit size={20} color="#003cb3" style={{paddingLeft:'40%'}} /></ListItemIcon>
    </Button>
    </TableCell>
              
            </TableRow>
          );
        })
      }
      else{
        tableBody = [];
      }

        
        return (
            <div style={{ marginTop:0, width:'95%', marginLeft:'0%' }} >
             <ToastContainer />
             {this.state.completed === !true ?
             <CircularProgress className={classes.progress} style={{marginTop:'30%',marginLeft:'50%', }} size={100} />:
             <span>
             {this.state.allUser === undefined ? "" : 
               <Paper className={classes.root}>

      <Table className={classes.table}>
        <TableHead  >
          <TableRow style={{backgroundColor:"#2143b7"}} >
            <TableCell style={{fontFamily:'Times', color:'White', fontSize:20 }} >First Name</TableCell>
            <TableCell style={{fontFamily:'Times', color:'White', fontSize:20 }} >Last Name</TableCell>
            <TableCell style={{fontFamily:'Times', color:'White', fontSize:20 }} >Email</TableCell>
            <TableCell style={{fontFamily:'Times', color:'White', fontSize:20 }} >Mobile</TableCell>
            
            <TableCell style={{fontFamily:'Times', color:'White', fontSize:20 }}></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
         {tableBody}
        </TableBody>
      </Table>
    </Paper>
             }
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog">{"Edit Data"}</DialogTitle>
          <DialogContent>
           
           <TextField
                        
                        label="First Name"
                        style={{ marginTop: '4%', width: '55%', marginLeft:'5%' }}
                        value={this.state.firstName}
                        onChange={(event) => { this.setState({ firstName: event.target.value }) }}

                    />
                  <TextField
                        
                        label="Last Name"
                        style={{ marginTop: '4%', width: '55%', marginLeft:'5%' }}
                        value={this.state.lastName}
                        onChange={(event) => { this.setState({ lastName: event.target.value }) }}

                    />
                     <TextField
                        
                        label="Email"
                        style={{ marginTop: '4%', width: '55%', marginLeft:'5%' }}
                        value={this.state.emailAddress}
                        onChange={(text) => this.validate(text.target.value)}

                    />
                    
                     <NumberFormat
                      customInput={TextField}
                      label="Mobile"
                      value={this.state.phone}
                      style={{ marginTop: '4%', width: '55%', marginLeft: '5%' }}
                      onChange={(event) => { this.setState({ phone: event.target.value }) }}
                      format="####-#######"
              /> 
              
            
          <br /><br />
       
        
         
            
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.Edit.bind(this)} color="primary" autoFocus>
              Update
            </Button>
          </DialogActions>
        </Dialog>
        </span>
             }
            </div>
        );
    }
}

AdminList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(AdminList);