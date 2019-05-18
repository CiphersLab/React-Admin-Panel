import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FaUser } from 'react-icons/fa';
import { FaUserSecret } from 'react-icons/fa';
import { FaUniversalAccess } from 'react-icons/fa';
import {MdDashboard} from 'react-icons/md'
import UserList from './UserList';
import CreateNewAdmin from './CreateNewAdmin';
import CreateNewInterpreter from  './CreateNewInterpreter';


import Dashboard from './Dashboard';
import { Grid, Row, Col } from 'react-bootstrap';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';


const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: '20',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});


class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserList: false,
            mobileOpen: false,
            AdminList: false,
            InterpreterList: false,
            Dashboard: true,
            

        }
    }

    admin() {
        this.setState({ AdminList: true, InterpreterList: false, UserList: false, Dashboard: false })
    }
    Interpreter() {
        this.setState({ InterpreterList: true, AdminList: false, UserList: false, Dashboard: false })
    }
    User() {
        this.setState({ UserList: true, AdminList: false, InterpreterList: false, Dashboard: false })
    }
    Dashboard() {
        this.setState({ Dashboard: true, UserList: false, AdminList: false, InterpreterList: false })
    }

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    render() {
        const { classes, theme } = this.props;
        const drawer = (
            <div>
                <div className={classes.toolbar} />
                 <Divider />
                <Grid></Grid>
                <Row className={classes.root}>
                    <CssBaseline />
                    <AppBar position="fixed" >
                        <Toolbar>
                            <IconButton className={styles.menuButton} color="inherit" aria-label="Menu" onClick={this.handleDrawerToggle} >
                                <MenuIcon />
                            </IconButton>

                            <Button style={{ marginLeft: 'auto' }} color="inherit">Logout</Button>

                        </Toolbar>
                    </AppBar>
                </Row>

                    <Col xs={6} md={4}>
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true,
                            }}

                        >
                            <div className={classes.toolbar} />
                        <Divider />
                            <Col xs={4} md={4}>
                                <List>
                                    <ListItem button onClick={this.Dashboard.bind(this)}  >
                                        <ListItemIcon><MdDashboard size={30} color="#003cb3" /></ListItemIcon>
                                        <ListItemText primary="Dashboard" />
                                    </ListItem>
                                </List>
                                 <Divider />
                                <List>
                                    <ListItem button onClick={this.admin.bind(this)} >
                                        <ListItemIcon><FaUserSecret size={30} color="#003cb3" /></ListItemIcon>
                                        <ListItemText primary="Admin" />
                                    </ListItem>
                                </List>
                                <Divider />

                                <List>
                                    <ListItem button onClick={this.Interpreter.bind(this)}  >
                                        <ListItemIcon><FaUniversalAccess size={30} color="#003cb3" /></ListItemIcon>
                                        <ListItemText primary="Interpreter" />
                                    </ListItem>
                                </List>
                                <Divider />
                                <List>
                                    <ListItem button onClick={this.User.bind(this)}  >
                                       <ListItemIcon>
                                        <FaUser size={30} color="#003cb3" /> 
                                       </ListItemIcon>
                                        <ListItemText primary="User" />
                                    </ListItem>
                                </List>
                                <Divider /> 
                            </Col>
                        </Drawer>
                    </Hidden>
                </Col>
                <Divider />
                <List>
                    <ListItem button onClick={this.Dashboard.bind(this)}  >
                        <ListItemIcon><MdDashboard size={30} color="#003cb3" /></ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button onClick={this.admin.bind(this)} >
                        <ListItemIcon><FaUserSecret size={30} color="#003cb3" /></ListItemIcon>
                        <ListItemText primary="Admin" />
                    </ListItem>

                </List>
                <Divider />
                <List>
                    <ListItem button onClick={this.Interpreter.bind(this)}  >
                        <ListItemIcon><FaUniversalAccess size={30} color="#003cb3" /></ListItemIcon>
                        <ListItemText primary="Interpreter" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button onClick={this.User.bind(this)}  >
                        <ListItemIcon> 
                      <FaUser size={30} color="#003cb3" />
                      </ListItemIcon> <ListItemText primary="User" />
                    </ListItem>
                </List> 
                <Divider /> 

            </div>
        );
        return (
            <div className={classes.root}>
                 <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>

                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer}>

                    <Hidden smUp implementation="css">
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.state.Dashboard === true ?
                     <span>
                     
                     <Col xs={12} md={8}>
                          <div >
                             <Dashboard  /> 
                         </div> 
                     </Col>  
                     </span> :
                        this.state.AdminList === true ?
                        <span>
                            
                                    <CreateNewAdmin  />
                             
                            </span> : this.state.InterpreterList === true ?
                            <span>
                                
                                       <CreateNewInterpreter />

                                 </span> : this.state.UserList === true ?
                                <span>
                                    
                                    <Col xs={12} md={8}>
                                        <div >
                                            <UserList />
                                        </div>
                                    </Col> 
                                    </span> : ''
                    }
                </main> 
            </div>
        );
    }
}

SideBar.propTypes = {
    classes: PropTypes.object.isRequired,

    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SideBar);