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
import InterpreterList from './InterpreterList';
import { Col } from 'react-bootstrap';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import request from 'superagent';
import CircularProgress from '@material-ui/core/CircularProgress';





const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },progress: {
        margin: theme.spacing.unit * 2,
      }
});

const style = {
    width: 150
}
const user = []

class CreateNewInterpreter extends Component {
    state = {
        open: false,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        birthday: '',
        value: 0,
        picture: false,
        gender: 'male',
        profile: '',
        allUser: [],
        completed:true
    };
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({completed:true})
        this.setState({ open: false, firstName: '', email: '', phone: '', password: '', lastName: '', address: '', profile: '', gender: 'male', birthday: '' });
    };
    validate = (text) => {

        this.setState({ email: text })
        let reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (reg.test(text) === true) {
            this.setState({ verified: true })
        }
        else {
            this.setState({ verified: false })

        }
    }

    handleRecord = () => {
        if (this.state.firstName === "") {
            toast("Please Fill First Name");
        }
        if (this.state.lastName === "") {
            toast("Please Fill Last Name");
        }

        if (this.state.verified === false || this.state.email === "") {
            toast("Something Wrong Please Check Email");
        }
        if (this.state.password === "") {
            toast("Please Enter Password");
        }
        if (this.state.password !== "") {
            if (this.state.password.length < 8) {
                toast("Password Length Atleast 8 Character Long");
            }
        }
        if (this.state.address === "") {
            toast("Please Enter Address")
        }
        if (this.state.phone === "") {
            toast("Please Enter Number")
        }
        if (this.state.profile === "") {
            toast("Please Select Profile Picture")
        }
        if (this.state.birthday === "") {
            toast("Enter Your Birthdate")
        }
        if (this.state.firstName !== "" && this.state.lastName !== "" && this.state.email !== "" && this.state.verified === true && this.state.password !== "" && this.state.password.length >= 8 && this.state.address !== "" && this.state.phone !== "" && this.state.picture !== "" && this.state.birthday !== "") {
            let record = {}
            this.setState({completed:false})
            console.log('Interpreter Password', this.state.password)
            record.firstName = this.state.firstName;
            record.lastName = this.state.lastName;
            record.emailAddress = this.state.email;
            record.phone = this.state.phone;
            record.pinCode = this.state.password;
            record.address = this.state.address;
            record.gender = this.state.gender;
            record.profilePic = this.state.profile;
            record.dateOfBirth = this.state.birthday;
            console.log('record', record)

            Route(record, "post", "/register/interpreter")
                .then(json => {

                    Route(record, "get", "/get/allInterpreter").then(response => response.json()).then((json) => {

                        let detail = json.content;
                        console.log('res', detail)
                        user.length = 0;
                        for (var key in detail) {

                            user.push({
                                interpreterID: detail[key].interpreterID,
                                firstName: detail[key].firstName,
                                lastName: detail[key].lastName,
                                emailAddress: detail[key].emailAddress,
                                dateOfBirth: detail[key].dateOfBirth,
                                gender: detail[key].gender,
                                address: detail[key].address,
                                phone: detail[key].phone,
                                profilePic: detail[key].profilePic


                            })
                        }

                        this.setState({ allUser: user , completed:true})





                    }).catch((err) => {
                        toast("Failed", err)
                        this.setState({ completed:true})
                    })
                    toast("Successful")
                })
                .catch(err => {
                    toast("Itna sa tha bas", err)
                    this.setState({  completed:true})
                })



            this.setState({ open: false, firstName: '', email: '', phone: '', password: '', lastName: '', address: '', profile: '', gender: 'male', birthday: '' });
        }
    };
    img(event) {
        this.setState({ picture: true })
        let file = event.target.files[0]
        console.log('Files', file)
        const url = `https://api.cloudinary.com/v1_1/dmhp14egx/upload`;


        const fileName = file.name;
        request.post(url)
            .field('upload_preset', 'erqpnjre')
            .field('file', file)
            .on('progress', (progress) => {
                console.log(file.name, progress.percent);
                this.setState({ value: progress.percent })
                // this.setState
            })
            .end((error, response) => {
                console.log(fileName, response);
                this.setState({ profile: response.body.secure_url, picture: false, value: "" })

            });



    }

    render() {
        const { classes } = this.props;
        return (
            <div  >
                <ToastContainer />
                {this.state.completed === !true ?
                    <CircularProgress className={classes.progress} style={{ marginTop: '30%', marginLeft: '50%', }} size={100} /> :
                    <span>

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
                                <InterpreterList users={this.state.allUser} />
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
                                    style={{ marginTop: '4%', width: '40%', marginLeft: '5%' }}
                                    value={this.state.firstName}
                                    onChange={(event) => { this.setState({ firstName: event.target.value }) }}


                                />
                                <TextField

                                    label="Last Name"
                                    style={{ marginTop: '4%', width: '40%', marginLeft: '10%' }}
                                    value={this.state.lastName}
                                    onChange={(event) => { this.setState({ lastName: event.target.value }) }}


                                />
                                <TextField

                                    label="Email"
                                    style={{ marginTop: '4%', width: '40%', marginLeft: '5%' }}
                                    value={this.state.email}
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

                                    label="Password"
                                    type="password"
                                    style={{ marginTop: '4%', width: '40%', marginLeft: '5%' }}
                                    value={this.state.password}
                                    onChange={(event) => { this.setState({ password: event.target.value }) }}
                                />
                                <TextField
                                    id=""
                                    label="Address"
                                    style={{ marginTop: '4%', width: '40%', marginLeft: '10%' }}
                                    value={this.state.address}
                                    onChange={(event) => { this.setState({ address: event.target.value }) }}


                                />
                                <TextField
                                    id="date"
                                    label="Birthday"
                                    type="date"
                                    onChange={(event) => { this.setState({ birthday: event.target.value }) }}
                                    value={this.state.birthday}
                                    style={{ marginTop: '4%', width: '40%', marginLeft: '5%' }}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                {this.state.picture ?
                                    <LinearProgress color="secondary"
                                        max={100}
                                        value={this.state.value}
                                        style={{ marginTop: '3%' }}
                                    />
                                    :
                                    <span>
                                        <input
                                            accept="image/*"
                                            className={classes.input}
                                            id="outlined-button-file"
                                            multiple
                                            type="file"
                                            style={{ display: 'none' }}
                                            onChange={this.img.bind(this)}
                                        />
                                        <label htmlFor="outlined-button-file">
                                            <Button variant="outlined" component="span" color="secondary" style={{ marginTop: '6%', width: '40%', marginLeft: '10%' }} className={classes.button}>
                                                Upload
        </Button>
                                        </label>
                                    </span>
                                }

                                <RadioGroup
                                    aria-label="gender"
                                    name="gender2"
                                    className={classes.group}
                                    value={this.state.gender}
                                    onChange={this.handleChange}
                                    style={{ display: 'flex', flexDirection: 'row', marginLeft: '30%', marginTop: '4%' }}
                                >
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio color="secondary" />}
                                        label="Male"
                                        labelPlacement="start"
                                        style={{ width: 'auto' }}
                                        onClick={(evt) => this.setState({ gender: evt.target.value })}
                                    />
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio color="secondary" />}
                                        style={{ width: 'auto' }}
                                        label="Female"
                                        labelPlacement="start"
                                        onClick={(evt) => this.setState({ gender: evt.target.value })}
                                    />
                                </RadioGroup>

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


                    </span>
                }

            </div>
        );
    }
}

CreateNewInterpreter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateNewInterpreter);