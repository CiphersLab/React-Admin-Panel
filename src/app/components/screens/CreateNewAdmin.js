import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import { FaPlus } from 'react-icons/fa';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NumberFormat from 'react-number-format';
import Route from '../api/route';
import 'react-notifications/lib/notifications.css';
import { ToastContainer, toast } from 'react-toastify';
import Paper from '@material-ui/core/Paper';
import 'react-toastify/dist/ReactToastify.css';
import AdminList from './AdminList';
import { Col } from 'react-bootstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  error: {
    marginLeft: '20%',
    color: 'red',
    fontSize: 8
  },progress: {
    margin: theme.spacing.unit * 2,
  }
});

const style = {
  width: 150
}
const user=[]

class CreateNewAdmin extends Component {
  state = {
    open: false,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    allUser:[],
    verified:false,
    completed:true
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({completed:true})
    this.setState({ open: false, firstName: '', email: '', phone: '', password: '', lastName: '' });
  };

  
 validate = (text) => {
    
    this.setState({ email: text })
    let reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (reg.test(text) === true) {
      this.setState({verified:true})
    }
    else{
      this.setState({verified:false})
       
    }
  }
  handleRecord = () => {
    if(this.state.firstName === ""){
      toast("Please Fill First Name");
    }
    if(this.state.lastName === ""){
      toast("Please Fill Last Name");
    }
     
    if(this.state.verified === false || this.state.email === "" ){
      toast("Something Wrong Please Check Email");
    }
    if(this.state.password === ""){
      toast("Please Enter Password");
    }
    if(this.state.password !== ""){
      if(this.state.password.length < 8){
        toast("Password Length Atleast 8 Character Long");
      }
    }
    if(this.state.phone === ""){
      toast("Please Enter Mobile Number");
    }
    if (this.state.firstName !== "" && this.state.lastName !== "" && this.state.email !== "" && this.state.verified === true && this.state.password !=="" && this.state.password.length >=8 && this.state.phone !== ""){
    this.setState({completed:false})
      let record = {}
    record.firstName = this.state.firstName;
    record.lastName = this.state.lastName;
    record.emailAddress = this.state.email;
    record.phone = this.state.phone;
    record.pinCode = this.state.password
    

    Route(record, "post", "/register/admin")
      .then(json => {
        
        
        Route(record, "get", "/get/allAdmins").then(response => response.json()).then((json) => {
          if(json.code === 200){

          let detail = json.content;
          user.length = 0;
          for (var key in detail) {
             
              user.push({
                  adminID: detail[key].adminID,
                  firstName: detail[key].firstName,
                  lastName: detail[key].lastName,
                  emailAddress: detail[key].emailAddress,
                  phone : detail[key].phone
  
  
              })  
          }
        
          this.setState({allUser:user, completed:true})
        
          
      
        }else
        {
          toast("Something Wrong")
        }
          
        }).catch((err) => {
          toast("Failed", err)
        })
  
    })
      .catch(err => {
        toast("Itna sa tha bas", err)
      })

      this.setState({ open: false, firstName: '', email: '', phone: '', password: '', lastName: '' });
    }
    
  };

  render() {
    const { classes } = this.props;
   
    return (

      <div  >
        <ToastContainer />
        {this.state.completed === !true ?
             <CircularProgress className={classes.progress} style={{marginTop:'30%',marginLeft:'50%', }} size={100} />:
             <React.Fragment>
        <Col xs={4} md={4}>

          <Paper style={style} elevation={1} >
            <Button variant="contained" color="primary" onClick={this.handleClickOpen} style={{ fontFamily: 'Times' }} className={classes.button}>

              <ListItemIcon><FaPlus size={20} color="white" /></ListItemIcon>
              Add New

      </Button>
          </Paper>
        </Col>
 
        <Col xs={12} md={8}>
        
          <div >
            <AdminList data={this.state.allUser} />
          </div>
         
        </Col>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"New Record"}</DialogTitle>
          <DialogContent>
              <TextField
                label="First Name"
                style={{ marginTop: '4%', width: '55%', marginLeft: '22%' }}
                value={this.state.firstName}
                onChange={ (event) => this.setState({ firstName:event.target.value})} 


              />
              <TextField
                label="Last Name"
                style={{ marginTop: '4%', width: '55%', marginLeft: '22%' }}
                value={this.state.lastName}
                onChange={ (event) => this.setState({lastName:event.target.value})}
              />
              
              <TextField
                label="Email"
                style={{ marginTop: '4%', width: '55%', marginLeft: '22%' }}
                value={this.state.email}
                onChange={(text) => this.validate(text.target.value)}              />

              <NumberFormat
                customInput={TextField}
                label="Mobile"
                value={this.state.Phone}
                style={{ marginTop: '4%', width: '55%', marginLeft: '22%' }}
                onChange={(event) => { this.setState({ phone: event.target.value }) }}
                format="####-#######"
              />
              <TextField
                label="Password"
                type="password"
                style={{ marginTop: '4%', width: '55%', marginLeft: '22%' }}
                value={this.state.password}
                onChange={(event) => { this.setState({ password: event.target.value }) }}
              />




            
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleRecord} color="primary" autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
        </React.Fragment>
        }



      </div>
    );
  }
}

CreateNewAdmin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateNewAdmin);