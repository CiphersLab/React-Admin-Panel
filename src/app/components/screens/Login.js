import React, { Component } from 'react'
import {  Paper, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';



const style = {
    height: 351,
    marginTop: '12%',
    width: '30%',
    marginLeft: '35%',
    marginRight: '35%',
    textAlign: 'center',
    display: 'inline-block',
};

export default class Login extends Component {
    login(){
        this.props.history.push('/Main')
    }
    render() {
        return (
            <div  >
               


                <Paper style={style} elevation={15} rounded="true" >
                    <TextField
                        id="standard-dense"
                        label="Email"
                        style={{ marginTop: '6%', width: '68%' }}

                    />
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        style={{ marginTop: '8%', width: '68%' }}

                    />
                    <Button variant="contained" color="primary" style={{marginTop:'14%', justifyContent:'center', alignItems:'center', width:'68%' }} onClick={this.login.bind(this)} >
                     Login
                    </Button>
                </Paper>
            </div>
        );
    }
}