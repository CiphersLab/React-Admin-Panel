import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Route from '../api/route';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import request from 'superagent';
import NumberFormat from 'react-number-format';
import CircularProgress from '@material-ui/core/CircularProgress';


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
  
 
  

  const user = []

class InterpreterList extends Component {
  state = {
    open: false,  
    allUser:[],
    interpreterID:'',
    firstName:'',
    lastName:'',
    emailAddress:'',
    gender:'male',
    address:'',
    phone:'',
    profile:'',
    birthday: '',
    value: 0,
    picture: false,
    verified:true,
    completed:false
  };
  img(event) {
    this.setState({picture:true})
    let file = event.target.files[0]

    const url = `https://api.cloudinary.com/v1_1/dmhp14egx/upload`;
    
        
        const fileName = file.name;
        request.post(url)
            .field('upload_preset', 'erqpnjre')
            .field('file', file)
            .on('progress', (progress) =>{
                console.log(file.name, progress.percent);
                this.setState({value:progress.percent})
               // this.setState
            } )
            .end((error, response) => {
                console.log(fileName, response);
                this.setState({profile: response.body.secure_url, picture:false, value:""})
            
        });
        
        

}


  componentDidMount(){
    let record = {}
  //  this.setState({allUser:this.props.data})
   
    Route(record, "get", "/get/allInterpreter").then(response => response.json()).then((json) => {
     
        let detail = json.content;
        console.log('detail', detail)
        user.length = 0;
        for (var key in detail) {
            
            user.push({
                interpreterID: detail[key].interpreterID,
                firstName: detail[key].firstName,
                lastName: detail[key].lastName,
                emailAddress: detail[key].emailAddress,
                dateOfBirth: detail[key].dateOfBirth,
                gender:detail[key].gender,
                address:detail[key].address,
                phone:detail[key].phone,
                profilePic:detail[key].profilePic

            })  
        }
        this.setState({allUser:user, completed:true})
      }).catch((err) => {
        toast("Failed", err)
      })

  } 
  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleClickOpen(data){
    console.log('data', data.interpreterID)
    this.setState({ open: true, completed:false });

    
    let record = {}
    let interpreterID = data.interpreterID;
   
    Route(record, "post", "/interpreter/get/"+interpreterID).then(response => response.json()).then((json) => {
     if(json.code === 200){
       let detail = json.content[0];
        let id = detail.interpreterID;
        let first = detail.firstName;
        let last = detail.lastName;
        let email = detail.emailAddress;
        let gen = detail.gender;
        let phone = detail.phone;
        let birthday = detail.dateOfBirth;
        let address =detail.address;
        let profile = detail.profilePic;
       
        this.setState({completed:true,interpreterID:id, firstName:first, lastName:last, emailAddress:email, gender:gen, profile:profile, phone:phone, address:address,birthday:birthday })
     }
     else{
       toast('Something Wrong');
       this.setState({completed:true})
     }
      }).catch((err) => {
        toast("Failed", err)
      })

  };

  handleClose = () => {
    this.setState({completed:true})
    this.setState({ open: false, interpreterID:'', firstName:'', lastName:'', emailAddress:'', gender:'male', profile:'', phone:'', address:'', birthday:'' });
  };
  Edit(){
    if(this.state.firstName === ""){
      toast("Please Fill First Name");
    }
    if(this.state.lastName === ""){
      toast("Please Fill Last Name");
    }
     
    if(this.state.verified === false || this.state.email === "" ){
      toast("Something Wrong Please Check Email");
    }
    if(this.state.address === ""){
        toast("Please Enter Address")
    }
    if(this.state.phone === ""){
        toast("Please Enter Number")
    } 
    if(this.state.profile === ""){
        toast("Please Select Profile Picture")
    }
    if (this.state.birthday === ""){
        toast("Enter Your Birthdate")
    }
  if(this.state.firstName !== "" && this.state.lastName !== "" && this.state.email !== "" && this.state.verified === true && this.state.address !== "" && this.state.phone !== "" && this.state.picture !== "" && this.state.birthday !== ""){
    this.setState({completed:false})
    let record = {}
    record.interpreterID = this.state.interpreterID;
    record.firstName = this.state.firstName;
    record.lastName = this.state.lastName;
    record.emailAddress = this.state.emailAddress;
    record.dateOfBirth = this.state.birthday;
    record.address = this.state.address;
    record.gender = this.state.gender;
    record.profilePic = this.state.profile;
    record.phone = this.state.phone;
    Route(record, "post", "/update/interpreter").then(json => { console.log('updated', json)
     
     Route(record, "get", "/get/allInterpreter").then(response => response.json()).then((json) => {
     
       let detail = json.content;
       if(json.code === 200){
       console.log('Interpreter', detail)  
       user.length = 0;
       for (var key in detail) {
          
        user.push({
          interpreterID: detail[key].interpreterID,
          firstName: detail[key].firstName,
          lastName: detail[key].lastName,
          emailAddress: detail[key].emailAddress,
          dateOfBirth: detail[key].dateOfBirth,
          gender:detail[key].gender,
          address:detail[key].address,
          phone:detail[key].phone,
          profilePic:detail[key].profilePic

      }) 
       }
        this.setState({allUser:user, completed:true})
     
     }else{
       toast('Something Wrong Interpreter are not Updated');
       this.setState({completed:true})
     }
     }).catch((err) => {
       toast("Failed", err)
       this.setState({completed:true})
     })

     toast('Successful')  
  
  
  }).catch(err => {
        toast("Itna sa tha bas", err)
        this.setState({completed:true})
      })
   
    this.setState({ open: false, interpreterID:'', firstName:'', lastName:'', emailAddress:'', phone:'', gender:'male', profile:'', address:'', birthday:'' });
    }
  }
  validate = (text) => {
    
    this.setState({emailAddress: text })
    let reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (reg.test(text) === true) {
      this.setState({verified:true, emailAddress: text})
    }
    else{
      this.setState({verified:false})
       
    }
  }
    
    render() {
      const { classes } = this.props;
        console.log('int data', this.props.users)
        if(this.props.users.length > 0 ){
          var tableBody = this.props.users.map((data, index) => {
            return (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {data.firstName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {data.lastName}
                </TableCell>
                <TableCell >{data.emailAddress}</TableCell>
                <TableCell>{data.address}</TableCell>
                <TableCell>{data.phone}</TableCell>
                <TableCell>{data.dateOfBirth}</TableCell>
                <TableCell>{data.gender}</TableCell>
                
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
                  <TableCell>{data.address}</TableCell>
                <TableCell>{data.phone}</TableCell>
                <TableCell>{data.dateOfBirth}</TableCell>
                <TableCell>{data.gender}</TableCell>
                
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
               <Paper className={classes.root} >
      <Table className={classes.table}>
        <TableHead  >
          <TableRow style={{backgroundColor:"#2143b7"}} >
            <TableCell style={{fontFamily:'Times', color:'White', fontSize:20 }} >First Name</TableCell>
            <TableCell style={{fontFamily:'Times', color:'White', fontSize:20 }} >Last Name</TableCell>
            <TableCell style={{fontFamily:'Times', color:'White', fontSize:20 }} >Email</TableCell>
            <TableCell style={{fontFamily:'Times', color:'White', fontSize:20 }}>Address</TableCell>
            <TableCell style={{fontFamily:'Times', color:'White', fontSize:20 }}>Phone</TableCell>
            <TableCell style={{fontFamily:'Times', color:'White', fontSize:20 }}>BirthDate</TableCell>
            <TableCell style={{fontFamily:'Times', color:'White', fontSize:20 }}>Gender</TableCell>
            <TableCell style={{fontFamily:'Times', color:'White', fontSize:20 }}></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        
          {tableBody}
        </TableBody>
      </Table>
    </Paper>
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Edit Data"}</DialogTitle>
          <DialogContent>
            
            
            <TextField  
                        label="First Name"
                        style={{ marginTop: '4%', width: '40%', marginLeft:'5%' }}
                        value={this.state.firstName}
                        onChange={(event) => {this.setState({firstName:event.target.value})}}
                    />
            <TextField  
                        label="Last Name"
                        style={{ marginTop: '4%', width: '40%', marginLeft:'10%' }}
                        value={this.state.lastName}
                        onChange={(event) => {this.setState({lastName:event.target.value})}}
                    />
                  
                     <TextField
                        
                        label="Email"
                        style={{ marginTop: '4%', width: '40%', marginLeft:'5%' }}
                        value={this.state.emailAddress}
                        onChange={(text) => this.validate(text.target.value)}

                    />
                      <NumberFormat
                                customInput={TextField}

                                label="Mobile"
                                value={this.state.phone}
                                style={{ marginTop: '4%', width: '40%', marginLeft: '10%' }}
                                onChange={(event) => { this.setState({ phone: event.target.value }) }}
                                format="####-#######"
                            />
                    <TextField
                                label="Address"
                                style={{ marginTop: '4%', width: '40%', marginLeft: '5%' }}
                                value={this.state.address}
                                onChange={(event) => { this.setState({ address: event.target.value }) }}


                            />
                            <TextField
                                id="date"
                                label="Birthday"
                                type="date"
                                onChange={(event) => { this.setState({ birthday: event.target.value }) }}
                                value={this.state.birthday}
                                style={{ marginTop: '4%', width: '40%', marginLeft: '10%' }}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

            
        
          <RadioGroup
            aria-label="Gender"
            name="gender1"
            className={classes.group}
            value={this.state.gender}
            onChange={this.handleChange}
            style={{ display: 'inline', justifyContent:'center', alignItems:'center' , marginLeft:'5%' }}
          >
            <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" onClick={(evt) => this.setState({ gender: evt.target.value })} />
            <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" onClick={(evt) => this.setState({ gender: evt.target.value })} />
    
          </RadioGroup>
          <br /><br />
          <img src={this.state.profile} alt="" style={{ width: 140, height: 140, borderRadius: 5, marginLeft:'5%' }}  />
            <br />
            {this.state.picture ?
                                <LinearProgress color="secondary" 
                                max={100}
                                value={this.state.value}
                                style={{marginTop:'3%'}}
                                />
                                :
                                <span>
                                    <input
                                        accept="image/*"
                                        className={classes.input}
                                        id="se"
                                        multiple
                                        type="file"
                                        style={{display:'none'}}
                                        onChange={this.img.bind(this)} 
                                    />
                                    <label htmlFor="se">
                                        <Button variant="outlined" component="span" color="secondary" style={{ marginTop: '3%', width: '40%', marginLeft: '5%' }} className={classes.button}>
                                            Upload
                                        </Button>
                                    </label>
                                </span>
                            }


            
          
      
        
         
           
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

InterpreterList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(InterpreterList);