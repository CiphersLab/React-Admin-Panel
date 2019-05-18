import React, { Component } from 'react';
import {Paper} from '@material-ui/core';
import { Grid, Row, Col } from 'react-bootstrap';
import {MdLocalDrink, MdPeopleOutline, MdApps} from 'react-icons/md';
import {TiMessageTyping} from 'react-icons/ti';

import {Bar} from 'react-chartjs-2';
const style ={
first:{
  height: 120,
  marginTop: '1%',
  width: 220,
  marginLeft: '30%',
  marginRight: '30%',
 
  backgroundColor:'#0086b3'
},
second:{
  height: 120,
  marginTop: '1%',
  width: 220,
  marginLeft: '30%',
  marginRight: '30%',
  backgroundColor:'#ffa31a'
},
third:{
  height: 120,
  marginTop: '1%',
  width: 220,
  marginLeft: '30%',
  marginRight: '30%',
 
  backgroundColor:'#00994d'
},
fourth:{
  height: 120,
  marginTop: '1%',
  width: 220,
  marginLeft: '30%',
  marginRight: '30%',
  
  backgroundColor:'#ff0000'
}
};


class SimpleCard extends Component  {
  constructor(){
    super();
    this.state = {
      chartData:{
        labels: ['Karachi', 'Lahore', 'Peshawar', 'Quetta'],
        datasets:[{
          label:'User',
          data:[
            944,
            745,
            471,
            198,
          ],
          backgroundColor:[
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            
          ]
        }]
      }
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }
  
	
    render(){
      
  return (
    
  
    <Grid>
     <Row>
    <Col  xs={6} md={3} style={{display:'inline-block', marginLeft:'5%'}} >
    <Paper style={style.first} elevation={12}   >
    <br />
    <div style={{ color:'white', marginLeft:'5%', float:'left', marginRight:'3%'}}>
    <span >
    <MdLocalDrink size={60} />
    </span>
    </div>
    <div style={{ color:'white', fontFamily:'Times',fontSize:12, marginLeft:'5%', marginTop:'4%'}}>
      <span >No. of Cost</span>  
    </div>
   
    <div style={{fontSize:36, fontFamily:'Times', color:'white' , marginTop:-6 }}>
    <span  >
      04
    </span>
    </div> </Paper>
    </Col>
    <Col xs={6} md={4} style={{display:'inline-block' , marginLeft:'5%'}} >
    <Paper style={style.second} elevation={12}  >
    <br />
    <div style={{ color:'white', marginLeft:'5%', float:'left', marginRight:'3%'}}>
    <span >
    <TiMessageTyping size={60} />
    </span>
    </div>
    <div style={{ color:'white', fontFamily:'Times',fontSize:12, marginLeft:'5%', marginTop:'4%'}}>
      <span >No. of Cost</span>  
    </div>
   
    <div style={{fontSize:36, fontFamily:'Times', color:'white' , marginTop:-6 }}>
    <span  >
      07
    </span>
    </div>
    </Paper>
    </Col>
    <Col xs={6} md={4} style={{display:'inline-block', marginLeft:'5%'}} >
    <Paper style={style.third} elevation={12}  >
    <br />
    <div style={{ color:'white', marginLeft:'5%', float:'left', marginRight:'3%'}}>
    <span >
    <MdPeopleOutline size={60} />
    </span>
    </div>
    <div style={{ color:'white', fontFamily:'Times',fontSize:12, marginLeft:'5%', marginTop:'4%'}}>
      <span >No. of Cost</span>  
    </div>
   
    <div style={{fontSize:36, fontFamily:'Times', color:'white' , marginTop:-6 }}>
    <span  >
      03
    </span>
    </div>
    </Paper>
    </Col>
    <Col xs={6} md={4} style={{display:'inline-block', marginLeft:'5%'}} >
    <Paper style={style.fourth} elevation={12}  >
    <br />
    
    <div style={{ color:'white', marginLeft:'5%', float:'left', marginRight:'3%'}}>
    <span >
    <MdApps size={60} />
    </span>
    </div>
    <div style={{ color:'white', fontFamily:'Times',fontSize:12, marginLeft:'5%', marginTop:'4%'}}>
      <span >No. of Cost</span>  
    </div>
   
    <div style={{fontSize:36, fontFamily:'Times', color:'white' , marginTop:-6 }}>
    <span  >
      05
    </span>
    </div>
    
    </Paper>
    </Col>
    
   
    </Row>
    <Row>
      <br /><br /><br />
    </Row>
    <Row>
    <Bar
          data={this.state.chartData}
         
          height={100}
          
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Users In '+this.props.location,
              fontSize:25
            },
            
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
      </Row>
    </Grid>
    
  );
}
}


export default SimpleCard;